const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/users', passport.authenticate('jwt', { session: false }), ctrl.searchUsers);
router.get('/user/:id', passport.authenticate('jwt', { session: false }), ctrl.getUser);
router.post('/sigh-up', ctrl.sighUp);
router.post('/sigh-in', ctrl.sighIn);
router.put('photo', passport.authenticate('jwt', { session: false }));
router.put('/user:id', passport.authenticate('jwt', { session: false }), ctrl.updateUser);
router.post('/user', ctrl.isUserExist);

module.exports = router;
