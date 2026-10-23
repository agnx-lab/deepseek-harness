// 场景：DeepSeek Harness Sub App 入口 — 薄壳 + ensure + iframe（W1）。
import type { WorkspaceAppHostApi, WorkspaceAppModule } from "@agnx-lab/app-sdk";
import { DshIcon } from "./dsh-icon";
import {
  DSH_APP_ID,
  DSH_ENSURE_WEB_TOOL_REL,
  DSH_GIT_PULL_TOOL_REL,
  DSH_GIT_STATUS_TOOL_REL,
  DSH_OPEN_COMMAND_ID,
  DSH_PANEL_ID,
} from "./constants";
import { registerDshDetailConfig } from "./detail-config";
import { bindDshHarnessHost, DeepSeekHarnessPanel } from "./panel";

export const appId = DSH_APP_ID;

function openDshTab(
  host: WorkspaceAppHostApi,
  context?: {
    serverId?: string;
    workspaceId?: string;
    currentPathname?: string | null;
  },
): void {
  host.openMiniAppTab({
    appId: DSH_APP_ID,
    panelId: DSH_PANEL_ID,
    serverId: context?.serverId,
    workspaceId: context?.workspaceId,
    currentPathname: context?.currentPathname,
  });
}

export function activate(host: WorkspaceAppHostApi): void {
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
        DSH_GIT_PULL_TOOL_REL,
      ],
      note: "Tab iframe 加载本仓受管 dsh web；ensure / git 短跑 sidecar",
    },
  });

  host.registerCommand({
    id: DSH_OPEN_COMMAND_ID,
    appId: DSH_APP_ID,
    title: "DeepSeek Harness",
    keywords: ["deepseek", "harness", "dsh", "agent", "honeycomb", "蜂巢"],
    icon: DshIcon,
    sidebarAction: {
      defaultVisible: true,
      label: "DSH",
      order: 58,
    },
    run: (context) => {
      openDshTab(host, context);
    },
  });
}

const moduleExport: WorkspaceAppModule = {
  appId: DSH_APP_ID,
  activate,
};

export default moduleExport;

export { DSH_APP_ID, DSH_OPEN_COMMAND_ID, DSH_PANEL_ID } from "./constants";
export { DeepSeekHarnessPanel } from "./panel";
