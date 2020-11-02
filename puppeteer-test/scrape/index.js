const puppeteer = require("puppeteer");

let scrape = async () => {
  const browser = await puppeteer.launch({
    headless: false, // 默认true，不打开界面
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();

  await page.goto("http://www.ruanyifeng.com/blog/");
  await page.click(
    "#homepage > ul > li:nth-child(8) > a"
  );
  // await page.waitFor(1000); // 暂不需要

  const result = await page.evaluate(() => {
    const parent = document.querySelector('.module-categories.module');
    let items = parent.querySelectorAll(".module-list-item");
    let list = []
    Array.from(items).forEach(item => {
      let href = item.querySelector('a').href;
      list.push({ text: item.innerText, href});
    })

    return {
      list
    };
  });

  browser.close();
  return result;
};

scrape().then(value => {
  console.log(value); // Success!
});