const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const page = await browser.newPage();
  await page.goto('http://www.ruanyifeng.com/blog/2016/08/http.html');

  // evaluate 内可进行dom操作
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  await page.pdf({ 
    path: path.join(__dirname, '阮一峰 http 入门.pdf'), // 没有path就不会保存pdf
    printBackground: true, // 默认 false，不包括背景信息
    format: 'A4', // 或者是 width，height，但 format 优先级较高
    displayHeaderFooter: true, // 是否展示页眉页脚
    // headerTemplate: '<p class="title" style="text-align: center; width:100%; height: 20px; line-height: 20px;margin-top: -14px;font-size: 10px; color: #555;">fdsfsd</p>',
    // footerTemplate: '<p>fdsfdsfds</p>',
    margin: { // 设置页面上下margin 用于显示页眉页脚
      top: 30,
      bottom: 30
    }
  });
  await browser.close();
})();


// todo： 需要登录的网页