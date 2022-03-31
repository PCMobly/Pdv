"use strict";

// Import parts of electron to use
const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  dev = true;
}

autoUpdater.requestHeaders = {"username":"paulo.castro@mobly.com.br", "appPassword": "nHWNuQ4PR8sZq592jdxm" };
autoUpdater.setFeedURL({
  provider: "generic",
  url: "https://bitbucket.org/mobly/pdv_electron/src/master/"
});

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');



// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send('message', text); 
}
function createWindow() {
  // Create the browser window.
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, './assets');

  const getAssetPath = (...paths) => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    icon: getAssetPath('icon.png'),

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });  
  
  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  const server = require("./src/api/index");

  mainWindow.loadURL("https://pdv-front-theta.vercel.app/#/");
  //mainWindow.loadURL("http://localhost:3000/#/");
  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show();

    

    // Open the DevTools automatically if developing
    if (dev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  }); 
  

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});

const template = [
  {
    label: 'Integrações',
    submenu: [
      {
        label: 'Site mobly',
        click: () => { mainWindow.loadURL("http://www.mobly.com.br"); }
      },
      {
        label: 'PDV mobly',
        click: () => { mainWindow.loadURL("https://pdv-front-theta.vercel.app/#/"); }
      },
      {
        label: 'PDV Sublimity',
        click: () => { mainWindow.loadURL("https://plataforma.sublimity.com.br/index.php"); }
      },
    ]

  },
  {
    label: 'Resolução PDV',
    submenu: [
      { label: 'Aumentar Zoom', role: 'zoomIn' },
      { label: 'Diminuir Zoom', role: 'zoomOut' },
      { label: 'Resetar Zoom', role: 'resetZoom' },
      { label: 'Full Screen', role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Sair',
    click: () => {app.quit();},
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);



// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify();
});

