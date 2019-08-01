const mongoose = require('mongoose');
const User = require('./models/user-model');
const categorySchema = require('./models/category-model');

mongoose.model('Category', categorySchema);

const getUsers = async (ctx) => {
  const result = await User.find(
    { category: { $in: ['5d41f60825903907bc86f18f', '5d41f60825903907bc86f18e'] } },
  ).sort({ price: -1 })
    .populate('category');
  ctx.body = {
    users: result,
  };
};

const searchUsers = async (ctx) => {
  // expected {sort: "rating/price", filter: "front-end/back-end"}
};

module.exports = {
  getUsers,
};
