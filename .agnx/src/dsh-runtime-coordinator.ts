// 场景：DSH Web 运行时协调 — 配置/pull 后通知面板停旧再起（W3）。
export type DshRuntimeRestartReason = "port" | "git-pull" | "manual";

type RestartListener = (reason: DshRuntimeRestartReason) => void;

const listeners = new Set<RestartListener>();

export function subscribeDshRuntimeRestart(listener: RestartListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function notifyDshRuntimeNeedsRestart(reason: DshRuntimeRestartReason): void {
  for (const listener of listeners) {
    listener(reason);
  }
}
