// 场景：详情「配置」— Web 端口、上游 git 状态、拉取最新代码（W2）。
import { createElement, useCallback, useEffect, useState, type CSSProperties, type ReactElement } from "react";
import type { WorkspaceAppHostApi } from "@agnx-lab/app-sdk";
import {
  DSH_APP_ID,
  DSH_GIT_PULL_TOOL_REL,
  DSH_GIT_STATUS_TOOL_REL,
  DEFAULT_DSH_WEB_PORT,
} from "./constants";
import { getBoundHost } from "./host-bind";
import {
  loadDshConfigFromHost,
  saveDshPortToHost,
  type DshAppConfigDocument,
} from "./dsh-config";
import { notifyDshRuntimeNeedsRestart } from "./dsh-runtime-coordinator";

let cachedConfig: DshAppConfigDocument = { version: 1, port: DEFAULT_DSH_WEB_PORT };

export function getCachedDshConfig(): DshAppConfigDocument {
  return cachedConfig;
}

function setCachedDshConfig(next: DshAppConfigDocument): void {
  cachedConfig = next;
}

const rowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  minWidth: 0,
  width: "100%",
};

const mutedStyle: CSSProperties = {
  fontSize: 12,
  lineHeight: "16px",
  color: "#71717a",
};

const monoStyle: CSSProperties = {
  fontSize: 12,
  lineHeight: "16px",
  color: "#3f3f46",
  wordBreak: "break-all",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

const btnRowStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const btnStyle: CSSProperties = {
  border: "1px solid #d4d4d8",
  background: "#fafafa",
  borderRadius: 6,
  padding: "4px 10px",
  fontSize: 12,
  color: "#27272a",
  cursor: "pointer",
};

const inputStyle: CSSProperties = {
  width: 96,
  border: "1px solid #d4d4d8",
  borderRadius: 6,
  padding: "4px 8px",
  fontSize: 12,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

function parseToolJson(result: {
  ok?: boolean;
  resultJson?: unknown;
  stdout?: string;
  stderr?: string;
}): Record<string, unknown> | null {
  const json = result.resultJson;
  if (json && typeof json === "object" && json !== null) {
    return json as Record<string, unknown>;
  }
  const stdout = typeof result.stdout === "string" ? result.stdout : "";
  for (const line of stdout.split(/\r?\n/).reverse()) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) {
      continue;
    }
    try {
      return JSON.parse(trimmed) as Record<string, unknown>;
    } catch {
      // continue
    }
  }
  const stderr = typeof result.stderr === "string" ? result.stderr.trim() : "";
  if (stderr) {
    return { ok: false, error: stderr.slice(0, 400) };
  }
  return null;
}

function PortDetailField(): ReactElement {
  const [portText, setPortText] = useState(String(cachedConfig.port));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const host = getBoundHost();
        if (!host) {
          return;
        }
        const loaded = await loadDshConfigFromHost(host.config);
        if (cancelled) {
          return;
        }
        setCachedDshConfig(loaded);
        setPortText(String(loaded.port));
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSave = useCallback(async () => {
    const host = getBoundHost();
    if (!host) {
      return;
    }
    const port = Number(portText.trim());
    if (!Number.isFinite(port) || port <= 0 || port > 65535) {
      setError("端口须为 1–65535 的整数");
      return;
    }
    setBusy(true);
    setError(null);
    const portBefore = cachedConfig.port;
    try {
      const saved = await saveDshPortToHost(host.config, port);
      setCachedDshConfig(saved);
      setPortText(String(saved.port));
      if (saved.port !== portBefore) {
        notifyDshRuntimeNeedsRestart("port");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }, [portText]);

  return (
    <div style={rowStyle} data-testid="dsh-port-field">
      <div style={mutedStyle}>dsh web 监听端口（默认 3090）。保存后会自动停旧进程并按新端口重启（Tab 已打开时）。</div>
      <div style={btnRowStyle}>
        <input
          type="text"
          value={portText}
          onChange={(event) => setPortText(event.target.value)}
          style={inputStyle}
          aria-label="DSH Web 端口"
        />
        <button type="button" style={btnStyle} disabled={busy} onClick={() => void onSave()}>
          {busy ? "保存中…" : "保存端口"}
        </button>
      </div>
      {error ? <div style={{ color: "#b45309", fontSize: 12 }}>{error}</div> : null}
    </div>
  );
}

function GitUpstreamSection(): ReactElement {
  const [statusText, setStatusText] = useState("加载中…");
  const [pullMessage, setPullMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshStatus = useCallback(async () => {
    const host = getBoundHost();
    if (!host?.tools?.run) {
      setStatusText("需桌面端 host.tools");
      return;
    }
    setError(null);
    try {
      const result = await host.tools.run({
        appId: DSH_APP_ID,
        tool: DSH_GIT_STATUS_TOOL_REL,
        timeoutMs: 60_000,
      });
      const parsed = parseToolJson(result);
      if (!parsed || parsed.ok === false) {
        setStatusText("无法读取 git 状态");
        setError(typeof parsed?.error === "string" ? parsed.error : "git status 失败");
        return;
      }
      const head = typeof parsed.head === "string" ? parsed.head : "?";
      const branch = typeof parsed.branch === "string" ? parsed.branch : "?";
      setStatusText(`${branch} @ ${head}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatusText("读取失败");
    }
  }, []);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  const onPull = useCallback(async () => {
    const host = getBoundHost();
    if (!host?.tools?.run) {
      setError("需桌面端 host.tools");
      return;
    }
    setBusy(true);
    setError(null);
    setPullMessage(null);
    try {
      const result = await host.tools.run({
        appId: DSH_APP_ID,
        tool: DSH_GIT_PULL_TOOL_REL,
        timeoutMs: 180_000,
      });
      const parsed = parseToolJson(result);
      if (!parsed || parsed.ok === false) {
        setError(typeof parsed?.error === "string" ? parsed.error : "git pull 失败");
        return;
      }
      const before = typeof parsed.beforeHead === "string" ? parsed.beforeHead : "?";
      const after = typeof parsed.afterHead === "string" ? parsed.afterHead : "?";
      const changed = parsed.changed === true;
      const summary = typeof parsed.summary === "string" ? parsed.summary : "";
      setPullMessage(
        changed
          ? `已更新 ${before} → ${after}。${summary ? ` ${summary.split("\n")[0]}` : ""}`
          : `已是最新（${after}）。${summary ? ` ${summary.split("\n")[0]}` : ""}`,
      );
      if (changed) {
        setPullMessage(
          (prev) =>
            `${prev ?? ""} 若 package.json 或 lock 有变，请在本仓执行 pnpm install && pnpm run build。正在重启 dsh web…`,
        );
        notifyDshRuntimeNeedsRestart("git-pull");
      }
      await refreshStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }, [refreshStatus]);

  return (
    <div style={rowStyle} data-testid="dsh-git-upstream">
      <div style={monoStyle}>{statusText}</div>
      <div style={mutedStyle}>仓库根 = 本 Sub App clone 目录；与 Boujoy 共用 dshRoot 时双方共享同一份上游代码。</div>
      <div style={btnRowStyle}>
        <button type="button" style={btnStyle} disabled={busy} onClick={() => void onPull()}>
          {busy ? "拉取中…" : "拉取最新代码"}
        </button>
        <button type="button" style={btnStyle} disabled={busy} onClick={() => void refreshStatus()}>
          刷新状态
        </button>
      </div>
      {pullMessage ? <div style={{ color: "#15803d", fontSize: 12 }}>{pullMessage}</div> : null}
      {error ? <div style={{ color: "#b45309", fontSize: 12 }}>{error}</div> : null}
    </div>
  );
}

export function registerDshDetailConfig(host: WorkspaceAppHostApi): () => void {
  if (!host.ui?.registerDetailSheetExtras) {
    return () => {};
  }
  void loadDshConfigFromHost(host.config).then((loaded) => {
    setCachedDshConfig(loaded);
  });
  return host.ui.registerDetailSheetExtras({
    appId: DSH_APP_ID,
    surface: "config",
    buildRows: () => {
      const cfg = getCachedDshConfig();
      return [
        {
          label: "Web 端口",
          value: String(cfg.port),
          helpText: "dsh web 监听端口；修改后重新打开 Tab 生效。",
          groupId: "dsh-runtime",
          groupTitle: "运行时",
          valueContent: createElement(PortDetailField),
        },
        {
          label: "上游 Git",
          value: "分支与 commit",
          helpText: "从 GitHub 拉取 deepseek-harness 最新代码（仅 fast-forward）。",
          groupId: "dsh-upstream",
          groupTitle: "上游同步",
          valueContent: createElement(GitUpstreamSection),
        },
      ];
    },
  });
}
