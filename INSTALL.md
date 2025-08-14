# Switch2Any 插件安装指南

## 🎉 插件已成功打包！

您的Switch2Any插件已经打包完成，文件名为：`switch2any-0.0.1.vsix`

## 📦 安装方法

### 方法1：通过VSCode界面安装（推荐）

1. **打开VSCode**
2. **打开扩展面板**：
   - 按 `Cmd+Shift+X` (macOS) 或 `Ctrl+Shift+X` (Windows/Linux)
   - 或者点击左侧活动栏的扩展图标
3. **安装VSIX文件**：
   - 点击扩展面板右上角的 "..." 菜单
   - 选择 "从VSIX安装..."
   - 选择 `switch2any-0.0.1.vsix` 文件
4. **重启VSCode**：
   - 安装完成后，VSCode会提示重启
   - 点击 "重新加载" 按钮

### 方法2：通过命令行安装

```bash
# 在VSCode中打开命令面板 (Cmd+Shift+P)
# 输入并选择: "Extensions: Install from VSIX..."
# 然后选择 switch2any-0.0.1.vsix 文件
```

## ⚙️ 配置插件

安装完成后，您需要配置要使用的应用程序：

### 打开设置
1. 按 `Cmd+,` (macOS) 或 `Ctrl+,` (Windows/Linux) 打开设置
2. 搜索 "switch2any"
3. 找到 "Switch2Any: Apps" 配置项

### 默认配置
插件已预配置以下应用程序：

```json
{
  "switch2any.apps": [
    {
      "name": "IntelliJ IDEA",
      "path": "/Applications/IntelliJ IDEA.app/Contents/MacOS/idea",
      "type": "jetbrains"
    },
    {
      "name": "WebStorm",
      "path": "/Applications/WebStorm.app/Contents/MacOS/webstorm",
      "type": "jetbrains"
    },
    {
      "name": "PyCharm",
      "path": "/Applications/PyCharm.app/Contents/MacOS/pycharm",
      "type": "jetbrains"
    },
    {
      "name": "Chrome",
      "path": "/Applications/Google Chrome.app",
      "type": "app"
    }
  ]
}
```

### 自定义配置
根据您的需要修改配置：
- 添加您已安装的JetBrains产品
- 修改应用程序路径
- 添加其他常用应用程序

## 🚀 使用方法

### 基本使用
1. **打开文件**：在VSCode中打开任意文件
2. **定位光标**：将光标移动到想要跳转的位置
3. **触发命令**：按 `Cmd+Shift+1` 打开应用程序选择器
4. **选择应用**：从列表中选择要打开的应用程序

### JetBrains产品跳转
对于JetBrains产品：
- 插件会自动获取当前光标位置
- 使用命令行参数跳转到指定位置
- 支持所有JetBrains产品（IDEA、WebStorm、PyCharm等）

### 普通应用程序
对于普通应用程序：
- 直接打开应用程序
- 不进行位置跳转

## 🧪 测试插件

### 快速测试
1. 在VSCode中打开一个文件
2. 将光标移动到某个位置
3. 按 `Cmd+Shift+1`
4. 选择 "IntelliJ IDEA"（如果已安装）
5. 观察是否成功跳转

### 详细测试
参考 `test-manual.md` 文件进行完整的测试。

## 🔧 故障排除

### 问题1：插件无法激活
**解决方案**：
- 检查VSCode版本是否支持（需要1.74.0或更高）
- 重新安装插件
- 查看VSCode的输出面板中的错误信息

### 问题2：JetBrains产品无法打开
**解决方案**：
- 确认JetBrains产品已安装
- 检查配置中的路径是否正确
- 确认应用程序有执行权限

### 问题3：快捷键不响应
**解决方案**：
- 检查快捷键是否被其他插件占用
- 尝试使用命令面板手动执行命令
- 重新加载VSCode窗口

## 📋 支持的应用程序

### JetBrains产品
- IntelliJ IDEA
- WebStorm
- PyCharm
- PhpStorm
- CLion
- Rider
- GoLand
- DataGrip

### 普通应用程序
- Chrome
- Safari
- Terminal
- Finder
- Calculator
- 任何macOS应用程序

## 🎯 功能特性

- ✅ 支持JetBrains产品光标跳转
- ✅ 支持普通应用程序启动
- ✅ 可配置的应用程序列表
- ✅ 快捷键支持
- ✅ 错误处理和用户提示
- ✅ macOS系统支持

## 📞 支持

如果您遇到问题或需要帮助：
1. 查看 `README.md` 获取详细文档
2. 参考 `USAGE.md` 了解使用方法
3. 运行 `node test.js` 进行诊断测试

---

**享受使用Switch2Any插件！** 🎉
