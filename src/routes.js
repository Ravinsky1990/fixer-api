const Router = require('koa-router');
const ctrl = require('./controllers');

const router = new Router();

router.get('/users', ctrl.getUsers);
router.post('/search', ctrl.searchUsers);
router.post('/sigh-up', ctrl.sighUp);
router.post('/sigh-in', ctrl.sighIn);
router.put('/user', ctrl.updateUser);

module.exports = router;
