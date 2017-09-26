const dev_env = require('./development');
const test_env = require('./test');
const NODE_ENV = process.env.NODE_ENV;
const config = {
  dev: dev_env,
  test: test_env,
}
module.exports = config[NODE_ENV];