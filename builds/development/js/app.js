var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'firebase', 'angular-md5', 'ur.file', 'ngResource'])
.run(function() {
  FastClick.attach(document.body);
});

var ref = new Firebase("https://workpen.firebaseio.com/");


myApp.controller("LogoutController", ["$scope", "$firebase", "$firebaseAuth", "$rootScope",
  function($scope, $firebase, $firebaseAuth, $rootScope) {
    $scope.authObj = $firebaseAuth(ref);   
    console.log($scope.authObj)

    jQuery('#logout').on('click', function(e)  {
      $scope.authObj.$unauth();
      $rootScope.loggedIn = false;
      window.location = '/#/login';
      return false;
    });
  }
]);

myApp.filter('quoteencode', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'views/home.html',
      controller: 'LogoutController'
    },  {
      controller: 'ListController'
    },  {
      controller: 'UserController'
    }).


    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'LoginController'
    },  {
      controller: 'LogoutController'
    },  {
      controller: 'UserController'
    }). 

    when('/settings', {
      templateUrl: 'views/settings.html',
      controller:  'LogoutController'
    },  {
      controller: 'UserController'
    },  {
      controller: 'SettingsController'      
    }).     


    when('/register', {
      templateUrl: 'views/register.html',
      controller:  'RegisterController'
    },  {
      controller: 'LogoutController'
    },  {
      controller: 'UserController'
    }).  


    otherwise({
      redirectTo: '/home'
    });
}]);