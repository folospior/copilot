# Copilot PWA

An Electron desktop app that wraps [copilot.microsoft.com](https://copilot.microsoft.com) as a PWA for Linux.

## Features

- Runs as a native desktop window on Linux
- System-tray integration with show/hide toggle
- Keyboard shortcuts (zoom, reload, fullscreen, DevTools)
- External links open in the default browser
- Secure: `contextIsolation`, `sandbox`, and `nodeIntegration: false` enabled

## Prerequisites

- Node.js 18 or later
- npm 9 or later

## Development

```bash
# Install dependencies
npm install

# Run the app in development mode
npm start

# Run tests
npm test
```

## Build

Produce distributable packages for Linux:

```bash
npm run build:linux
```

Output files are placed in the `dist/` directory:

| Format   | Description                             |
|----------|-----------------------------------------|
| AppImage | Single portable executable              |
| `.deb`   | Debian / Ubuntu package                 |
| `.rpm`   | Fedora / RHEL / openSUSE package        |

## Security

- The renderer process runs in a sandboxed context with `nodeIntegration` disabled.
- Navigation to third-party domains is blocked; those links open in the system browser.
- Only `copilot.microsoft.com`, `login.microsoftonline.com`, and `login.live.com` are allowed for in-app navigation.