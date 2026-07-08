import { workspace } from "vscode";

export const CONTINUE_WORKSPACE_KEY = "arclength-continuation";

export function getArclengthContinuationWorkspaceConfig() {
  return workspace.getConfiguration(CONTINUE_WORKSPACE_KEY);
}
