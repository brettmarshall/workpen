myApp.controller("UserController", ["$scope", "$firebase", "md5",
  function($scope, $firebase, md5) {

    var authData = ref.getAuth();

    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);

        // gets the user id
        var user_id = authData.uid;    

        // gets the data specific to the logged in user
        var user = new Firebase("https://workpen.firebaseio.com/users/" + user_id);

        // gets user's email, hashes the email and preps it to be inserted
        // into an img to show user's gravatar avatar
        $scope.getAvatar = function(data)   {
            var userInfo = user.child('info');



            userInfo.on("value", function(snapshot) {
                $scope.userInfo = snapshot.val();
                $scope.avatar = md5.createHash($scope.userInfo.email || '');

            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });                 
        }
        // runs the getAvatar function on "load"
        $scope.getAvatar(); 

    } else  {
      window.location = '/#/login';
    } 

  }
]);