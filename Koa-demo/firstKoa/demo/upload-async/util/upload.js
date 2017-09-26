const fs = require('fs');
const os = require('os');
const path = require('path');
const Busboy = require('busboy');
const inspect = require('util').inspect

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

function getSuffixName(filename) {
  let nameList = filename.split('.');
  return nameList[nameList.length - 1];
}

function uploadFile(ctx, options) {
  let req = ctx.req;
  let res = ctx.res;
  let busboy = new Busboy({
    headers: req.headers
  });


  let fileType = options.fileType || 'common';
  let filePath = path.join(options.path, fileType);
  let mkdirResult = mkdirsSync(filePath);

  return new Promise((resolve, reject) => {
    console.log('file uploading...');
    let result = {
      success: false,
      message: '',
      data: null
    }

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(`File [${fieldname}]: filename-${filename}`);
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename);
      let _uploadFilePath = path.join(filePath, fileName);
      let saveTo = path.join(_uploadFilePath);
      file.pipe(fs.createWriteStream(saveTo));
      file.on('data', (data) => {
        console.log(`File [${fieldname}] got ${data.length} bytes`);
      });
      file.on('end', () => {
        result.success = true;
        result.message = '文件上传成功';
        result.data = {
          pictureUrl: `//${ctx.host}/image/${fileType}/${fileName}`
        }
        console.log('文件上传成功');
        resolve(result);
      })
    });
    busboy.on('field', (fieldname, val, fieldTruncated, valTruncated) => {
      console.log(`Field [${fieldname}] : value: ${inspect(val)}`);
      result.formDate[fieldname] = inspect(val);
    });
    busboy.on('finish', () => {
      console.log('Done parsing form !');
      resolve(result);
    });
    busboy.on('error', (error) => {
      console.log('文件上传错误');
      reject(error);
    })
    req.pipe(busboy);
  });
}
module.exports = {uploadFile};