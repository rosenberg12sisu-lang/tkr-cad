const { app, BrowserWindow, Menu, shell, globalShortcut } = require('electron');

// Vaihda tähän Render-palvelimesi julkinen osoite tuotannossa
const FIN_CAD_URL = process.env.CAD_URL || 'http://localhost:5000';

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 920,
        minWidth: 1024,
        minHeight: 700,
        title: 'Fin CAD 2.0 – Viranomaisjärjestelmä',
        backgroundColor: '#0b132b',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    Menu.setApplicationMenu(null);
    mainWindow.loadURL(FIN_CAD_URL);

    // Pidä otsikko aina Fin CAD -muodossa
    mainWindow.on('page-title-updated', (e) => {
        e.preventDefault();
        mainWindow.setTitle('Fin CAD 2.0 – Viranomaisjärjestelmä');
    });

    // Avaa ulkoiset linkit (esim. Roblox OAuth) tarvittaessa turvallisesti
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith(FIN_CAD_URL) || url.includes('roblox.com')) {
            return { action: 'allow' };
        }
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

app.whenReady().then(() => {
    createWindow();

    // Pikanäppäin uuden ikkunan avaamiseen toiselle näytölle (Ctrl+Shift+N)
    globalShortcut.register('CommandOrControl+Shift+N', () => {
        createWindow();
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
