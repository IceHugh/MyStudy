const express = require('express');
const bodyParser = require('body-parser');

const mongoOp = require('./models/mongo');

const app = new express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': false
}));

router.get('/', function (req, res) {
  res.json({
    'error': false,
    'message': 'hello worold'
  });
});

router.route('/users')
  .get(function (req, res) {
    let response = {};
    mongoOp.find({}, function (err, data) {
      if (err) {
        response = {
          "error": true,
          "message": 'Error fetching data.'
        }
      } else {
        response = {
          "error": false,
          "message": data
        }
      }
      res.json(response);
    })
  })
  .post(function (req, res) {
    const db = new mongoOp();
    let response = {};
    db.userEmail = req.body.email;
    // console.log(req)
    db.userPassword = require('crypto')
      .createHash('sha1')
      .update(req.body.password)
      .digest('base64');
    db.save(function (err, data) {
      if (err) {
        response = {
          'error': true,
          'message': 'Error adding data'
        }
      } else {
        response = {
          'error': false,
          'message': 'Data added'
        }
      }
    });
  });
router.route('/users/:id')
  .get(function (req, res) {
    let response = {};
    console.log(req.params.id)
    mongoOp.findById(req.params.id, function (err, data) {
      if (err) {
        response = {
          'error': true,
          'message': 'Error fetching data'
        }
      } else {
        response = {
          'error': false,
          'message': data
        }
      }
      res.json(response);
    });
  })
  .put(function (req, res) {
    let response = {};
    mongoOp.findById(req.params.id, function (err, data) {
      if (err) {
        response = {
          'error': true,
          'message': 'Error fetching data'
        }
      } else {
        if (req.body.email !== undefined) {
          data.userEmail = req.body.email;
        }
        if (req.body.password !== undefined) {
          data.userPassword = req.body.password;
        }
        data.save(function(err, data) {
          if (err) {
            response = {
              'error': true,
              'message': 'Error updating data'
            }
          } else {
            response = {
              'error': false,
              'message': 'Data is updated for ' + req.params.id 
            }
          }
          res.json(response);
        })
      }
    });
  })
  .delete(function(req, res) {
    let response = {};
    console.log(req.params.id)
    mongoOp.findById(req.params.id, function (err, data) {
      if (err) {
        response = {
          'error': true,
          'message': 'Error fetching data'
        }
      } else {
        mongoOp.remove({_id: req.params.id}, function(err, data) {
          if (err) {
            response = {
              'error': true,
              'message': 'Error deleting data'
            }
          } else {
            response = {
              'error': false,
              'message': 'Data assoicated with' + req.params.id + 'is deleted'
            }
          }
          res.json(response);
        })
      }
    });
  });
app.use('/', router);
app.listen(3000, function () {
  console.log('Listening to PORT 3000');
});