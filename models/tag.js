var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    Resource = require('./resource');

var TagSchema = new Schema({
  image: String, 
  text: String, 
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }]
});


var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;