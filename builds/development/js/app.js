var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

// var ref = new Firebase("https://<your-firebase>.firebaseio.com/");

myApp.controller('angularServices', function($scope, $http)	{
  $http.get('/js/bower.json').success(function(data){
  $scope.bower = data;
  console.log($scope.bower);
});
});

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'views/home.html',
      controller:  'angularServices'
    }).
    otherwise({
      redirectTo: '/home'
    });
}]);