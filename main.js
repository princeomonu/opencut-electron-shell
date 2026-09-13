const { app, BrowserWindow, shell } = require('electron');
const path = require('node:path');

const OPENCUT_URL = 'https://opencut.app';
const PERSISTENT_PARTITION = 'persist:opencut';

// IMPORTANT: keep this path stable. It lets the packaged app reuse the exact
// same Chromium profile/storage created by the development shell.
app.setPath('userData', path.join(app.getPath('appData'), 'OpenCut Desktop'));

function isOpenCutUrl(rawUrl) {
  try {
    const { protocol, hostname } = new URL(rawUrl);
    return protocol === 'https:' && (hostname === 'opencut.app' || hostname.endsWith('.opencut.app'));
  } catch {
    return false;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    title: 'OpenCut Electron Shell',
    width: 1440,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#111111',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      partition: PERSISTENT_PARTITION,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      devTools: true
    }
  });

  // Open OpenCut-owned windows inside the shell, everything else in the
  // system browser. No native Node/Electron APIs are exposed to the website.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isOpenCutUrl(url)) return { action: 'allow' };
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  // Prevent top-level navigation away from OpenCut while still allowing
  // ordinary browser downloads and external links.
  win.webContents.on('will-navigate', (event, url) => {
    if (!isOpenCutUrl(url)) {
      event.preventDefault();
      if (/^https?:/i.test(url)) shell.openExternal(url);
    }
  });

  win.loadURL(OPENCUT_URL);

  // Log storage support/quota at startup. This does not alter OpenCut data.
  win.webContents.on('did-finish-load', async () => {
    try {
      const result = await win.webContents.executeJavaScript(`(async () => {
        const supported = !!navigator.storage;
        const hasEstimate = !!navigator.storage?.estimate;
        const hasOPFS = !!navigator.storage?.getDirectory;
        const persisted = navigator.storage?.persisted
          ? await navigator.storage.persisted()
          : null;
        const estimate = hasEstimate ? await navigator.storage.estimate() : null;
        return { supported, hasEstimate, hasOPFS, persisted, estimate };
      })()`);
      console.log('[OpenCut storage]', result);
    } catch (error) {
      console.error('[OpenCut storage diagnostic failed]', error);
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
