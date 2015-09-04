var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    Tag = require('./tag');

var ResourceSchema = new Schema ({
  name: String, 
  website: String,
  price: String,
  image: String,
  description: String, 
  tags: [Tag.schema]
});

var Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;