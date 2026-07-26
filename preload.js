const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  retryLoad: () => ipcRenderer.send('retry-load')
});
