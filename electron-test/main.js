const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      // https://stackoverflow.com/questions/37884130/electron-remote-is-undefined
      enableRemoteModule: true,
    },
  });
  // https://www.electronjs.org/docs/api/browser-window#event-ready-to-show
  // 在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 ready-to-show 事件 。 在此事件后显示窗口将没有视觉闪烁
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  const urlLocation = `file://${__dirname}/index.html`;
  mainWindow.loadURL(urlLocation);
});