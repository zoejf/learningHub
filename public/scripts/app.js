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

app.controller('MainCtrl', ['$scope', function ($scope) {

}]);

app.controller('HomeCtrl', ['$scope', 'Resource', function ($scope, Resource) {
  $scope.test = "PROJECT 3!";
}]);
