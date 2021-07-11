const http = require('https');
const path = require('path');
const fs = require('fs');
const { default: axios } = require('axios');

const filePath = path.join(__dirname, 'imgs');
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath)
}

http.get('https://unsplash.com/napi/search/photos?query=food&per_page=20&page=2&xp=', res => {
  let data = ''
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const results = JSON.parse(data).results;
    results.forEach(item => {
      const url = item.urls.full;
      console.log(url);
      /* http.get(url, {}, (_res) => {
        let _data = ''
        _res.on('data', chunk => {
          _data += chunk;
        })
        _res.on('end', () => {
          const img = Buffer.from(_data, 'binary');
          fs.writeFileSync(path.join(filePath, `${item.id}1`), img);
        })
      }) */
      axios.get(url, {
        responseType: 'arraybuffer'
      }).then(res => {
        const data = res.data;
        const img = Buffer.from(data, 'binary');
        fs.writeFileSync(path.join(filePath, `${item.id}`), img);
      })
    });
  })
})

/* axios.get('https://unsplash.com/napi/search/photos?query=food&per_page=20&page=2&xp=')
  .tnen(res => {
    const data = res.data;
    console.log(data);
}) */