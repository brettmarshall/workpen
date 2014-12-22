myApp.controller("RegisterController", ["$scope", "$firebase", "$firebaseAuth", "$rootScope",
  function($scope, $firebase, $firebaseAuth, $rootScope) {
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    $scope.data = sync.$asObject();

    // registers the user and logs them in and takes them to their task list
    // if there is an error, it just throws and error for now. need to do something with that.
    $scope.register = function(data)  {

        // grabs the email, password firstname and lastname
        var email = $scope.email;
        var pass = $scope.password;
        var firstname = $scope.firstname;
        var lastname = $scope.lastname;

      // accesses the authObj, which holds functions like createUser, removeUser, etc.
      $scope.authObj = $firebaseAuth(ref);

        // creates the user
        $scope.authObj.$createUser(email, pass).then(function() {

          // logs the user in
          return $scope.authObj.$authWithPassword({
            email: email,
            password: pass
          });         

        }).then(function(authData) {

          // creates an object to hold all the user's
          // information
          ref.child('users/' + authData.uid).set({
            info: {
              firstname : firstname,
              lastname : lastname,
              email : email
            }
          }); 

        }).then(function(authData) { // then redirect the user to their task list                    


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

        }).catch(function(error) { // if there's an error, grab the error

          $scope.error = error;

        });

    }

  }

]);
