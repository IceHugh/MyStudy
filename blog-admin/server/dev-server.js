const Koa = require('koa');
const app = new Koa();
const opn = require('opn');
const Webpack = require('webpack');
const middleware = require('koa-webpack');

const devWebpackConfig = require('../config/webpack.dev.conf');
const { publicPath } = devWebpackConfig.output;
const compiler = Webpack(devWebpackConfig);
const PORT = process.env.PORT && Number(process.env.PORT) || 3001;

app.use(middleware({
  compiler,
  hot: {
    publicPath,
    port: PORT,
    hot: true,
  }
}));
app.listen(PORT, ()=> {
  opn(`http://localhost:${PORT}`)
});