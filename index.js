import { app, BrowserWindow , Menu, ipcMain} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import {exec} from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 960,
        icon: path.join(__dirname, "icon.ico"),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
    });
    win.loadFile('index.html');

    Menu.setApplicationMenu(null);
}

ipcMain.handle('run-command', async (event, cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) reject(stderr);
            else resolve(stdout);
            console.log(stdout);
        });
    });
});


app.whenReady().then(createWindow);