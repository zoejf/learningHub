var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Resource = require('./models/resource'), 
    Tag = require('./models/tag');       

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/where_to_learn'
);

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//RESOURCE ROUTES
//send back all resources
app.get('/api/resources', function (req, res) {
  Resource.find({}, function (err, resources) {
    res.json(resources);
  });
});

//send back one specific resource - find by id
app.get('/api/resources/:id', function (req, res) {
  var targetId = req.params.id;

  Resource.findOne({_id: targetId}, function (err, foundResource) {
    res.json(foundResource);
  });
});

//create a new resource
app.post('/api/resources', function (req, res) {
  var newResource = new Resource({
    name: req.body.name,
    website: req.body.website,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description
  });

  newResource.save(function (err, savedResource) {
    res.json(savedResource);
  });
}); 
//end of resource routes

//TAGS ROUTES
//send back all tags
app.get('/api/tags', function (req, res) {
  Resource.distinct('tags', function (err, foundTags) {
    res.json(foundTags);
  })
})
//send back all tags for a specific resource
app.get('/api/resources/:resourceId/tags', function (req, res) {
  var targetId = req.params.resourceId;

  Resource.findOne({_id: targetId}, function (err, foundResource) {
    res.json(foundResource.tags);
  });
});

//create a new tag embedded in a resource
app.post('/api/resources/:resourceId/tags', function (req, res) {
  //set value of the list id from url params
  var resourceId = req.params.resourceId;  
  //store new tag in memory with data from request body
  var newTag = new Tag({ text: req.body.text });

  //find resource in db by id and add new tag
  Resource.findOne({_id: resourceId}, function (err, foundResource) {
    foundResource.tags.push(newTag);
    foundResource.save(function (err, savedResource) {
      res.json(newTag);
    });
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