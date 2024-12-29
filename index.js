const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            javascript: true,
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

    mainWindow.webContents.on('did-finish-load', () => {
        console.log('Page loaded successfully.');
    });

    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error(`Page failed to load (${errorCode}): ${errorDescription}`);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Disable security warnings for development
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
