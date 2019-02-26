const path = require("path");
const { init } = require("./init.js")
const cmd = require("node-cmd");

const { app } = require("electron");
const { BrowserWindow } = require("electron");

let mainWindow = null;


function createWindow() {
    // Define our main window size
    mainWindow = new BrowserWindow({
        minHeight: 655,
        minWidth: 868,
        width: 868,
        useContentSize: false,
        height: 655,
        frame: false,
        //icon: './logo.png',
        autoHideMenuBar: true,
        backgroundColor: "#191F28",
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            zoomFactor: 1.0
        }
    });
    init();

    mainWindow.loadURL(`file://${__dirname}/app/www/index.html`);
    mainWindow.openDevTools();
    mainWindow.webContents.on("dom-ready", () => {
        mainWindow.show();
    });
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});