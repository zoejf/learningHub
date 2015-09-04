var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    Resource = require('./resource');

var TagSchema = new Schema({
  text: {
    type: String, 
    required: true
  }
});


var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;