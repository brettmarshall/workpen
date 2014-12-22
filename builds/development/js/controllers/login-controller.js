myApp.controller("LoginController", ["$scope", "$firebase", "$firebaseAuth", "$rootScope", "md5",
  function($scope, $firebase, $firebaseAuth, $rootScope, md5) {

    $scope.authObj = $firebaseAuth(ref);

    $scope.login = function(stuff)	{
    	
        $scope.authObj.$authWithPassword({
          email: $scope.email,
          password: $scope.password

        }).then(function(authData) {

            var authData = ref.getAuth();

            var user_id = authData.uid;    

            // gets the data specific to the logged in user
            var user = ref.child('users/' + user_id);    

            var userInfo = user.child('info');



            userInfo.on("value", function(snapshot) {
                $rootScope.userInfo = snapshot.val();
                $rootScope.avatar = md5.createHash($scope.userInfo.email || '');

            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });  

            $rootScope.loggedIn = true;
            window.location = '/#/home';

        }).catch(function(error) {
          $scope.error = error;
        });


    }
  }
]);