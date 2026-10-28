# VSC Open in Fork

<p align="center">
	<img src="https://raw.githubusercontent.com/SpaceK33z/vscode-open-in-gitfork/master/resources/logo-128x128.png" alt="Logo">
</p>

Adds a command for opening the current project in [Fork](https://git-fork.com/), a Git client currently only for Mac.

It is copied from [vscode-open-in-gittower](https://github.com/fabiospampinato/vscode-open-in-gittower), but adjusted for Fork.

## Install

Run the following in the command palette:

```shell
ext install vscode-open-in-gitfork
```

## Usage

It adds 1 command to the command palette:

```js
'Open in Fork' // Opens the current project in Fork
```

The repository is picked as follows:

1. The repository containing the active file
2. If the workspace has a single repository, that one
3. In a multi-root workspace with several repositories, a picker lets you choose

An "Open in Fork" button is also added to the Source Control view's title bar, which opens the selected repository.
