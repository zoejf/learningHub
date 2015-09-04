var app = angular.module('whereToLearn', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/templates/home.html', 
      controller: 'HomeCtrl'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

app.service('Resource', ['$resource', function ($resource) {
  return $resource('/api/resources/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
}]);

app.service('Tag', ['$resource', function ($resource) {
  return $resource('/api/tags/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
}]);

app.controller('MainCtrl', ['$scope', function ($scope) {

}]);

app.controller('HomeCtrl', ['$scope', 'Resource', 'Tag', function ($scope, Resource, Tag) {
  // $scope.resources = [{id: 1, name: 'Kahn Academy', website: 'https://www.khanacademy.org/', price: 'Free', image: 'http://i.imgur.com/U3fi4o7.png', description: "Khan Academy offers practice exercises, instructional videos, and a personalized learning dashboard that empower learners to study at their own pace in and outside of the classroom. We tackle math, science, computer programming, history, art history, economics, and more. Our math missions guide learners from kindergarten to calculus using state-of-the-art, adaptive technology that identifies strengths and learning gaps. We've also partnered with institutions like NASA, The Museum of Modern Art, The California Academy of Sciences, and MIT to offer specialized content."},
  //                     {id: 2, name: 'Udacity', website: 'https://www.udacity.com/', price: 'Most courses are $200/month for 6-9 months', image: 'http://i.imgur.com/ZraYjD3.png', description: "Udacity offers Nanodegree programs and credentials, designed so professionals become Web Developers, Data Analysts, Mobile Developers, etc. Students acquire real skills through a series of online courses and hands-on projects."}, 
  //                     {id: 3, name: 'Treehouse', website: 'https://teamtreehouse.com/features', price: 'Basic Plan: $25/month; Pro Plan: $49/month; 14 day free trial available', image: 'http://i.imgur.com/eag0mvw.png' ,description: "Whether you are trying to land a new job, brush up on your skills, or learn how to build your ideas, Treehouse has the right content for you. Treehouse teaches the skills necessary to get a new job or stay fresh on your game at an existing gig. Basic plans allow access to 1,000+ videos, the Code Challenge Engine, and members-only help forums. Additionally, the Pro Plan allows you to watch talks from industry leaders and other bonus content."}
  //                     ];
  $scope.resources = Resource.query();
  // $scope.tags = [{id:1, image: 'fa-usd', text: 'Free'}, {id: 2, image: 'fa-graduation-cap', text: 'Degree or Certificate'}, {id: 3, image: 'fa-certificate', text: 'Professional Teachers'}, {id: 4, image: 'fa-laptop', text: 'Learn online'}, {id: 5, image: 'fa-users', text:'Learn from Community Members'}, {id: 6, image: 'fa-university', text:'In-Person Classes'}];

}]);

