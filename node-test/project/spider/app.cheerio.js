const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'imgs2');
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath)
}

axios.get('https://www.bigbigwork.com/tupian/shu49_1.html')
  .then(res => {
    const data = res.data;
    const $ = cheerio.load(data);

    const $imgs = $('#items img')
    const result = $imgs.map((index, img) => {
      const src = $(img).attr('src');
      console.log(src);
      return axios.get(src, {
        responseType: 'arraybuffer',
        headers: {
          referer: "https://www.bigbigwork.com/",
        }
      })
        .then(_res => {
        const data = _res.data;
        const img = Buffer.from(data, 'binary');
        fs.writeFileSync(path.join(filePath, `${index}.png`), img);
      })
    })
  })

  
/* fetch("https://csimg3.bigurl.ink/jfi/b211c6df43e69709ae005b9df40b9aaf.jpg?x-oss-process=style/pc_236_webp_2x", {
  "headers": {
    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
    "sec-ch-ua-mobile": "?0"
  },
  "referrer": "https://www.bigbigwork.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
}); */