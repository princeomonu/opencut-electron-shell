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
| Linux x64 | AppImage, Debian package (`.deb`) | Locally tested; released from version tags |
| Windows x64 | NSIS installer (`.exe`), portable ZIP | Beta; released from version tags |
| macOS Intel | DMG, ZIP | Beta; released from version tags |
| macOS Apple Silicon | DMG, ZIP | Beta; released from version tags |

All packages are unsigned community builds. Download them only from the [GitHub Releases](https://github.com/princeomonu/opencut-electron-shell/releases) page and verify the included `SHA256SUMS` file before bypassing an operating-system warning.

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

## Install on Windows

Download the x64 `.exe` installer from GitHub Releases and run it. The installer lets you choose the destination directory. A portable `.zip` is also available when you do not want an installed application.

Windows may show a SmartScreen warning because these community builds are unsigned. Confirm that the file came from this repository and matches `SHA256SUMS` before choosing **More info** then **Run anyway**.

## Install on macOS

Download the DMG for your processor from GitHub Releases:

- Apple Silicon: `arm64`
- Intel: `x64`

Open the DMG and drag **OpenCut Electron Shell** into Applications. macOS may block the first launch because the application is unsigned. After confirming the download and checksum, use Finder to control-click the app, select **Open**, then select **Open** again. Do not disable Gatekeeper system-wide.

## Verify a download

Each release includes a `SHA256SUMS` file. Download it into the same folder as the application artifact, then run one of these commands:

```bash
# Linux
sha256sum --check SHA256SUMS

# macOS
shasum -a 256 -c SHA256SUMS
```

On Windows PowerShell, compare the result of the following command to the matching `SHA256SUMS` entry:

```powershell
Get-FileHash .\OpenCut-Electron-Shell-*.exe -Algorithm SHA256
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

- Node.js 22.13.0 or newer
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

- `OpenCut-Electron-Shell-<version>-linux-x64.AppImage`
- `OpenCut-Electron-Shell-<version>-linux-x64.deb`

### Build other platforms

Build on the target operating system:

```bash
# Windows x64
pnpm dist:windows

# macOS
pnpm dist:mac
```

The tag-triggered GitHub Actions workflow builds all supported platforms on native runners and publishes the artifacts in one GitHub Release. See [docs/RELEASING.md](docs/RELEASING.md) for the release procedure.

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
