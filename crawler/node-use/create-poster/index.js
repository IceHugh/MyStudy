const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const async = require('async');
const log4js = require('log4js').getLogger('begin crawler');
const arrange = require('./arrange')

const loveUrl = 'http://dianying.fm/search/?genre=%E5%96%9C%E5%89%A7&p=';

const begin = () => {
  let downLoads = 0;
  if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
    console.log(123);
    log4js.warn(`请从命令行中输入页数,宽度, 高度 forExample: node dingying.js 3 4 5 `);
    process.exit(0);
  }
  let pages = process.argv[2];
  let loop = new Array(parseInt(pages));
  async.eachOfLimit(loop, 2, (page, index, cbPage) => {
    request(loveUrl + pages[index], (err, res, body) => {
      let list = getStr(body);
      // console.log(list)
      async.eachSeries(list, (src, cbSrc) => {
        log4js.info(src, 'starting ...');
        let posterPath = getPosterPath(src);
        // console.log(posterPath)
        download(src, posterPath, (err) => {
          if (err) log4js.error(err);
          downLoads++;
          return cbSrc();
        });
      }, (err) => {
        return cbPage();
      })
    });
  }, (err) => {
    log4js.info('Downloads url total' + downLoads);
    arrange.arrange(process.argv[3], process.argv[4], (err, info) => {
      if (err) console.error(err);
      setTimeout(() => {
        log4js.info('finish: success');
        process.exit();
      }, 2000)
    })
  })
}
const download = (uri, fileName, cb) => {
  request.head(uri, (err, res, body) => {
    request(uri, {
      sendImmediately: true
    }).on('error', (err) => {
      console.log(err);
    }).pipe(fs.createWriteStream(fileName)).on('close', cb);
  })
}

const getStr = (body) => {
  let $ = cheerio.load(body);
  let list = [];
  $('ul[class="fm-result-list"]').find('li > div > a > img').each(function (index, element) {
    list.push($(element).attr('src'));
  });
  return list;
}

const getPosterPath = (src) => {
  let posterDir = path.join(__dirname, 'source');
  let posterName = src.split('/')[src.split('/').length - 1].split('-')[0];
  let posterPath = path.join(posterDir, posterName);
  return posterPath;
}
begin();