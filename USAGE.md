# Switch2Any 使用说明

## 快速开始

1. **启动插件**：在VSCode中按 `F5` 启动调试模式
2. **使用快捷键**：按 `Cmd+Shift+1` 打开应用程序选择器
3. **选择应用**：从下拉列表中选择要打开的应用程序

## 配置应用程序

### 方法1：通过VSCode设置界面

1. 打开VSCode设置 (`Cmd+,`)
2. 搜索 "switch2any"
3. 找到 "Switch2Any: Apps" 配置项
4. 点击 "在 settings.json 中编辑"
5. 添加或修改应用程序配置

### 方法2：直接编辑settings.json

在VSCode的settings.json中添加以下配置：

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
    },
    {
      "name": "Terminal",
      "path": "/Applications/Utilities/Terminal.app",
      "type": "app"
    }
  ]
}
```

## 常用应用程序路径

### JetBrains产品
- **IntelliJ IDEA**: `/Applications/IntelliJ IDEA.app/Contents/MacOS/idea`
- **WebStorm**: `/Applications/WebStorm.app/Contents/MacOS/webstorm`
- **PyCharm**: `/Applications/PyCharm.app/Contents/MacOS/pycharm`
- **PhpStorm**: `/Applications/PhpStorm.app/Contents/MacOS/phpstorm`
- **CLion**: `/Applications/CLion.app/Contents/MacOS/clion`
- **Rider**: `/Applications/Rider.app/Contents/MacOS/rider`
- **GoLand**: `/Applications/GoLand.app/Contents/MacOS/goland`
- **DataGrip**: `/Applications/DataGrip.app/Contents/MacOS/datagrip`

### 系统应用
- **Finder**: `/System/Library/CoreServices/Finder.app`
- **Terminal**: `/Applications/Utilities/Terminal.app`
- **Calculator**: `/Applications/Calculator.app`
- **Safari**: `/Applications/Safari.app`

### 第三方应用
- **Chrome**: `/Applications/Google Chrome.app`
- **Firefox**: `/Applications/Firefox.app`
- **VS Code**: `/Applications/Visual Studio Code.app`
- **Xcode**: `/Applications/Xcode.app`

## 故障排除

### 应用程序无法打开
1. 检查应用程序路径是否正确
2. 确认应用程序确实存在于指定路径
3. 检查应用程序是否有执行权限

### 快捷键不响应
1. 确认插件已正确激活
2. 检查是否有其他插件占用了相同的快捷键
3. 尝试重新加载VSCode窗口 (`Cmd+Shift+P` -> "Developer: Reload Window")

## 开发模式

在开发模式下，您可以在VSCode的输出面板中查看插件的日志信息：
1. 打开输出面板 (`Cmd+Shift+U`)
2. 选择 "Switch2Any" 输出通道
3. 查看插件的运行日志
