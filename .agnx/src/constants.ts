// 场景：DeepSeek Harness Sub App 常量（AppId / 命令 / 面板 / ensure）。
export const DSH_APP_ID = "com.agnx.deepseek-harness";
export const DSH_PANEL_ID = "deepseek-harness.main";
export const DSH_OPEN_COMMAND_ID = "deepseek-harness.open";

/** 短跑 sidecar：复用或拉起 `dsh web`。 */
export const DSH_ENSURE_WEB_TOOL_REL = ".agnx/tools/ensure-dsh-web.mjs";

/** 短跑 sidecar：读取 clone 根 git 分支与 HEAD。 */
export const DSH_GIT_STATUS_TOOL_REL = ".agnx/tools/git-status-upstream.mjs";

/** 短跑 sidecar：受管 `git pull --ff-only`。 */
export const DSH_GIT_PULL_TOOL_REL = ".agnx/tools/git-pull-upstream.mjs";

export const DSH_CONFIG_KEY = "dsh-app-config";

export const DEFAULT_DSH_WEB_PORT = 3090;
