# puppeteer 
无界面 chrome，俗称 无头浏览器

[官方文档](https://pptr.dev/)

[Getting Started with Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)

直接安装：npm i puppeteer 测试已失败：
ERROR: Failed to set up Chromium r737027! Set "PUPPETEER_SKIP_DOWNLOAD" env variable to skip download.

遂安装 puppeteer-core

puppeteer-core 和 puppeteer 区别是：puppeteer 会自动安装 chromium，但会失败啊。。

可以在 lunch 时指定executablePath：比如 /Applications/Google Chrome.app/Contents/MacOS/Google Chrome


