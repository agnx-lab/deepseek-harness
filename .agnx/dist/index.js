"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .agnx/src/index.ts
var index_exports = {};
__export(index_exports, {
  DSH_APP_ID: () => DSH_APP_ID,
  DSH_OPEN_COMMAND_ID: () => DSH_OPEN_COMMAND_ID,
  DSH_PANEL_ID: () => DSH_PANEL_ID,
  DeepSeekHarnessPanel: () => DeepSeekHarnessPanel,
  activate: () => activate,
  appId: () => appId,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// .agnx/src/dsh-icon.tsx
var import_react_native_svg = require("react-native-svg");
var import_jsx_runtime = require("react/jsx-runtime");
var DSH_ICON_XML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="none"><path fill-rule="nonzero" d="M48.8354 10.0479C48.3232 9.79199 48.1025 10.2798 47.8032 10.5278C47.7007 10.6079 47.6143 10.7119 47.5273 10.8076C46.7793 11.624 45.9048 12.1597 44.7622 12.0957C43.0923 12 41.666 12.5356 40.4058 13.8398C40.1377 12.2319 39.2476 11.272 37.8926 10.6558C37.1836 10.3359 36.4668 10.0156 35.9702 9.31982C35.6235 8.82373 35.5293 8.27197 35.356 7.72754C35.2456 7.3999 35.1353 7.06396 34.7651 7.00781C34.3633 6.94385 34.2056 7.2876 34.0479 7.57568C33.418 8.75195 33.1733 10.0479 33.1973 11.3599C33.2524 14.312 34.4736 16.6641 36.8999 18.3359C37.1758 18.5278 37.2466 18.7197 37.1597 19C36.9946 19.5757 36.7974 20.1357 36.624 20.7119C36.5137 21.0801 36.3486 21.1597 35.9624 21C34.6309 20.4321 33.481 19.5918 32.4644 18.5757C30.7393 16.8721 29.1792 14.9917 27.2334 13.52C26.7764 13.1758 26.3193 12.856 25.8467 12.5518C23.8618 10.584 26.1069 8.96777 26.627 8.77588C27.1704 8.57568 26.8159 7.8877 25.0591 7.896C23.3022 7.90381 21.6953 8.50391 19.647 9.30371C19.3477 9.42383 19.0322 9.51172 18.7095 9.58398C16.8501 9.22363 14.9199 9.14355 12.9033 9.37598C9.10596 9.80762 6.07275 11.6396 3.84326 14.7681C1.16455 18.5278 0.53418 22.7998 1.30664 27.2559C2.11768 31.9521 4.46582 35.8398 8.07373 38.8799C11.8159 42.0322 16.1255 43.5762 21.041 43.2803C24.0269 43.104 27.3516 42.6963 31.1016 39.4561C32.0469 39.936 33.0396 40.1279 34.686 40.272C35.9546 40.3921 37.1758 40.208 38.1211 40.0078C39.6021 39.688 39.4995 38.2881 38.9639 38.0322C34.623 35.9678 35.5762 36.8081 34.71 36.1279C36.9155 33.4639 40.2402 30.6958 41.54 21.728C41.6426 21.0161 41.5557 20.5679 41.54 19.9917C41.5322 19.6396 41.6108 19.5039 42.0049 19.4639C43.0923 19.3359 44.1479 19.0317 45.1167 18.4878C47.9292 16.9199 49.064 14.3438 49.3315 11.2559C49.3711 10.7837 49.3237 10.2959 48.8354 10.0479ZM24.3262 37.8398C20.1196 34.4639 18.0791 33.3521 17.2358 33.3999C16.4482 33.4482 16.5898 34.3682 16.7632 34.9678C16.9443 35.5601 17.1812 35.9683 17.5117 36.4878C17.7402 36.832 17.8979 37.3442 17.2832 37.728C15.9282 38.584 13.5728 37.4399 13.4624 37.3838C10.7207 35.7358 8.42822 33.5601 6.81348 30.584C5.25342 27.7197 4.34766 24.6479 4.19775 21.3677C4.1582 20.5757 4.38672 20.2959 5.15869 20.1519C6.17529 19.96 7.22314 19.9199 8.23926 20.0718C12.5327 20.7119 16.1885 22.6719 19.2529 25.7759C21.002 27.5439 22.3252 29.6558 23.6885 31.7202C25.1377 33.9121 26.6978 36 28.6831 37.7119C29.3843 38.312 29.9434 38.7681 30.479 39.104C28.8643 39.2881 26.1699 39.3281 24.3262 37.8398ZM26.3433 24.6001C26.3433 24.248 26.6191 23.9678 26.9658 23.9678C27.0444 23.9678 27.1152 23.9839 27.1782 24.0078C27.2651 24.04 27.3438 24.0879 27.4067 24.1602C27.5171 24.272 27.5801 24.4321 27.5801 24.6001C27.5801 24.9521 27.3042 25.2319 26.9575 25.2319C26.6108 25.2319 26.3433 24.9521 26.3433 24.6001ZM32.6064 27.8799C32.2046 28.0479 31.8027 28.1919 31.4165 28.208C30.8179 28.2397 30.1641 27.9922 29.8096 27.688C29.2583 27.2158 28.8643 26.9521 28.6987 26.1279C28.6279 25.7759 28.6675 25.2319 28.7305 24.9199C28.8721 24.248 28.7144 23.8159 28.2495 23.4238C27.8716 23.104 27.3911 23.0161 26.8633 23.0161C26.666 23.0161 26.4849 22.9277 26.3511 22.856C26.1304 22.7441 25.9492 22.4639 26.1226 22.1201C26.1777 22.0078 26.4458 21.7358 26.5088 21.688C27.2256 21.272 28.0527 21.4077 28.8169 21.7197C29.5259 22.0161 30.0615 22.5601 30.834 23.3281C31.6216 24.2559 31.7632 24.5117 32.2124 25.208C32.5669 25.752 32.8901 26.312 33.1104 26.9521C33.2446 27.3521 33.0713 27.6802 32.6064 27.8799Z" fill="CURRENT"/></svg>`;
function DshIcon(props) {
  const size = typeof props.size === "number" ? props.size : Number(props.size) || 16;
  const color = props.color ?? "currentColor";
  const xml = DSH_ICON_XML.replaceAll("CURRENT", color);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native_svg.SvgXml, { xml, width: size, height: size });
}

// .agnx/src/constants.ts
var DSH_APP_ID = "com.agnx.deepseek-harness";
var DSH_PANEL_ID = "deepseek-harness.main";
var DSH_OPEN_COMMAND_ID = "deepseek-harness.open";
var DSH_ENSURE_WEB_TOOL_REL = ".agnx/tools/ensure-dsh-web.mjs";
var DSH_GIT_STATUS_TOOL_REL = ".agnx/tools/git-status-upstream.mjs";
var DSH_GIT_PULL_TOOL_REL = ".agnx/tools/git-pull-upstream.mjs";
var DSH_CONFIG_KEY = "dsh-app-config";
var DEFAULT_DSH_WEB_PORT = 3090;

// .agnx/src/detail-config.tsx
var import_react = require("react");

// .agnx/src/host-bind.ts
var boundHost = null;
function bindDshHost(host) {
  boundHost = host;
}
function getBoundHost() {
  return boundHost;
}
function requireBoundHost() {
  if (!boundHost) {
    throw new Error("DeepSeek Harness Host \u5C1A\u672A\u7ED1\u5B9A");
  }
  return boundHost;
}

// .agnx/src/dsh-config.ts
function defaultDshAppConfigDocument() {
  return { version: 1, port: DEFAULT_DSH_WEB_PORT };
}
function normalizeDshAppConfigDocument(raw) {
  const defaults = defaultDshAppConfigDocument();
  if (!raw || typeof raw !== "object") {
    return defaults;
  }
  const doc = raw;
  const port = Number(doc.port);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    return defaults;
  }
  return { version: 1, port: Math.floor(port) };
}
async function loadDshConfigFromHost(config) {
  if (!config?.get) {
    return defaultDshAppConfigDocument();
  }
  try {
    const raw = await config.get({
      scope: "app",
      appId: DSH_APP_ID,
      key: DSH_CONFIG_KEY,
      defaultValue: null
    });
    return normalizeDshAppConfigDocument(raw);
  } catch {
    return defaultDshAppConfigDocument();
  }
}
async function saveDshPortToHost(config, port) {
  const normalized = normalizeDshAppConfigDocument({ version: 1, port });
  if (!config?.set) {
    return normalized;
  }
  await config.set({
    scope: "app",
    appId: DSH_APP_ID,
    key: DSH_CONFIG_KEY,
    value: normalized
  });
  return normalized;
}

// .agnx/src/dsh-runtime-coordinator.ts
var listeners = /* @__PURE__ */ new Set();
function subscribeDshRuntimeRestart(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function notifyDshRuntimeNeedsRestart(reason) {
  for (const listener of listeners) {
    listener(reason);
  }
}

// .agnx/src/detail-config.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var cachedConfig = { version: 1, port: DEFAULT_DSH_WEB_PORT };
function getCachedDshConfig() {
  return cachedConfig;
}
function setCachedDshConfig(next) {
  cachedConfig = next;
}
var rowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  minWidth: 0,
  width: "100%"
};
var mutedStyle = {
  fontSize: 12,
  lineHeight: "16px",
  color: "#71717a"
};
var monoStyle = {
  fontSize: 12,
  lineHeight: "16px",
  color: "#3f3f46",
  wordBreak: "break-all",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
};
var btnRowStyle = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center"
};
var btnStyle = {
  border: "1px solid #d4d4d8",
  background: "#fafafa",
  borderRadius: 6,
  padding: "4px 10px",
  fontSize: 12,
  color: "#27272a",
  cursor: "pointer"
};
var inputStyle = {
  width: 96,
  border: "1px solid #d4d4d8",
  borderRadius: 6,
  padding: "4px 8px",
  fontSize: 12,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
};
function parseToolJson(result) {
  const json = result.resultJson;
  if (json && typeof json === "object" && json !== null) {
    return json;
  }
  const stdout = typeof result.stdout === "string" ? result.stdout : "";
  for (const line of stdout.split(/\r?\n/).reverse()) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) {
      continue;
    }
    try {
      return JSON.parse(trimmed);
    } catch {
    }
  }
  const stderr = typeof result.stderr === "string" ? result.stderr.trim() : "";
  if (stderr) {
    return { ok: false, error: stderr.slice(0, 400) };
  }
  return null;
}
function PortDetailField() {
  const [portText, setPortText] = (0, import_react.useState)(String(cachedConfig.port));
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
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
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const onSave = (0, import_react.useCallback)(async () => {
    const host = getBoundHost();
    if (!host) {
      return;
    }
    const port = Number(portText.trim());
    if (!Number.isFinite(port) || port <= 0 || port > 65535) {
      setError("\u7AEF\u53E3\u987B\u4E3A 1\u201365535 \u7684\u6574\u6570");
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: rowStyle, "data-testid": "dsh-port-field", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: mutedStyle, children: "dsh web \u76D1\u542C\u7AEF\u53E3\uFF08\u9ED8\u8BA4 3090\uFF09\u3002\u4FDD\u5B58\u540E\u4F1A\u81EA\u52A8\u505C\u65E7\u8FDB\u7A0B\u5E76\u6309\u65B0\u7AEF\u53E3\u91CD\u542F\uFF08Tab \u5DF2\u6253\u5F00\u65F6\uFF09\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: btnRowStyle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          type: "text",
          value: portText,
          onChange: (event) => setPortText(event.target.value),
          style: inputStyle,
          "aria-label": "DSH Web \u7AEF\u53E3"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", style: btnStyle, disabled: busy, onClick: () => void onSave(), children: busy ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58\u7AEF\u53E3" })
    ] }),
    error ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { color: "#b45309", fontSize: 12 }, children: error }) : null
  ] });
}
function GitUpstreamSection() {
  const [statusText, setStatusText] = (0, import_react.useState)("\u52A0\u8F7D\u4E2D\u2026");
  const [pullMessage, setPullMessage] = (0, import_react.useState)(null);
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const refreshStatus = (0, import_react.useCallback)(async () => {
    const host = getBoundHost();
    if (!host?.tools?.run) {
      setStatusText("\u9700\u684C\u9762\u7AEF host.tools");
      return;
    }
    setError(null);
    try {
      const result = await host.tools.run({
        appId: DSH_APP_ID,
        tool: DSH_GIT_STATUS_TOOL_REL,
        timeoutMs: 6e4
      });
      const parsed = parseToolJson(result);
      if (!parsed || parsed.ok === false) {
        setStatusText("\u65E0\u6CD5\u8BFB\u53D6 git \u72B6\u6001");
        setError(typeof parsed?.error === "string" ? parsed.error : "git status \u5931\u8D25");
        return;
      }
      const head = typeof parsed.head === "string" ? parsed.head : "?";
      const branch = typeof parsed.branch === "string" ? parsed.branch : "?";
      setStatusText(`${branch} @ ${head}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatusText("\u8BFB\u53D6\u5931\u8D25");
    }
  }, []);
  (0, import_react.useEffect)(() => {
    void refreshStatus();
  }, [refreshStatus]);
  const onPull = (0, import_react.useCallback)(async () => {
    const host = getBoundHost();
    if (!host?.tools?.run) {
      setError("\u9700\u684C\u9762\u7AEF host.tools");
      return;
    }
    setBusy(true);
    setError(null);
    setPullMessage(null);
    try {
      const result = await host.tools.run({
        appId: DSH_APP_ID,
        tool: DSH_GIT_PULL_TOOL_REL,
        timeoutMs: 18e4
      });
      const parsed = parseToolJson(result);
      if (!parsed || parsed.ok === false) {
        setError(typeof parsed?.error === "string" ? parsed.error : "git pull \u5931\u8D25");
        return;
      }
      const before = typeof parsed.beforeHead === "string" ? parsed.beforeHead : "?";
      const after = typeof parsed.afterHead === "string" ? parsed.afterHead : "?";
      const changed = parsed.changed === true;
      const summary = typeof parsed.summary === "string" ? parsed.summary : "";
      setPullMessage(
        changed ? `\u5DF2\u66F4\u65B0 ${before} \u2192 ${after}\u3002${summary ? ` ${summary.split("\n")[0]}` : ""}` : `\u5DF2\u662F\u6700\u65B0\uFF08${after}\uFF09\u3002${summary ? ` ${summary.split("\n")[0]}` : ""}`
      );
      if (changed) {
        setPullMessage(
          (prev) => `${prev ?? ""} \u82E5 package.json \u6216 lock \u6709\u53D8\uFF0C\u8BF7\u5728\u672C\u4ED3\u6267\u884C pnpm install && pnpm run build\u3002\u6B63\u5728\u91CD\u542F dsh web\u2026`
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: rowStyle, "data-testid": "dsh-git-upstream", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: monoStyle, children: statusText }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: mutedStyle, children: "\u4ED3\u5E93\u6839 = \u672C Sub App clone \u76EE\u5F55\uFF1B\u4E0E Boujoy \u5171\u7528 dshRoot \u65F6\u53CC\u65B9\u5171\u4EAB\u540C\u4E00\u4EFD\u4E0A\u6E38\u4EE3\u7801\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: btnRowStyle, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", style: btnStyle, disabled: busy, onClick: () => void onPull(), children: busy ? "\u62C9\u53D6\u4E2D\u2026" : "\u62C9\u53D6\u6700\u65B0\u4EE3\u7801" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", style: btnStyle, disabled: busy, onClick: () => void refreshStatus(), children: "\u5237\u65B0\u72B6\u6001" })
    ] }),
    pullMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { color: "#15803d", fontSize: 12 }, children: pullMessage }) : null,
    error ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { color: "#b45309", fontSize: 12 }, children: error }) : null
  ] });
}
function registerDshDetailConfig(host) {
  if (!host.ui?.registerDetailSheetExtras) {
    return () => {
    };
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
          label: "Web \u7AEF\u53E3",
          value: String(cfg.port),
          helpText: "dsh web \u76D1\u542C\u7AEF\u53E3\uFF1B\u4FEE\u6539\u540E\u91CD\u65B0\u6253\u5F00 Tab \u751F\u6548\u3002",
          groupId: "dsh-runtime",
          groupTitle: "\u8FD0\u884C\u65F6",
          valueContent: (0, import_react.createElement)(PortDetailField)
        },
        {
          label: "\u4E0A\u6E38 Git",
          value: "\u5206\u652F\u4E0E commit",
          helpText: "\u4ECE GitHub \u62C9\u53D6 deepseek-harness \u6700\u65B0\u4EE3\u7801\uFF08\u4EC5 fast-forward\uFF09\u3002",
          groupId: "dsh-upstream",
          groupTitle: "\u4E0A\u6E38\u540C\u6B65",
          valueContent: (0, import_react.createElement)(GitUpstreamSection)
        }
      ];
    }
  });
}

// .agnx/src/panel.tsx
var import_react2 = require("react");
var import_react_native = require("react-native");
var import_react_native_unistyles = require("react-native-unistyles");
var import_jsx_runtime3 = require("react/jsx-runtime");
var WEB_ROOT_STYLE = {
  flex: "1 1 0%",
  alignSelf: "stretch",
  minHeight: 0,
  minWidth: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  backgroundColor: "transparent"
};
var GUEST_HOST_STYLE = {
  flex: "1 1 auto",
  minHeight: 0,
  minWidth: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  position: "relative"
};
var BOOT_LAYER_STYLE = {
  position: "absolute",
  inset: 0,
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  background: "rgb(9, 9, 11)"
};
var ERROR_LAYER_STYLE = {
  position: "absolute",
  inset: 0,
  zIndex: 3,
  display: "flex",
  flexDirection: "column",
  background: "rgba(9,9,11,0.88)"
};
var ERROR_FALLBACK_STYLE = {
  ...ERROR_LAYER_STYLE,
  alignItems: "center",
  justifyContent: "center",
  color: "#a1a1aa",
  padding: 24,
  textAlign: "center"
};
var RETAIN_REASON = "deepseek-harness-open";
var styles = import_react_native_unistyles.StyleSheet.create((theme) => ({
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing[6],
    backgroundColor: "transparent"
  },
  fallbackText: {
    color: theme.colors.foregroundMuted,
    fontSize: theme.fontSize.sm,
    textAlign: "center"
  }
}));
function bindDshHarnessHost(host) {
  bindDshHost(host);
}
function getHost() {
  return requireBoundHost();
}
function canUseGuestSurface() {
  return typeof document !== "undefined" && getHost().platform.isWeb;
}
function DeepSeekHarnessPanel(_props) {
  const guestHostRef = (0, import_react2.useRef)(null);
  const [booting, setBooting] = (0, import_react2.useState)(true);
  const [error, setError] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
    const host = getHost();
    host.background?.requestRetain?.({
      appId: DSH_APP_ID,
      active: true,
      reason: RETAIN_REASON
    });
    return () => {
      host.background?.requestRetain?.({
        appId: DSH_APP_ID,
        active: false,
        reason: RETAIN_REASON
      });
    };
  }, []);
  (0, import_react2.useEffect)(() => {
    if (!canUseGuestSurface()) {
      setBooting(false);
      setError("\u5F53\u524D\u5E73\u53F0\u6682\u4E0D\u652F\u6301\u5D4C\u5165 DeepSeek Harness\uFF0C\u8BF7\u4F7F\u7528 Agnx \u684C\u9762\u7AEF\u3002");
      return;
    }
    let cancelled = false;
    let unmountGuest = null;
    const mountGuest = async (options) => {
      const host = getHost();
      const container = guestHostRef.current;
      if (!container) {
        return;
      }
      if (!host.guest?.mount) {
        if (!cancelled) {
          setBooting(false);
          setError("\u5BBF\u4E3B\u672A\u63D0\u4F9B host.guest\uFF08\u9700\u5347\u7EA7 Agnx \u5E76\u91CD\u65B0\u626B\u63CF\u5B50\u5E94\u7528\uFF09");
        }
        return;
      }
      unmountGuest?.();
      unmountGuest = null;
      setBooting(true);
      setError(null);
      try {
        const cfg = await loadDshConfigFromHost(host.config);
        const args = ["--port", String(cfg.port)];
        if (options?.forceRestart) {
          args.push("--force-restart");
        }
        if (cancelled || !guestHostRef.current) {
          return;
        }
        unmountGuest = host.guest.mount({
          container: guestHostRef.current,
          ensureTool: DSH_ENSURE_WEB_TOOL_REL,
          ensureArgs: args,
          timeoutMs: 18e4,
          bootOverlay: false,
          onReady: () => {
            if (!cancelled) {
              setError(null);
              window.setTimeout(() => {
                if (!cancelled) {
                  setBooting(false);
                }
              }, 280);
            }
          },
          onError: (detail) => {
            if (!cancelled) {
              setBooting(false);
              setError(`${detail.code}: ${detail.message}`);
            }
          }
        });
      } catch (err) {
        if (!cancelled) {
          setBooting(false);
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    };
    void mountGuest();
    const unsubscribeRestart = subscribeDshRuntimeRestart((reason) => {
      void mountGuest({ forceRestart: true, reason });
    });
    return () => {
      cancelled = true;
      unsubscribeRestart();
      unmountGuest?.();
    };
  }, []);
  if (!canUseGuestSurface()) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native.View, { style: styles.fallback, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_native.Text, { style: styles.fallbackText, children: error ?? "\u52A0\u8F7D\u4E2D\u2026" }) });
  }
  const BrandPanel = getHost().ui?.BrandLogoLoaderPanel;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: WEB_ROOT_STYLE, "data-testid": "workspace-mini-app-deepseek-harness-root", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        ref: guestHostRef,
        "data-agnx-guest-surface-host": "true",
        style: GUEST_HOST_STYLE
      }
    ),
    booting && !error && BrandPanel ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-agnx-guest-boot-overlay": "true", style: BOOT_LAYER_STYLE, role: "status", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      BrandPanel,
      {
        title: "\u6B63\u5728\u542F\u52A8 DeepSeek Harness\u2026",
        description: "\u6B63\u5728\u51C6\u5907\u5D4C\u5165\u9762",
        testID: "deepseek-harness-boot-overlay"
      }
    ) }) : null,
    booting && !error && !BrandPanel ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        "data-agnx-guest-boot-overlay": "true",
        style: { ...BOOT_LAYER_STYLE, ...ERROR_FALLBACK_STYLE },
        role: "status",
        children: "\u6B63\u5728\u542F\u52A8 DeepSeek Harness\u2026"
      }
    ) : null,
    error && BrandPanel ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: ERROR_LAYER_STYLE, role: "alert", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      BrandPanel,
      {
        title: error,
        description: "\u6253\u5F00\u547D\u4EE4\u9762\u677F \u2192 DeepSeek Harness \u2192 \u8BE6\u60C5\uFF0C\u590D\u5236 Guest Surface\u3002",
        testID: "deepseek-harness-mount-error"
      }
    ) }) : null,
    error && !BrandPanel ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: ERROR_FALLBACK_STYLE, role: "alert", children: error }) : null
  ] });
}

// .agnx/src/index.ts
var appId = DSH_APP_ID;
function openDshTab(host, context) {
  host.openMiniAppTab({
    appId: DSH_APP_ID,
    panelId: DSH_PANEL_ID,
    serverId: context?.serverId,
    workspaceId: context?.workspaceId,
    currentPathname: context?.currentPathname
  });
}
function activate(host) {
  bindDshHarnessHost(host);
  registerDshDetailConfig(host);
  host.registerMiniApp({
    id: DSH_PANEL_ID,
    appId: DSH_APP_ID,
    title: "DeepSeek Harness",
    icon: DshIcon,
    component: DeepSeekHarnessPanel,
    iframeShortcutCapture: true,
    isolation: {
      mode: "iframe",
      sidecarTools: [
        DSH_ENSURE_WEB_TOOL_REL,
        DSH_GIT_STATUS_TOOL_REL,
        DSH_GIT_PULL_TOOL_REL
      ],
      note: "Tab iframe \u52A0\u8F7D\u672C\u4ED3\u53D7\u7BA1 dsh web\uFF1Bensure / git \u77ED\u8DD1 sidecar"
    }
  });
  host.registerCommand({
    id: DSH_OPEN_COMMAND_ID,
    appId: DSH_APP_ID,
    title: "DeepSeek Harness",
    keywords: ["deepseek", "harness", "dsh", "agent", "honeycomb", "\u8702\u5DE2"],
    icon: DshIcon,
    sidebarAction: {
      defaultVisible: true,
      label: "DSH",
      order: 58
    },
    run: (context) => {
      openDshTab(host, context);
    }
  });
}
var moduleExport = {
  appId: DSH_APP_ID,
  activate
};
var index_default = moduleExport;
