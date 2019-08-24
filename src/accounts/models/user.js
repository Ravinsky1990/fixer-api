/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First email is required!'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last email is required!'],
  },
  userName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'User email is required!'],
    trim: true,
    min: 6,
    validate: {
      validator(v) {
        return /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    unique: true,
    required: [true, 'User password is required!'],
    min: 6,
  },
  country: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  mobilePhone: {
    type: String,
    trim: true,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  gender: {
    type: String,
    enum: ['Mr', 'Ms'],
  },
  price: {
    type: String,
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    trim: true,
    default: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff',
  },
});

// eslint-disable-next-line consistent-return
userSchema.methods.checkPassword = function (passwordToCheck) {
  if (!passwordToCheck) return false;
  if (!this.password) return false;
  return bcrypt.compareSync(passwordToCheck, this.password);
};


module.exports = mongoose.model('User', userSchema);
