#!/usr/bin/env node
/**
 * 场景：短跑 sidecar — 确保本仓 `dsh web` 已起；路径/端口变更则停旧再起。
 * 用法：node agnx/tools/ensure-dsh-web.mjs [--work-dir <dataRoot>] [--port <n>] [--force-restart] [--supervised]
 * stdout：单行 JSON { ok, port, origin, reused, pid, dshRoot, warnings? }；--supervised 时含 plan
 */
import { spawn } from "node:child_process";
import { access, constants as fsConstants, mkdir, readFile, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** clone 根 = deepseek-harness monorepo 根 */
const repoRoot = path.resolve(__dirname, "../..");
const defaultPort = 3090;

function traceEnsure(phase, fields) {
  process.stderr.write(`[ensure-dsh-web] ${JSON.stringify({ phase, ...fields })}\n`);
}

function parseArgs(argv) {
  let workDir = process.env.AGNX_APP_DATA_ROOT || "";
  let port = defaultPort;
  let forceRestart = false;
  let supervised = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if ((arg === "--work-dir" || arg === "--workDir") && next) {
      workDir = String(next).trim();
      i += 1;
    } else if (arg === "--port" && next) {
      const n = Number(next);
      if (Number.isFinite(n) && n > 0) {
        port = n;
      }
      i += 1;
    } else if (arg === "--force-restart" || arg === "--forceRestart") {
      forceRestart = true;
    } else if (arg === "--supervised") {
      supervised = true;
    }
  }
  return {
    workDir: workDir || path.join(repoRoot, ".agnx-dsh-runtime"),
    port,
    dshRoot: repoRoot,
    forceRestart,
    supervised,
  };
}

function fingerprint(cfg) {
  return JSON.stringify({ dshRoot: cfg.dshRoot, port: cfg.port });
}

async function readState(statePath) {
  try {
    const raw = await readFile(statePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeState(statePath, payload) {
  await writeFile(statePath, JSON.stringify(payload, null, 2), "utf8");
}

function httpGetHealthy(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 2000 }, (res) => {
      res.resume();
      resolve(res.statusCode != null && res.statusCode >= 200 && res.statusCode < 300);
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
  });
}

function httpGetListening(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 2000 }, (res) => {
      res.resume();
      resolve(res.statusCode != null && res.statusCode >= 200 && res.statusCode < 500);
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function isWebHealthy(port) {
  // dsh web serves 401 on bare "/" until a token is presented; that still means the sidecar is up.
  return httpGetListening(`http://127.0.0.1:${port}/`);
}

function isPidAlive(pid) {
  const n = Number(pid);
  if (!Number.isFinite(n) || n <= 1) {
    return false;
  }
  try {
    process.kill(n, 0);
    return true;
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "EPERM") {
      return true;
    }
    return false;
  }
}

async function isSidecarListening(port) {
  return httpGetListening(`http://127.0.0.1:${port}/`);
}

function stopPid(pid) {
  const n = Number(pid);
  if (!Number.isFinite(n) || n <= 0) {
    return;
  }
  try {
    process.kill(n, "SIGTERM");
  } catch {
    // ignore
  }
}

function stopExisting(existing) {
  stopPid(existing?.pid);
}

async function pathExists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/** pnpm 根仓未必链接 `.bin/dsh`；build 后 CLI 在 apps/cli/lib/bin.js */
async function resolveDshLaunch(dshRoot) {
  const binLink = path.join(dshRoot, "node_modules", ".bin", "dsh");
  if (await pathExists(binLink)) {
    return { command: binLink, via: "node_modules/.bin/dsh" };
  }
  const cliBin = path.join(dshRoot, "apps", "cli", "lib", "bin.js");
  if (await pathExists(cliBin)) {
    return { command: process.execPath, cliBin, via: "apps/cli/lib/bin.js" };
  }
  return null;
}

async function waitForHealth(port, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await isWebHealthy(port)) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return false;
}

function spawnDetached(command, args, { cwd, env }) {
  const child = spawn(command, args, {
    cwd,
    env,
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let errBuf = "";
  child.stderr?.on("data", (chunk) => {
    errBuf += chunk.toString();
    if (errBuf.length > 8000) {
      errBuf = errBuf.slice(-8000);
    }
  });
  child.unref();
  return { child, getStderr: () => errBuf };
}

async function buildSupervisedPlan(cfg, warnings, wantedFp, dshLaunch) {
  const dshHome = path.join(cfg.workDir, "dsh-home");
  await mkdir(dshHome, { recursive: true });
  const runtimeBin = path.join(cfg.dshRoot, "runtime", "bin");
  const webArgs = ["web", "--host", "127.0.0.1", "--port", String(cfg.port), "--no-open"];
  const args = dshLaunch.cliBin ? [dshLaunch.cliBin, ...webArgs] : webArgs;
  return {
    ok: true,
    plan: {
      command: dshLaunch.command,
      args,
      cwd: cfg.dshRoot,
      env: {
        DSH_HOME: dshHome,
        DSH_TELEMETRY_DISABLED: "1",
        PATH: `${runtimeBin}:/usr/bin:/bin:/usr/sbin:/sbin:${process.env.PATH || ""}`,
      },
      fingerprint: wantedFp,
      healthUrl: `http://127.0.0.1:${cfg.port}/`,
      port: cfg.port,
      launchMode: "dev",
      iframeOriginStderrPrefix: "dsh web: ",
    },
  };
}

async function main() {
  const cfg = parseArgs(process.argv.slice(2));
  const warnings = [];
  await mkdir(cfg.workDir, { recursive: true });
  const statePath = path.join(cfg.workDir, "dsh-web.json");
  const wantedFp = fingerprint(cfg);

  const dshLaunch = await resolveDshLaunch(cfg.dshRoot);
  if (!dshLaunch) {
    console.log(
      JSON.stringify({
        ok: false,
        error:
          "未找到 dsh 可执行文件。请在本仓根目录执行：pnpm install && pnpm run build",
        dshRoot: cfg.dshRoot,
      }),
    );
    process.exitCode = 1;
    return;
  }

  const existing = await readState(statePath);

  if (cfg.supervised) {
    traceEnsure("supervised.start", { port: cfg.port, forceRestart: cfg.forceRestart, workDir: cfg.workDir });
    if (!cfg.forceRestart && existing) {
      const pidAlive =
        typeof existing.pid === "number" && Number.isFinite(existing.pid) && isPidAlive(existing.pid);
      const listening = await isSidecarListening(cfg.port);
      const fpOk = !existing.fingerprint || existing.fingerprint === wantedFp;
      const origin =
        typeof existing.iframeOrigin === "string" && existing.iframeOrigin.startsWith("http")
          ? existing.iframeOrigin
          : `http://127.0.0.1:${cfg.port}`;
      const hasToken =
        (() => {
          try {
            return new URL(origin).searchParams.has("token");
          } catch {
            return origin.includes("token=");
          }
        })();
      if (listening && pidAlive && fpOk && hasToken) {
        traceEnsure("supervised.reuse", {
          port: cfg.port,
          pid: existing.pid ?? null,
          hasToken: true,
          origin: origin.replace(/token=[^&]+/, "token=***"),
        });
        console.log(
          JSON.stringify({
            ok: true,
            reused: true,
            port: cfg.port,
            pid: existing.pid ?? null,
            origin,
            dshRoot: cfg.dshRoot,
            warnings: existing.warnings || [],
            healthUrl: `http://127.0.0.1:${cfg.port}/`,
          }),
        );
        return;
      }
      traceEnsure("supervised.reuse-skipped", {
        port: cfg.port,
        listening,
        pidAlive,
        fpOk,
        hasToken,
      });
    }
    const planned = await buildSupervisedPlan(cfg, warnings, wantedFp, dshLaunch);
    traceEnsure("supervised.plan", { port: cfg.port, command: planned.plan.command });
    console.log(
      JSON.stringify({
        ok: true,
        reused: false,
        plan: planned.plan,
        warnings,
        dshRoot: cfg.dshRoot,
        mode: "dev",
      }),
    );
    return;
  }

  if (existing && (await isSidecarListening(cfg.port))) {
    if (existing.fingerprint === wantedFp && !cfg.forceRestart) {
      const origin =
        typeof existing.iframeOrigin === "string" && existing.iframeOrigin.startsWith("http")
          ? existing.iframeOrigin
          : `http://127.0.0.1:${cfg.port}`;
      console.log(
        JSON.stringify({
          ok: true,
          reused: true,
          port: cfg.port,
          pid: existing.pid ?? null,
          origin,
          dshRoot: cfg.dshRoot,
          warnings: existing.warnings || [],
        }),
      );
      return;
    }
    stopExisting(existing);
    await new Promise((resolve) => setTimeout(resolve, 500));
  } else if (existing) {
    stopExisting(existing);
  }

  const dshHome = path.join(cfg.workDir, "dsh-home");
  await mkdir(dshHome, { recursive: true });
  const runtimeBin = path.join(cfg.dshRoot, "runtime", "bin");
  const dshArgs = dshLaunch.cliBin
    ? [
        dshLaunch.cliBin,
        "web",
        "--host",
        "127.0.0.1",
        "--port",
        String(cfg.port),
        "--no-open",
      ]
    : ["web", "--host", "127.0.0.1", "--port", String(cfg.port), "--no-open"];
  const { child, getStderr } = spawnDetached(dshLaunch.command, dshArgs, {
    cwd: cfg.dshRoot,
    env: {
      ...process.env,
      DSH_HOME: dshHome,
      DSH_TELEMETRY_DISABLED: "1",
      PATH: `${runtimeBin}:/usr/bin:/bin:/usr/sbin:/sbin:${process.env.PATH || ""}`,
    },
  });

  const ready = await waitForHealth(cfg.port, 120_000);
  if (!ready) {
    stopPid(child.pid);
    const stderr = getStderr().trim();
    console.log(
      JSON.stringify({
        ok: false,
        error: stderr
          ? `dsh web 启动超时：${stderr.slice(0, 400)}`
          : "dsh web 启动超时（请确认 pnpm run build 已完成）",
        dshRoot: cfg.dshRoot,
      }),
    );
    process.exitCode = 1;
    return;
  }

  const state = {
    fingerprint: wantedFp,
    port: cfg.port,
    pid: child.pid ?? null,
    dshRoot: cfg.dshRoot,
    warnings,
    updatedAt: Date.now(),
  };
  await writeState(statePath, state);

  console.log(
    JSON.stringify({
      ok: true,
      reused: false,
      port: cfg.port,
      pid: child.pid ?? null,
      origin: `http://127.0.0.1:${cfg.port}`,
      dshRoot: cfg.dshRoot,
      warnings,
    }),
  );
}

main().catch((error) => {
  console.log(
    JSON.stringify({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    }),
  );
  process.exitCode = 1;
});
