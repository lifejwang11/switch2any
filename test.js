#!/usr/bin/env node

/**
 * Switch2Any 简单测试脚本
 * 用于验证插件的基本功能
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Switch2Any 插件测试开始...\n');

// 测试1: 检查必要文件是否存在
function testFileStructure() {
    console.log('📁 测试文件结构...');
    
    const requiredFiles = [
        'package.json',
        'src/extension.ts',
        'tsconfig.json',
        '.eslintrc.json',
        'README.md'
    ];
    
    let allFilesExist = true;
    requiredFiles.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`  ✅ ${file}`);
        } else {
            console.log(`  ❌ ${file} - 文件不存在`);
            allFilesExist = false;
        }
    });
    
    return allFilesExist;
}

// 测试2: 验证package.json配置
function testPackageJson() {
    console.log('\n📦 测试package.json配置...');
    
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        
        // 检查必要字段
        const requiredFields = ['name', 'displayName', 'version', 'engines', 'main'];
        let allFieldsExist = true;
        
        requiredFields.forEach(field => {
            if (packageJson[field]) {
                console.log(`  ✅ ${field}: ${packageJson[field]}`);
            } else {
                console.log(`  ❌ ${field} - 字段缺失`);
                allFieldsExist = false;
            }
        });
        
        // 检查VSCode引擎版本
        if (packageJson.engines && packageJson.engines.vscode) {
            console.log(`  ✅ VSCode引擎版本: ${packageJson.engines.vscode}`);
        } else {
            console.log('  ❌ VSCode引擎版本未配置');
            allFieldsExist = false;
        }
        
        // 检查命令配置
        if (packageJson.contributes && packageJson.contributes.commands) {
            const commands = packageJson.contributes.commands;
            console.log(`  ✅ 配置了 ${commands.length} 个命令`);
            commands.forEach(cmd => {
                console.log(`    - ${cmd.command}: ${cmd.title}`);
            });
        } else {
            console.log('  ❌ 命令配置缺失');
            allFieldsExist = false;
        }
        
        // 检查配置项
        if (packageJson.contributes && packageJson.contributes.configuration) {
            console.log('  ✅ 配置项已定义');
        } else {
            console.log('  ❌ 配置项缺失');
            allFieldsExist = false;
        }
        
        return allFieldsExist;
    } catch (error) {
        console.log(`  ❌ 解析package.json失败: ${error.message}`);
        return false;
    }
}

// 测试3: 验证TypeScript配置
function testTypeScriptConfig() {
    console.log('\n⚙️ 测试TypeScript配置...');
    
    try {
        const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
        
        if (tsConfig.compilerOptions) {
            console.log('  ✅ compilerOptions 已配置');
            console.log(`  ✅ 输出目录: ${tsConfig.compilerOptions.outDir || 'out'}`);
            console.log(`  ✅ 目标版本: ${tsConfig.compilerOptions.target || 'ES2020'}`);
        } else {
            console.log('  ❌ compilerOptions 缺失');
            return false;
        }
        
        return true;
    } catch (error) {
        console.log(`  ❌ 解析tsconfig.json失败: ${error.message}`);
        return false;
    }
}

// 测试4: 检查编译输出
function testCompiledOutput() {
    console.log('\n🔨 测试编译输出...');
    
    const outDir = 'out';
    const extensionJs = path.join(outDir, 'extension.js');
    
    if (fs.existsSync(outDir) && fs.existsSync(extensionJs)) {
        console.log('  ✅ 编译输出目录存在');
        console.log('  ✅ extension.js 已生成');
        
        // 检查文件大小
        const stats = fs.statSync(extensionJs);
        console.log(`  ✅ 文件大小: ${(stats.size / 1024).toFixed(2)} KB`);
        
        return true;
    } else {
        console.log('  ❌ 编译输出不存在，请运行 npm run compile');
        return false;
    }
}

// 测试5: 验证JetBrains配置
function testJetBrainsConfig() {
    console.log('\n🛠️ 测试JetBrains配置...');
    
    try {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        const config = packageJson.contributes?.configuration?.properties?.['switch2any.apps'];
        
        if (config && config.default) {
            const apps = config.default;
            console.log(`  ✅ 配置了 ${apps.length} 个应用程序`);
            
            const jetbrainsApps = apps.filter(app => app.type === 'jetbrains');
            const regularApps = apps.filter(app => app.type === 'app');
            
            console.log(`  ✅ JetBrains应用: ${jetbrainsApps.length} 个`);
            console.log(`  ✅ 普通应用: ${regularApps.length} 个`);
            
            // 验证JetBrains应用路径格式
            jetbrainsApps.forEach(app => {
                if (app.path.includes('/Applications/') && app.path.includes('.app/Contents/MacOS/')) {
                    console.log(`    ✅ ${app.name}: 路径格式正确`);
                } else {
                    console.log(`    ❌ ${app.name}: 路径格式错误`);
                }
            });
            
            return true;
        } else {
            console.log('  ❌ 应用程序配置缺失');
            return false;
        }
    } catch (error) {
        console.log(`  ❌ 验证JetBrains配置失败: ${error.message}`);
        return false;
    }
}

// 运行所有测试
function runAllTests() {
    const tests = [
        { name: '文件结构', fn: testFileStructure },
        { name: 'Package.json', fn: testPackageJson },
        { name: 'TypeScript配置', fn: testTypeScriptConfig },
        { name: '编译输出', fn: testCompiledOutput },
        { name: 'JetBrains配置', fn: testJetBrainsConfig }
    ];
    
    let passedTests = 0;
    let totalTests = tests.length;
    
    tests.forEach(test => {
        console.log(`\n🔍 运行测试: ${test.name}`);
        console.log('='.repeat(50));
        
        if (test.fn()) {
            console.log(`✅ ${test.name} 测试通过`);
            passedTests++;
        } else {
            console.log(`❌ ${test.name} 测试失败`);
        }
    });
    
    // 输出测试结果
    console.log('\n' + '='.repeat(50));
    console.log('📊 测试结果汇总');
    console.log('='.repeat(50));
    console.log(`总测试数: ${totalTests}`);
    console.log(`通过: ${passedTests}`);
    console.log(`失败: ${totalTests - passedTests}`);
    console.log(`成功率: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (passedTests === totalTests) {
        console.log('\n🎉 所有测试通过！插件配置正确。');
        console.log('\n📋 下一步：');
        console.log('1. 在VSCode中按 F5 启动调试模式');
        console.log('2. 参考 test-manual.md 进行手动测试');
        console.log('3. 测试JetBrains产品的跳转功能');
    } else {
        console.log('\n⚠️ 部分测试失败，请检查上述问题。');
    }
}

// 执行测试
runAllTests();
