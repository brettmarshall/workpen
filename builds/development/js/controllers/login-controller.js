myApp.controller("LoginController", ["$scope", "$firebase", "$firebaseAuth",
  function($scope, $firebase, $firebaseAuth) {

    $scope.authObj = $firebaseAuth(ref);

    $scope.login = function(stuff)	{
    	
        $scope.authObj.$authWithPassword({
          email: $scope.email,
          password: $scope.password

        }).then(function(authData) {
          window.location = '/#/home';

        }).catch(function(error) {
          $scope.error = error;
        });


    }
  }
]);