const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

mongoose.model('Category', categorySchema);

module.exports = mongoose.model('Category', categorySchema);
