'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: String,
  number: String
});

module.exports = mongoose.model('Contact', ContactSchema);