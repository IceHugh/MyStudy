const log4js = require('log4js');

const log4js_config = require('../config/log_config');

log4js.configure(log4js_config);

const logUtil = {};
const errorLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('responseLogger');

logUtil.logError = (ctx, error, resTime) => {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, resTime));
  }
}

logUtil.logRes = (ctx, resTime) => {
  if (ctx) {
    resLogger.info(formatRes(ctx, resTime));
  }
}

function formatRes(ctx, resTime) {
  let logText = '';
  logText += '*********** response log start ***********' + '\n';
  logText += formatReq(ctx.request, resTime);
  logText += 'response status' + ctx.status + '\n';
  logText += 'response body' + '\n' + JSON.stringify(ctx.body) + '\n';
  logText += '*********** response log end ***********' + '\n';
  return logText;
}

function formatError(ctx, error, resTime) {
  let logText = '';
  logText += '*********** error log start ***********' + '\n';
  logText += formatReq(ctx.request, resTime);
  logText += 'err name' + error.name + '\n';
  logText += 'err message' + error.message + '\n';
  logText += 'err stack' + error.stack + '\n';
  logText += '*********** error log end ***********' + '\n';
  return logText;
}

function formatReq(req, resTime) {
  let logText = '';
  let method = req.method
  logText += 'request method ' + method + '\n';
  logText += 'request originalUrl' + req.originalUrl + '\n';
  logText += 'request clinet ip' + req.ip + '\n';
  if (method === 'GET') {
    logText += 'request query' + JSON.stringify(req.query) + '\n';
  } else {
    logText += 'request body' + JSON.stringify(req.body) + '\n';
  }
  logText += 'response time' + resTime + '\n';
  return logText
}
module.exports = logUtil;