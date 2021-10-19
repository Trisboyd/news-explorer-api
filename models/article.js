const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  source: {
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a valid url',
      isAsync: false,
    },
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a valid url',
      isAsync: false,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    select: false,
  }
});
