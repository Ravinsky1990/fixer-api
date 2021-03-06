const LocalStrategy = require('passport-local');
const User = require('../../accounts/models/user');

const opts = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
};

module.exports = new LocalStrategy(opts, (req, email, password, done) => {
  // eslint-disable-next-line consistent-return
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done('User doesn\'t exist!', false);
    }
    if (!user.checkPassword(password)) {
      return done('incorrect password!', false);
    }
    return done(null, user);
  });
});
