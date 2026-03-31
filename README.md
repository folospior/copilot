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

| Format   | Description                |
|----------|----------------------------|
| AppImage | Single portable executable |
| `.deb`   | Debian / Ubuntu package    |

## Gentoo

A Gentoo ebuild is provided in the `gentoo/` overlay directory under
`net-misc/copilot-pwa`.  To use it with a local overlay:

```bash
# Copy the overlay tree into your local overlay (adjust path as needed)
cp -r gentoo/net-misc /var/db/repos/localrepo/

# Rebuild the overlay cache
egencache --update --repo localrepo

# Install
emerge -av net-misc/copilot-pwa
```

The ebuild depends on `>=dev-util/electron-33:33` and installs a thin
wrapper at `/usr/bin/copilot-pwa` that launches the app via the
system-provided Electron binary.

## Security

- The renderer process runs in a sandboxed context with `nodeIntegration` disabled.
- Navigation to third-party domains is blocked; those links open in the system browser.
- Only `copilot.microsoft.com`, `login.microsoftonline.com`, and `login.live.com` are allowed for in-app navigation.