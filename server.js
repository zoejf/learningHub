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

//delete a tag from a resource
app.delete('/api/resources/:resourceId/tags/:id', function (req, res) {
  //set the value of the list id and tag id
  var resourceId = req.params.resourceId;
  var tagId = req.params.id;
  console.log("resourceId",resourceId);
  console.log("tagId", tagId);

  //find resource in db by id
  Resource.findOne({_id: resourceId}, function (err, foundResource) {
    //find tag in array of reference ids
    var foundTag = foundResource.tags.indexOf(tagId);
    console.log("foundTag: ", foundTag);
    foundResource.tags.splice(foundTag, 1);
    foundResource.save(function (err, savedResource) {
      res.json(foundResource);
    });
  });
});

//delete a resource
app.delete('/api/resources/:id', function (req, res) {
  var targetId = req.params.id;
  //find tag in db by id and remove it
  Resource.findOneAndRemove({_id: targetId}, function (err, deletedResource) {
    res.json(deletedResource);
  });
});

//assign an existing tag to a resource (update the resource)
app.put('/api/resources/:id/tags', function (req, res) {
  //set the value of the reference id
  var targetId = req.params.id;
  //set the value of the tag id from the form/input
  var tagId = req.body.id;
  console.log(tagId);
  // var tagReference = Tag.find({_id: tagId});
  // console.log(tagReference);

  Resource.findOne({_id: targetId}, function (err, foundResource) {
    foundResource.tags.push(tagId);
    foundResource.save(function (err, savedResource) {
      res.json(savedResource);
    })
  })

})
  //find resource by params id 
  //find tag by params id

  //push tag into resource.tags array
  //push resource into tag.resources array


//end of resource routes

//TAGS ROUTES
//send back all tags
app.get('/api/tags', function (req, res) {
  Tag.find({}, function (err, tags) {
    res.json(tags);
  });
});

//send back one tag
app.get('/api/tags/:id', function (req, res) {
  var targetId = req.params.id;

  Tag.findOne({_id: targetId}, function (err, foundTag) {
    res.json(foundTag);
  });
});

//create a new tag
app.post('/api/tags', function (req, res) {
  var newTag = new Tag({
    image: req.body.image,
    text: req.body.text
  });

  newTag.save(function (err, savedTag) {
    res.json(savedTag);
  });
}); 

//delete a tag
app.delete('/api/tags/:id', function (req, res) {
  var targetId = req.params.id;
  //find tag in db by id and remove it
  Tag.findOneAndRemove({_id: targetId}, function (err, deletedTag) {
    res.json(deletedTag);
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