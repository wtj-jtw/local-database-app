const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const duckdb = require('duckdb');

let db;

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  // 初始化 DuckDB 数据库
  db = new duckdb.Database(':memory:');
  createWindow();
});

ipcMain.handle('sql-query', async (event, sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        resolve({ error: err.message });
      } else {
        resolve({ rows });
      }
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});