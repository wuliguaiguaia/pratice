const puppeteer = require("puppeteer");

async function getPic() {
  // 启动 chrome 实例
  // executablePath
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const page = await browser.newPage(); // 创建一个新的页面
  await page.setViewport({
    width: 500,
    height: 500,
    deviceScaleFactor: 2,
  });
  await page.goto("https://www.baidu.com/"); // 转到一个url
  await page.screenshot({ path: "screenshot/baidu.png" }); // 截屏

  await browser.close(); // 关闭浏览器
}

getPic();

// 截图默认 800×600px，可以通过 setViewport 设置宽高及缩放