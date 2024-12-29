const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Enables Node.js in the renderer process
            contextIsolation: false, // Allows integration with JavaScript
            enableRemoteModule: true, // Required for some legacy modules
            javascript: true, // Explicitly enables JavaScript
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});