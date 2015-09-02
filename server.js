var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Resource = require('./models/resource');       

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/where_to_learn'
);

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//send back all resources
app.get('/api/resources', function (req, res) {
  Resource.find({}, function (err, resources) {
    res.json(resources);
  });
});





//set location for static files and angular app
app.use(express.static( __dirname + '/public'));
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});