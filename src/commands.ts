/* IMPORT */

import openPath from "open";
import * as path from "path";
import * as vscode from "vscode";
import Utils from "./utils";

/* HELPERS */

function openInFork(repoPath: string) {
  return openPath(repoPath, { app: { name: "Fork" } });
}

// Walks up so files inside nested folders or submodules resolve to their own repo
function findGitRoot(startPath: string): string | undefined {
  let dirPath = startPath;

  while (true) {
    if (Utils.folder.exists(path.join(dirPath, ".git"))) return dirPath;

    const parentPath = path.dirname(dirPath);

    if (parentPath === dirPath) return undefined;

    dirPath = parentPath;
  }
}

function getActiveEditorRepoPath(): string | undefined {
  const uri = vscode.window.activeTextEditor?.document.uri;

  if (uri?.scheme !== "file") return undefined;

  return findGitRoot(path.dirname(uri.fsPath));
}

function getWorkspaceRepoPaths(): string[] {
  const folders = vscode.workspace.workspaceFolders ?? [];
  const repoPaths = folders
    .map((folder) => findGitRoot(folder.uri.fsPath))
    .filter((repoPath): repoPath is string => !!repoPath);

  return [...new Set(repoPaths)];
}

async function pickRepoPath(repoPaths: string[]): Promise<string | undefined> {
  const picked = await vscode.window.showQuickPick(
    repoPaths.map((repoPath) => ({
      label: path.basename(repoPath),
      description: repoPath
    })),
    { placeHolder: "Select a repository to open in Fork" }
  );

  return picked?.description;
}

/* COMMANDS */

// Invoked from the Source Control title bar, VS Code passes the clicked repo's SourceControl
async function open(sourceControl?: vscode.SourceControl) {
  if (sourceControl?.rootUri) return openInFork(sourceControl.rootUri.fsPath);

  const editorRepoPath = getActiveEditorRepoPath();

  if (editorRepoPath) return openInFork(editorRepoPath);

  if (!vscode.workspace.workspaceFolders?.length)
    return vscode.window.showErrorMessage(
      "You have to open a project before being able to open it in Fork"
    );

  const repoPaths = getWorkspaceRepoPaths();

  if (!repoPaths.length)
    return vscode.window.showErrorMessage(
      "The project needs to be a git repository for opening in Fork"
    );

  const repoPath =
    repoPaths.length === 1 ? repoPaths[0] : await pickRepoPath(repoPaths);

  if (repoPath) return openInFork(repoPath);
}

/* EXPORT */

export { open };
