const url = require('url');
const fs = require('fs');
const path = require('path');
const walk = require('./walk');

function dir (url, reqPath) {
  let contentList = walk(reqPath);
  let html = '<ul>'
  for(let [index, item] of contentList.entries()) {
    html += `<li><a href="${url === '/' ? '' : url}/${item}">${item}</a></li>`;
  }
  html += '</ul>'
  return html;
}
 
module.exports = dir;