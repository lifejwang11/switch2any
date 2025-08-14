import { runBasicTests } from './extension.test';

export function run(): Promise<void> {
	return new Promise(async (resolve, reject) => {
		try {
			const success = await runBasicTests();
			if (success) {
				resolve();
			} else {
				reject(new Error('测试失败'));
			}
		} catch (err) {
			console.error('测试运行失败:', err);
			reject(err);
		}
	});
}
