const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('koa-passport');
const jwt = require('jsonwebtoken');
const categorySchema = require('./models/category');
const User = require('./models/user');
const sendMail = require('../utils/sendMail');

mongoose.model('Category', categorySchema);

const getUser = async (ctx) => {
  const { id } = ctx.params;
  try {
    const user = await User.findById(id);
    ctx.body = {
      user,
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      error: err,
    };
  }
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
  try {
    const result = await User.find(objToFind).sort({
      [reqBody.sort]: -1,
    }).populate('category');
    ctx.body = {
      users: result,
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      error: err,
    };
  }
};

const sighUp = async (ctx) => {
  const {
    email, password, firstName, lastName, userName,
  } = ctx.request.body;

  const salt = await bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user

  const userTosave = new User({
    email,
    password: passwordHash,
    firstName,
    lastName,
    userName,
  });

  // Save user

  try {
    const user = await userTosave.save();
    ctx.body = {
      user,
    };
    sendMail(user.email, 'fixer@ex.com', { name: user.firstName });
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
          userName: user.userName,
        },
      };
    } else {
      ctx.response.status = 404;
      ctx.body = {
        error: err,
      };
    }
  })(ctx, next);
};

const updateUser = async (ctx) => {
  const { id } = ctx.params;
  const updates = ctx.request.body;
  try {
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    ctx.body = {
      user,
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      error: err,
    };
  }
};

const isUserExist = async (ctx) => {
  const { email, userName } = ctx.request.body;
  const userNameExist = await User.find({ userName });
  const userEmailExist = await User.find({ email });

  if (userNameExist.length > 0) {
    if (userEmailExist.length > 0) {
      ctx.body = {
        result: 'This user-name and email already exist!',
      };
    } else {
      ctx.body = {
        result: 'This user-name exist!',
      };
    }
  } else if (userEmailExist.length > 0) {
    if (userNameExist.length > 0) {
      ctx.body = {
        result: 'This user-name and email already exist!',
      };
    } else {
      ctx.body = {
        result: 'This user-email exist!',
      };
    }
  } else {
    ctx.body = {
      result: 'ok',
    };
  }
};

// const updateUserPhoto = () => {

// };

module.exports = {
  searchUsers,
  getUser,
  sighUp,
  sighIn,
  updateUser,
  isUserExist,
};
