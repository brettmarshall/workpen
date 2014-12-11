var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'firebase']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'views/home.html'
    }).
    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'LoginController'
    }).    
    otherwise({
      redirectTo: '/home'
    });
}]);