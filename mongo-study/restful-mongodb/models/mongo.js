const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/demoDb', {
  useMongoClient: true
});

const mongoSchema = mongoose.Schema;

const userSchema = {
  "userEmail": String,
  "userPassword": String
}

module.exports = mongoose.model('userlogin', userSchema);