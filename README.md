# Switch2Any

A VSCode extension that allows you to quickly open different applications via keyboard shortcuts.

## Features

- 🚀 Quickly open applications via keyboard shortcuts
- ⚙️ Configurable application list
- 🎯 Support for custom shortcuts
- 📱 macOS system support
- 🛠️ JetBrains product support with cursor position jumping

## Installation

1. Clone this repository to your local machine
2. Open the project folder in VSCode
3. Press `F5` to start debug mode, or use `Ctrl+Shift+P` to run "Developer: Reload Window"

## Usage

### Basic Usage

1. Press `Cmd+Shift+1` to open the application selector
2. Select the application you want to open from the list
3. The application will launch automatically

### Configuring Applications

Configure the applications you want to quickly access in VSCode settings:

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

### Configuration Options

- `name`: Display name of the application
- `path`: Full path to the application
- `type`: Application type
  - `jetbrains`: JetBrains products with cursor position support
  - `app`: Regular applications

### JetBrains Product Support

For JetBrains products (such as IntelliJ IDEA, WebStorm, PyCharm, etc.), the extension will:
1. Get the current cursor position
2. Use command line arguments `--line` and `--column` to jump to the specified position
3. Automatically open the corresponding file

## Development

### Build

```bash
npm install
npm run compile
```

### Test

```bash
npm test
```

### Package

```bash
npm install -g vsce
vsce package
```

## License

MIT

## Contributing

Issues and Pull Requests are welcome!

---

[中文文档](README.zh-CN.md)
