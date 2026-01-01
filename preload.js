const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
    ping: () => 'pong',
    runCommand: (cmd) => ipcRenderer.invoke("run-command", cmd),
});