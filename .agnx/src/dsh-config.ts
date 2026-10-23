// 场景：DSH Web 端口经 host.config 落盘；面板 ensure 与详情配置共用。
import type { WorkspaceAppConfigApi } from "@agnx-lab/app-sdk";
import { DEFAULT_DSH_WEB_PORT, DSH_APP_ID, DSH_CONFIG_KEY } from "./constants";

export interface DshAppConfigDocument {
  version: 1;
  port: number;
}

export function defaultDshAppConfigDocument(): DshAppConfigDocument {
  return { version: 1, port: DEFAULT_DSH_WEB_PORT };
}

export function normalizeDshAppConfigDocument(raw: unknown): DshAppConfigDocument {
  const defaults = defaultDshAppConfigDocument();
  if (!raw || typeof raw !== "object") {
    return defaults;
  }
  const doc = raw as Partial<DshAppConfigDocument>;
  const port = Number(doc.port);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    return defaults;
  }
  return { version: 1, port: Math.floor(port) };
}

export async function loadDshConfigFromHost(
  config: WorkspaceAppConfigApi | null | undefined,
): Promise<DshAppConfigDocument> {
  if (!config?.get) {
    return defaultDshAppConfigDocument();
  }
  try {
    const raw = await config.get({
      scope: "app",
      appId: DSH_APP_ID,
      key: DSH_CONFIG_KEY,
      defaultValue: null,
    });
    return normalizeDshAppConfigDocument(raw);
  } catch {
    return defaultDshAppConfigDocument();
  }
}

export async function saveDshPortToHost(
  config: WorkspaceAppConfigApi | null | undefined,
  port: number,
): Promise<DshAppConfigDocument> {
  const normalized = normalizeDshAppConfigDocument({ version: 1, port });
  if (!config?.set) {
    return normalized;
  }
  await config.set({
    scope: "app",
    appId: DSH_APP_ID,
    key: DSH_CONFIG_KEY,
    value: normalized,
  });
  return normalized;
}
