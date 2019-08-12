const passport = require('koa-passport');

passport.use(require('./localStrategy'));
passport.use(require('./jwtStrategy'));

module.exports = passport;
