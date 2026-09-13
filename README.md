# OpenCut Electron Shell

An unofficial, community-maintained Electron shell for [OpenCut](https://opencut.app).

It opens the hosted OpenCut editor in a dedicated desktop window and provides a persistent Electron browser profile for IndexedDB, OPFS, and related browser storage.

> [!IMPORTANT]
> This project is not affiliated with, endorsed by, or maintained by OpenCut. It loads the hosted OpenCut web application; it does not bundle the OpenCut editor or provide a separate editing backend.

## Why use it?

- Launch OpenCut from a desktop application window.
- Keep OpenCut storage in a dedicated Electron profile instead of a normal browser profile.
- Use persistent browser storage required by web-based editing workflows.
- Open external links in your default browser instead of replacing the editor window.

## Platform support

| Platform | Packages | Status |
| --- | --- | --- |
| Linux x64 | AppImage, Debian package (`.deb`) | Supported |
| Windows x64 | Planned | Not yet released |
| macOS (Apple Silicon and Intel) | Planned | Not yet released |

Only download releases from the [GitHub Releases](https://github.com/princeomonu/opencut-electron-shell/releases) page. Current Linux builds are community packages and are not repository-signed.

## Install on Linux

Download an artifact from the latest GitHub Release.

### Debian and Ubuntu

```bash
sudo apt install ./OpenCut-Electron-Shell-*-amd64.deb
```

Launch it from your application menu or run:

```bash
opencut-electron-shell
```

### AppImage

```bash
chmod +x OpenCut-Electron-Shell-*-x86_64.AppImage
./OpenCut-Electron-Shell-*-x86_64.AppImage
```

## Your projects and data

The shell stores OpenCut data in a dedicated Electron profile named `OpenCut Desktop`. The profile name remains stable across project renames so existing users retain access to their saved browser storage.

Back up or export important projects before clearing application data or deleting the Electron profile. Removing that profile can permanently remove locally stored OpenCut data.

## How it works

The shell loads `https://opencut.app` in a Chromium window. The hosted application can change independently of this repository and its releases.

The current shell configuration:

- Disables Node.js integration.
- Enables context isolation, Electron sandboxing, and web security.
- Uses a persistent Chromium partition for OpenCut data.
- Keeps OpenCut navigation in the shell and sends external HTTP(S) links to the default browser.

## Development

### Requirements

- Node.js 22 or newer
- pnpm 11 or newer

### Run locally

```bash
pnpm install --frozen-lockfile
pnpm start
```

### Build Linux packages

```bash
pnpm dist
```

Artifacts are written to `dist/`:

- `OpenCut-Electron-Shell-<version>-x86_64.AppImage`
- `OpenCut-Electron-Shell-<version>-amd64.deb`

## Contributing

Contributions are welcome. Useful areas include:

- Testing installation and storage behavior across Linux distributions.
- Adding and testing Windows or macOS packaging.
- Improving Electron security hardening.
- Fixing packaging, accessibility, documentation, or platform-specific issues.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. For bugs and feature ideas, use the [issue tracker](https://github.com/princeomonu/opencut-electron-shell/issues).

## Updates

The shell does not update itself. Download and install newer versions manually from [GitHub Releases](https://github.com/princeomonu/opencut-electron-shell/releases).

## License and attribution

This Electron shell is licensed under the [MIT License](LICENSE). OpenCut and its branding belong to their respective owners. See [NOTICE.md](NOTICE.md) for attribution information.
