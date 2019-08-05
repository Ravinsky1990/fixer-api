const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.get('/users', ctrl.getUsers);
router.post('/search', ctrl.searchUsers);

module.exports = router;
