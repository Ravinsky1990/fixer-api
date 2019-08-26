const Router = require('koa-router');
const passport = require('koa-passport');
const ctrl = require('./controllers');

const router = new Router();

router.post('/users', passport.authenticate('jwt', { session: false }), ctrl.searchUsers);
router.get('/user', passport.authenticate('jwt', { session: false }), ctrl.getUser);
router.post('/sign-up', ctrl.signUp);
router.post('/sign-in', ctrl.signIn);
router.put('/photo', passport.authenticate('jwt', { session: false }), ctrl.updateUserPhoto);
router.put('/user:id', passport.authenticate('jwt', { session: false }), ctrl.updateUser);
router.post('/check-user', ctrl.isUserExist);
router.get('/categories', ctrl.getCategories)

module.exports = router;
