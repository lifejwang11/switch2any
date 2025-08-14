import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

// 简单的测试函数
export async function runBasicTests() {
	console.log('开始运行Switch2Any基础测试...');
	
	try {
		// 测试1: 检查扩展是否存在
		const extension = vscode.extensions.getExtension('switch2any');
		assert.ok(extension, '扩展应该存在');
		console.log('✅ 扩展存在测试通过');

		// 测试2: 检查命令是否注册
		const commands = await vscode.commands.getCommands();
		assert.ok(commands.includes('switch2any.openApp'), '命令switch2any.openApp应该已注册');
		console.log('✅ 命令注册测试通过');

		// 测试3: 检查配置是否存在
		const config = vscode.workspace.getConfiguration('switch2any');
		const apps = config.get('apps');
		assert.ok(Array.isArray(apps), 'apps配置应该是一个数组');
		console.log('✅ 配置存在测试通过');

		// 测试4: 验证应用配置结构
		const appsArray: any[] = config.get('apps', []);
		appsArray.forEach((app, index) => {
			assert.ok(app.name, `应用${index}应该有名称`);
			assert.ok(app.path, `应用${index}应该有路径`);
			assert.ok(app.type, `应用${index}应该有类型`);
			assert.ok(['jetbrains', 'app'].includes(app.type), `应用${index}的类型应该是jetbrains或app`);
		});
		console.log('✅ 应用配置结构测试通过');

		// 测试5: 验证JetBrains应用路径
		const jetbrainsApps = appsArray.filter(app => app.type === 'jetbrains');
		jetbrainsApps.forEach(app => {
			const executableName = path.basename(app.path);
			const validNames = ['idea', 'webstorm', 'pycharm', 'phpstorm', 'clion', 'rider', 'goland', 'datagrip'];
			assert.ok(validNames.includes(executableName), `JetBrains应用应该有有效的可执行文件名: ${executableName}`);
		});
		console.log('✅ JetBrains应用路径测试通过');

		console.log('🎉 所有基础测试通过！');
		return true;
	} catch (error) {
		console.error('❌ 测试失败:', error);
		return false;
	}
}
