const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  query: async (sql) => {
    return await ipcRenderer.invoke('sql-query', sql);
  }
});