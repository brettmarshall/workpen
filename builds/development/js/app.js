var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'firebase']);

var ref = new Firebase("https://workpen.firebaseio.com/");

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'views/home.html'
    }).
    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'LoginController'
    }). 
    when('/register', {
      templateUrl: 'views/register.html',
      controller:  'RegisterController'
    }).        
    otherwise({
      redirectTo: '/home'
    });
}]);