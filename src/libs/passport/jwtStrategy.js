const JwtStrategy = require('passport-jwt').Strategy;
// eslint-disable-next-line prefer-destructuring
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv = require('dotenv');
const User = require('../../models/user-model');

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.TOKEN_SECRET,
};

module.exports = new JwtStrategy(opts, (jwtPayload, done) => {
  User.findById(jwtPayload.id, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});
