import { app, BrowserWindow, session, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;
global.authToken = null; 

function createWindow(urlToLoad) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(urlToLoad);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  const savedToken = getSavedAuthToken();

  if (!savedToken) {
    createWindow('http://localhost:8080/realms/iot_scanner/protocol/openid-connect/auth?client_id=account&response_type=token&redirect_uri=http://localhost/keycloak-redirect');
  } else {
    createWindow(`file://${join(__dirname, 'pages/scan.html')}`);
  }

  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ['http://localhost/keycloak-redirect*'] },
    async (details, callback) => {
      const token = extractTokenFromUrl(details.url);
      if (token) {
        saveAuthToken(token);
        mainWindow.loadURL(`file://${join(__dirname, 'pages/scan.html')}`);
      }
      callback({ cancel: false });
    }
  );
});


ipcMain.handle('get-auth-token', () => global.authToken);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function getSavedAuthToken() {
  return global.authToken || null;
}

function saveAuthToken(token) {
  global.authToken = token;
}

function extractTokenFromUrl(url) {
  const match = url.match(/access_token=([^&]*)/);
  return match ? match[1] : null;
}
