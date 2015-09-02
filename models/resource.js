var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResourceSchema = new Schema ({
  name: String, 
  website: String,
  description: String
});

var Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;