const router = require('koa-router')();
const user_controller = require('../../app/controllers/user_controller');
router.get('/getUser', user_controller.getUser);
router.post('/regiestUser', user_controller.regiestUser);

module.exports = router;