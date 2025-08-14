# Switch2Any 插件演示

这是一个演示文件，用于测试Switch2Any插件。

## 测试步骤

1. 在VSCode中打开此项目
2. 按 `F5` 启动调试模式
3. 在新打开的VSCode窗口中，按 `Cmd+Shift+1`
4. 选择要打开的应用程序

## 预期结果

- 插件应该显示一个应用程序选择列表
- 选择应用程序后，应该能够成功打开该应用程序
- 应该显示成功或失败的消息提示

## 配置示例

在settings.json中添加以下配置来测试：

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
      "name": "Calculator",
      "path": "/Applications/Calculator.app",
      "type": "app"
    }
  ]
}
```

## JetBrains功能测试

1. 在VSCode中打开一个文件
2. 将光标移动到某个位置
3. 按 `Cmd+Shift+1` 选择IntelliJ IDEA
4. 观察IntelliJ IDEA是否打开并跳转到正确的位置
