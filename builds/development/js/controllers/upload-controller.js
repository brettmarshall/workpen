myApp.controller("SettingsController", ["$scope", "$firebase", "$rootScope", "$resource",
    function($scope, $firebase, $rootScope, $resource) {

        // var Files = $resource('/files/:id', { id: "@id" });

        // angular.extend($scope, {

        //     model: { file: null },

        //     upload: function(model) {
        //         Files.prototype.$save.call(model.file, function(self, headers) {
        //             console.log(model)
        //             // Handle server response
        //         });
        //     }
        // });   


        $scope.getAvatar = function(data)   {

            var authData = ref.getAuth();

            var userInfo = ref.child('users/' + authData.uid + '/info');

            userInfo.on("value", function(snapshot) {
                $scope.userInfo = snapshot.val();

            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });                 
        }
        // runs the getAvatar function on "load"
        $scope.getAvatar();

        $scope.updateName = function($event)  {

            var authData = ref.getAuth();

            var firstname = $scope.firstname;
            var lastname = $scope.lastname;

            var userFirstName = $firebase(ref.child('users/' + authData.uid + '/info'));
            var userLastName = $firebase(ref.child('users/' + authData.uid + '/info'));            

            userFirstName.$update({ firstname : firstname }); 
            userLastName.$update({ lastname : lastname }); 

            jQuery('#userInfoForm input[type="text"]').val('');

        } 

        $scope.updateEmail = function($event)  {

            var authData = ref.getAuth();

            var email = $scope.email;

            var userEmail = $firebase(ref.child('users/' + authData.uid + '/info'));

            userEmail.$update({ email : email }); 

            jQuery('#userEmailForm input[type="email"]').val('');

        }         

    }
]);