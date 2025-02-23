const { app, BrowserWindow, ipcMain } = require('electron');
const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const ICON_PATH = path.join(__dirname, 'assets', 'icon.png'); 
const SCAN_PAGE_PATH = path.join(__dirname, 'pages', 'scan.html');
const KEYCLOAK_LOGIN_URL = `http://localhost:8080/realms/iot_scanner/protocol/openid-connect/auth?client_id=account-console&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fscan&response_type=code&code_challenge=tD1QF-9hmWOoOTTqFG8ZkPpnpIEU_ndFLfj_ckpYLoM&code_challenge_method=S256`;

let mainWindow;

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/scan')) {
    if (fs.existsSync(SCAN_PAGE_PATH)) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(SCAN_PAGE_PATH).pipe(res);

      if (mainWindow) {
        mainWindow.loadFile(SCAN_PAGE_PATH);
      }
    } else {
      res.writeHead(404);
      res.end("Error: scan.html not found");
      console.error("Error: scan.html file is missing");
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: ICON_PATH,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(KEYCLOAK_LOGIN_URL);
  mainWindow.setTitle("IoT Scanner");

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle("IoT Scanner");
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    server.close();
  }
});
