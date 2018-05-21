const { app, BrowserWindow } = require('electron');
const electron = require('electron');
const os = require('os');
const fs = require('fs');

let mainWindow; 
const isDevMode = process.execPath.match(/[\\/]electron/);

const HOMEDIR = `${os.homedir()}/YOUOKE`;

if (!fs.existsSync(HOMEDIR)){
  fs.mkdirSync(HOMEDIR);
}

const createWindow = async () => {
  // Create the browser window.
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: true
  });

  if (isDevMode) {
    mainWindow.loadURL('http://localhost:4200');
    mainWindow.webContents.openDevTools();
  }else{
    mainWindow.loadURL(`file://${__dirname}/index.html`);
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
