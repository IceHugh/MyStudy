const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logUtil = require('./utils/log_util');
const convert = require('koa-convert');
const router = require('koa-router')();

const response_formatter = require('./middlewares/response_formatter');
const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')
// error handler
onerror(app)


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json());

// logger
app.use(async (ctx,next) => {
  let startTime = new Date();
  let ms;
  try {
    await next();
    ms = new Date() - startTime;
    logUtil.logRes(ctx, ms);
  } catch (error) {
    ms = new Date() - startTime;
    logUtil.logError(ctx, error, ms)
  }
})
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(response_formatter('^/api'));

// routes
router.use('/',index.routes(), index.allowedMethods());
router.use('/api',api.routes(), api.allowedMethods());
router.use('/users',users.routes(), users.allowedMethods());
app.use(router.routes(),router.allowedMethods());

module.exports = app
