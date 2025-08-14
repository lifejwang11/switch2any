import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

interface AppConfig {
	name: string;
	path: string;
	type: 'jetbrains' | 'app';
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "switch2any" is now active!');

	// Register command to open applications
	let disposable = vscode.commands.registerCommand('switch2any.openApp', async () => {
		// Get configured application list
		const config = vscode.workspace.getConfiguration('switch2any');
		const apps: AppConfig[] = config.get('apps', []);

		if (apps.length === 0) {
			vscode.window.showErrorMessage('No applications configured!');
			return;
		}

		// Show application selection list
		const appNames = apps.map(app => app.name);
		const selectedAppName = await vscode.window.showQuickPick(appNames, {
			placeHolder: 'Select application to open'
		});

		if (!selectedAppName) {
			return; // User cancelled selection
		}

		// Find selected application configuration
		const selectedApp = apps.find(app => app.name === selectedAppName);
		if (!selectedApp) {
			vscode.window.showErrorMessage(`Application not found: ${selectedAppName}`);
			return;
		}

		// Open application
		try {
			if (selectedApp.type === 'jetbrains') {
				await openJetBrainsApp(selectedApp);
			} else {
				await openApplication(selectedApp.path, selectedApp.name);
			}
			vscode.window.showInformationMessage(`Opened: ${selectedApp.name}`);
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to open application: ${error}`);
		}
	});

		// Register shortcut commands for each configured application
		const apps: AppConfig[] = vscode.workspace.getConfiguration('switch2any').get('apps', []);
		apps.forEach((app, index) => {
			const commandId = `switch2any.openApp${index}`;
			const disposable = vscode.commands.registerCommand(commandId, async () => {
				try {
					if (app.type === 'jetbrains') {
						await openJetBrainsApp(app);
					} else {
						await openApplication(app.path, app.name);
					}
					vscode.window.showInformationMessage(`Opened: ${app.name}`);
				} catch (error) {
					vscode.window.showErrorMessage(`Failed to open application: ${error}`);
				}
			});
			context.subscriptions.push(disposable);
		});

	context.subscriptions.push(disposable);
}


function pathExists(targetPath: string): boolean {
	try {
		return fs.existsSync(targetPath);
	} catch {
		return false;
	}
}


async function openJetBrainsApp(app: AppConfig): Promise<void> {
    return new Promise(async (resolve, reject) => {
		// Get current active editor
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			reject(new Error('No active editor'));
			return;
		}

		const document = editor.document;
		const position = editor.selection.active;
		const filePath = document.fileName;
		const line = position.line + 1; // JetBrains uses 1-based line numbers
		const column = position.character + 1; // JetBrains uses 1-based column numbers

		// Calculate effective executable/app path: if configured path doesn't exist, try to resolve by name
		let effectivePath: string = app.path;
		if (!pathExists(effectivePath)) {
			reject(new Error(`Application does not exist: ${app.path}`));
			return;
		}
		// Build JetBrains command
		let command: string;
		if (os.platform() === 'darwin') {
			const ideaUrl = `idea://open?file=${encodeURIComponent(filePath)}&line=${line}&column=${column}`;
			// Use open -a to avoid having two icons in Dock
			// Prefer app name, then try to infer .app bundle path from path
			const basePath = effectivePath;
			const appSpecifier = app.path || basePath;
			command = `open -a "${appSpecifier}" "${ideaUrl}"`;
		} else {
			if (!pathExists(effectivePath)) {
				reject(new Error(`Application does not exist: ${app.path}`));
				return;
			}
			command = `"${effectivePath}" --line ${line} --column ${column} "${filePath}"`;
		}

		// Execute command
		cp.exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error);
				return;
			}
			if (stderr) {
				reject(new Error(stderr));
				return;
			}
			resolve();
		});
	});
}

async function openApplication(appPath: string, appName?: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        // If path doesn't exist, try to resolve by name
        let effectivePath: string | null = appPath;

        if (!effectivePath || !pathExists(effectivePath)) {
            reject(new Error(`Application does not exist: ${appPath}${appName ? ` / ${appName}` : ''}`));
            return;
        }

        const platform = os.platform();
        if (platform === 'darwin') {
            cp.exec(`open "${effectivePath}"`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (stderr) {
                    reject(new Error(stderr));
                    return;
                }
                resolve();
            });
            return;
        }

        // Windows: start, Linux: xdg-open or direct execution
        if (platform === 'win32') {
            cp.exec(`start "" "${effectivePath}"`, { windowsHide: true }, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (stderr) {
                    reject(new Error(stderr));
                    return;
                }
                resolve();
            });
            return;
        }

        // Linux
        const tryCommands = [`xdg-open "${effectivePath}"`, `"${effectivePath}"`];
        const tryNext = (index: number) => {
            if (index >= tryCommands.length) {
                reject(new Error('Unable to open application'));
                return;
            }
            cp.exec(tryCommands[index], (error) => {
                if (error) {
                    tryNext(index + 1);
                } else {
                    resolve();
                }
            });
        };
        tryNext(0);
    });
}

export function deactivate() {}
