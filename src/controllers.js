const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const categorySchema = require('./models/category-model');
const User = require('./models/user-model');
const sendMail = require('./utils/sendMail');

mongoose.model('Category', categorySchema);

const getUsers = async (ctx) => {
  const result = await User.find({}).populate('category');
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.body = {
    users: result,
  };
};

const searchUsers = async (ctx) => {
  // variables to use in queries

  const reqBody = ctx.request.body;
  const categoriesId = {
    front: '5d41f60825903907bc86f18e',
    back: '5d41f60825903907bc86f18f',
  };

  const searchText = /./;
  const objToFind = {};

  // set category

  if (reqBody.category) {
    if (reqBody.category === 'Front-end') {
      objToFind.category = categoriesId.front;
    } else {
      objToFind.category = categoriesId.back;
    }
  }

  // set search text

  if (reqBody.text === '') {
    objToFind.$or = [{
      firstName: {
        $regex: searchText,
      },
    },
    {
      lastName: {
        $regex: searchText,
      },
    }];
  } else {
    objToFind.$or = [{
      firstName: {
        $regex: new RegExp(reqBody.text, 'i'),
      },
    },
    {
      lastName: {
        $regex: new RegExp(reqBody.text, 'i'),
      },
    }];
  }

  // get users

  const result = await User.find(objToFind).sort({
    [reqBody.sort]: -1,
  }).populate('category');

  ctx.body = {
    users: result,
  };
};

const sighUp = async (ctx) => {
  const { email, password, firstName, lastName, userName } = ctx.request.body;

  const salt = await bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user

  const user = new User({
    email,
    password: passwordHash,
    firstName,
    lastName,
    userName
  });

  // Save user

  try {
    const savedUser = await user.save();
    ctx.body = {
      user: savedUser,
    };

    sendMail(savedUser.email, 'fixer@ex.com', {name: savedUser.firstName});
  } catch (error) {
    ctx.response.status = 400;
    ctx.body = {
      error,
    };
  }
};

const sighIn = async (ctx, next) => {
  await passport.authenticate('local', (err, user) => {
    if (user) {
      const payload = {
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
      };
      ctx.body = {
        token: jwt.sign(payload, process.env.TOKEN_SECRET),
        user: {
          email: user.email,
          // eslint-disable-next-line no-underscore-dangle
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
    } else {
      ctx.body = {
        error: err,
      };
    }
  })(ctx, next);
};

const updateUser = async (ctx, next) => {
  await passport.authenticate('jwt', async (err, user) => {
    if (user) {
      const { email } = ctx.request.body;
      const dataToUpdate = { email };
      // eslint-disable-next-line no-underscore-dangle
      const updatedUser = await User.findByIdAndUpdate(user._id, dataToUpdate, { new: true });
      ctx.body = {
        user: updatedUser,
      };
    } else {
      ctx.body = {
        error: err,
      };
    }
  })(ctx, next);
};

module.exports = {
  getUsers,
  searchUsers,
  sighUp,
  sighIn,
  updateUser,
};
