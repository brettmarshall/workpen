myApp.controller("RegisterController", ["$scope", "$firebase", "$firebaseAuth",
  function($scope, $firebase, $firebaseAuth) {
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    $scope.data = sync.$asObject();

    $scope.register = function(data)	{

        var email = $scope.email;
        var pass = $scope.password;

    	$scope.authObj = $firebaseAuth(ref);

        $scope.authObj.$createUser(email, pass).then(function() {
          console.log("User created successfully!");

          return $scope.authObj.$authWithPassword({
            email: email,
            password: pass
          });

        }).then(function(authData) {
          console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
          console.error("Error: ", error);
        });

    	
    }
  }
]);