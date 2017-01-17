// function sleep (milliSeconds) {
//   var startTime = new Date().getTime();
//   while (new Date().getTime() < startTime + milliSeconds);
// }
// var exec = require('child_process').exec;
var querystring = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');
// var form = new formidable.IncomingForm();
function start(response, postData) {
  console.log("Request handle 'start' was called");
  // sleep(10000);
  // return 'Hello start';
  // exec('ls -lah', {
  //   timeout: 10000,
  //   maxBuffer: 1000 * 1024
  // }, function(error, stdout, stderr) {
  //   content = stdout;
  //   response.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   });
  //   response.write(stdout);
  //   response.end();
  // });
  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    // '<textarea name="text" rows="20" cols="60"></textarea>' +
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handle 'upload' was called");
  // response.writeHead(200, {
  //   'Content-Type': 'text/plain'
  // });
  // response.write("You've'sent text " + querystring.parse(postData).text);
  // response.end();
  var form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(request, function (err, fields, files) {
    console.log('pasing done');
    console.log(files.upload.path);
    fs.renameSync(files.upload.path, './tmp/sprite.png');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('received image:<br/>');
    response.write('<img src="/show"/>');
    response.end();
  })
}

function show (response, request) {
  console.log("Request handler 'show' was called.");
  fs.readFile('./tmp/sprite.png', 'binary', function (err, file) {
    if(err){
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(err + '/n');
      response.end();
    }else{
      response.writeHead(200, {'Content-Type': 'image/png'});
      response.write(file, 'binary');
      response.end();
    }
  });
}
exports.start = start;
exports.upload = upload;
exports.show = show;