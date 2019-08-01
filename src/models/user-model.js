const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    trim: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    trim: true,
  },
  userName: {
    type: String,
    minlength: 2,
    trim: true,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
    minlength: 2,
    trim: true,
  },
  city: {
    type: String,
    minlength: 2,
    trim: true,
  },
  mobilePhone: {
    type: String,
    minlength: 6,
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
});

module.exports = mongoose.model('User', userSchema);
