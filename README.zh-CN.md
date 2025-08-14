# Switch2Any

一个VSCode扩展，允许您通过快捷键快速打开不同的应用程序。

## 功能特性

- 🚀 通过快捷键快速打开应用程序
- ⚙️ 可配置的应用程序列表
- 🎯 支持自定义快捷键
- 📱 支持macOS系统
- 🛠️ 支持JetBrains产品，可跳转到当前光标位置

## 安装

1. 克隆此仓库到本地
2. 在VSCode中打开项目文件夹
3. 按 `F5` 启动调试模式，或使用 `Ctrl+Shift+P` 运行 "Developer: Reload Window"

## 使用方法

### 基本使用

1. 按 `Cmd+Shift+1` 打开应用程序选择器
2. 从列表中选择要打开的应用程序
3. 应用程序将自动启动

### 配置应用程序

在VSCode设置中配置您想要快速访问的应用程序：

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

### 配置说明

- `name`: 应用程序的显示名称
- `path`: 应用程序的完整路径
- `type`: 应用程序类型
  - `jetbrains`: JetBrains产品，支持跳转到光标位置
  - `app`: 普通应用程序

### JetBrains产品支持

对于JetBrains产品（如IntelliJ IDEA、WebStorm、PyCharm等），插件会：
1. 获取当前光标位置
2. 使用命令行参数 `--line` 和 `--column` 跳转到指定位置
3. 自动打开对应的文件

## 开发

### 构建

```bash
npm install
npm run compile
```

### 测试

```bash
npm test
```

### 打包

```bash
npm install -g vsce
vsce package
```

## 许可证

MIT

## 贡献

欢迎提交Issue和Pull Request！
