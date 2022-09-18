const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { argv } = require('process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 300,
    minWidth: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  console.log(argv);

  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Change contextMenuStrip

  // Menu.setApplicationMenu(null)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();



  /////////////////////////////////////////////////////
  /// IF THERE IS ANY UPDATE THIS VALUE MUST BE CHANGED
  var currentVersion = "1.0.1";
  /// IF THERE IS ANY UPDATE THIS VALUE MUST BE CHANGED
  /////////////////////////////////////////////////////

  const fs = require('fs');
  const https = require('https');

  // URL of the image
  const url = 'https://www.googleapis.com/drive/v3/files/1j_ezjAgajPuIZonssVG_cPiLhXGPpcxo?alt=media&key=AIzaSyA6v7mmPnoByO280Scv-cxWUHLM1pcOtQ4';

  https.get(url,(res) => {
    // Image will be stored at this path
    const path = "version.txt"; 
    const filePath = fs.createWriteStream(path);
    res.pipe(filePath);
    filePath.on('finish',() => {
        filePath.close();
        console.log('Download Completed'); 

        try {
            const data = fs.readFileSync('version.txt', 'utf8');
            console.log(data);

            if(data != currentVersion){
                console.log("Update founded");

                createUpdateWindow();
            }
          } catch (err) {
            console.error(err);
          }
    });
  });
  };


const createUpdateWindow = () => {
    // Create the browser window.
    const UpdateWindow = new BrowserWindow({
      width: 700,
      height: 300,
      minHeight: 300,
      minWidth: 550,
      roundedCorners: true,
      resizable: false,
      fullscreenable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'update_preload.js'),
      },
    });

    UpdateWindow.setMenu(null);
  
    // and load the index.html of the app.
    UpdateWindow.loadFile(path.join(__dirname, 'update.html'));
  
    // Change contextMenuStrip
  
    // Menu.setApplicationMenu(null)
  
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    ipcMain.on('update-event', (event, arg) => {
      event.returnValue = 'Message received!'
      require('electron').shell.openExternal(arg);
    })
  };

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
