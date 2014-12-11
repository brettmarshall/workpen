myApp.controller("LoginController", ["$scope", "$firebase",
  function($scope, $firebase) {
    var ref = new Firebase("https://workpen.firebaseio.com/");
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    $scope.data = sync.$asObject();

    $scope.login = function(stuff)	{
    	
    	var email = $scope.email;
    	var password = $scope.password;

    	console.log('email: ' + email + ' password: ' +  password)
    }
  }
]);