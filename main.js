const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    autoHideMenuBar: true
  });

  win.maximize();
  win.loadURL("https://backhost-thetaflicks.pages.dev/desktop");

  win.webContents.on("will-navigate", (event, url) => {
    if (url !== win.webContents.getURL()) {
      event.preventDefault();
    }
  });

  win.webContents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });

  win.once("ready-to-show", () => {
    win.show();
  });
}

app.whenReady().then(createWindow);