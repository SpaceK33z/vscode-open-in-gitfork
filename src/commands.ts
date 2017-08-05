
/* IMPORT */

import * as openPath from 'open';
import * as path from 'path';
import * as vscode from 'vscode';
import Utils from './utils';

/* COMMANDS */

function open () {

  const {rootPath} = vscode.workspace;

  if ( !rootPath ) return vscode.window.showErrorMessage ( 'You have to open a project before being able to open it in Fork' );

  const gitPath = path.join ( rootPath, '.git' );

  if ( !Utils.folder.exists ( gitPath ) ) return vscode.window.showErrorMessage ( 'The project needs to be a git repository for opening in Fork' );

  openPath ( rootPath, 'Fork' );

}

/* EXPORT */

export {open};
