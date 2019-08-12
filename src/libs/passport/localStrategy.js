const LocalStrategy = require('passport-local');
const User = require('../../models/user-model.js');

const opts = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
};

module.exports = new LocalStrategy(opts, (req, email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done('User doesn\'t exist!', false);
    }
    if (!user.checkPassword(password)) {
      return done('Incorrect password!', false);
    }
    return done(null, user);
  });
});

