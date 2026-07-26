const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const MAIN_URL = "https://backhost-thetaflicks.pages.dev/desktop";
const LOAD_TIMEOUT_MS = 15000; // 15 seconds before assuming the connection is too slow

let isLoading = true;
let loadTimeout;

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true // Keeps your app secure
    }
  });

  win.maximize();

  // Centralized function to handle loading the main URL with a timeout
  const startLoad = () => {
    clearTimeout(loadTimeout); // Clear any existing timeout to prevent overlaps
    isLoading = true;
    win.loadURL(MAIN_URL);
    
    loadTimeout = setTimeout(() => {
      if (isLoading) {
        console.log("Load timeout reached. Showing offline page.");
        win.loadFile(path.join(__dirname, "offline.html"));
      }
    }, LOAD_TIMEOUT_MS);
  };

  // Initial load
  startLoad();

  // 1. Successfully loaded
  win.webContents.on("did-finish-load", () => {
    // Only mark as loaded if we are actually on the main HTTPS URL
    if (win.webContents.getURL().startsWith("https://")) {
      isLoading = false;
      clearTimeout(loadTimeout);
    }
  });

  // 2. Failed to load (immediate offline, DNS error, etc.)
  win.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    console.log("Failed to load:", errorCode, errorDescription);
    isLoading = false;
    clearTimeout(loadTimeout);
    win.loadFile(path.join(__dirname, "offline.html"));
  });

  // 3. Prevent unauthorized navigation (preserves your original logic)
  win.webContents.on("will-navigate", (event, url) => {
    if (url !== win.webContents.getURL()) {
      event.preventDefault();
    }
  });

  // 4. Deny new window popups
  win.webContents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });

  // 5. Show window when ready
  win.once("ready-to-show", () => {
    win.show();
  });
}

app.whenReady().then(createWindow);

// Handle retry requests securely from the offline page
ipcMain.on("retry-load", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    // Re-trigger the load process with the timeout
    const startLoad = () => {
      clearTimeout(loadTimeout);
      isLoading = true;
      win.loadURL(MAIN_URL);
      loadTimeout = setTimeout(() => {
        if (isLoading) {
          win.loadFile(path.join(__dirname, "offline.html"));
        }
      }, LOAD_TIMEOUT_MS);
    };
    startLoad();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
