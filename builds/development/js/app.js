var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'firebase']);

var ref = new Firebase("https://workpen.firebaseio.com/");


myApp.controller("LogoutController", ["$scope", "$firebase", "$firebaseAuth",
  function($scope, $firebase, $firebaseAuth) {
    $scope.authObj = $firebaseAuth(ref);   
    console.log($scope.authObj)

    jQuery('#logout').on('click', function(e)  {
      $scope.authObj.$unauth();
      window.location = '/#/login';
      return false;
    });
  }
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'views/home.html',
      controller: 'LogoutController'
    },  {
      controller: 'ListController'
    }).
    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'LoginController'
    },  {
      controller: 'LogoutController'
    }). 
    when('/register', {
      templateUrl: 'views/register.html',
      controller:  'RegisterController'
    },  {
      controller: 'LogoutController'
    }).        
    otherwise({
      redirectTo: '/home'
    });
}]);