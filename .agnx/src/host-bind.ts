// 场景：DeepSeek Harness Host 绑定单例 — 面板共用。
import type { WorkspaceAppHostApi } from "@agnx-lab/app-sdk";

let boundHost: WorkspaceAppHostApi | null = null;

export function bindDshHost(host: WorkspaceAppHostApi): void {
  boundHost = host;
}

export function getBoundHost(): WorkspaceAppHostApi | null {
  return boundHost;
}

export function requireBoundHost(): WorkspaceAppHostApi {
  if (!boundHost) {
    throw new Error("DeepSeek Harness Host 尚未绑定");
  }
  return boundHost;
}
