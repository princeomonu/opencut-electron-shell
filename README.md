# OpenCut Desktop

A small Electron/Chromium desktop shell for **https://opencut.app**.

This build exists to give OpenCut a dedicated Chromium profile with working IndexedDB, OPFS, StorageManager, and persistent browser storage on Linux.

## Your existing projects stay in place

The development shell and packaged build deliberately use the same Electron profile:

```text
OpenCut Desktop
```

and the same persistent Chromium partition:

```text
persist:opencut
```

Do **not** rename the profile in `main.js` after you start storing projects unless you intentionally want a fresh storage area.

## Run from source

```bash
npm install
npm start
```

## Verify storage

Open DevTools with `Ctrl+Shift+I` and run:

```js
await navigator.storage.estimate()
await navigator.storage.getDirectory()
await navigator.storage.persisted()
```

The last expression should return `true` on the working setup.

## Build Linux installers

```bash
npm install
npm run dist
```

Artifacts are written to `dist/`:

- `OpenCut-Desktop-0.3.0-x86_64.AppImage` (exact architecture label can vary)
- `OpenCut-Desktop-0.3.0-amd64.deb` (exact architecture label can vary)

### AppImage

```bash
chmod +x dist/*.AppImage
./dist/*.AppImage
```

You can keep the AppImage anywhere you like and launch it directly.

### Debian / Ubuntu `.deb`

```bash
sudo apt install ./dist/*.deb
```

This registers OpenCut Desktop with the Linux application menu and uses the packaged OpenCut icon.

## Storage location

Electron stores the profile under your normal Linux application-data directory, with the explicit profile name `OpenCut Desktop`. The application does not share Brave's profile or storage quota bucket.

Deleting that profile directory can delete the OpenCut data stored inside this shell, so back up important projects/exports before manually clearing application data.

## Security model

The hosted OpenCut site is sandboxed in Chromium with:

- Node integration disabled
- context isolation enabled
- Electron sandbox enabled
- web security enabled
- no native Electron APIs exposed to the hosted page

External web links open in your normal browser.

## Branding

The packaged icon comes from the official OpenCut open-source repository's `brand/marks/icon.svg`. This shell itself is unofficial and is not an official OpenCut desktop release.
