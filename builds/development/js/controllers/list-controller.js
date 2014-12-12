myApp.controller("ListController", ["$scope", "$firebase",
    function($scope, $firebase) {

    // gets user information
    var authData = ref.getAuth();

    if (authData) { // if logged in
        console.log("User " + authData.uid + " is logged in with " + authData.provider);

        // gets the user id
        var user_id = authData.uid;

        // gets the data specific to the logged in user
        var user = new Firebase("https://workpen.firebaseio.com/users/" + user_id);

        // gets the users tasks
        var tasks = user.child('tasks');

        // syncs the data between the app and firebase, also provides help functions
        var sync = $firebase(tasks);

        // reads the tasks as an object
        $scope.tasks = sync.$asObject();

        var key = '';

        // create a task
        $scope.createTask = function(data)  {

            // push the following data to the firebase json object
            sync.$push({
                // push the task and the timestamp
                task: $scope.task,
                timestamp : Firebase.ServerValue.TIMESTAMP,
                taskCompleted : false

            }).then(function(obj)  { // then clear the task create input
                key = obj.key();
                jQuery('#task-create').val('');
            }).then(function()  {
                var taskUpdate = tasks.child(key);
                taskUpdate = $firebase(taskUpdate);

                taskUpdate.$update({
                    taskKey : key
                }).then(function(data)  {

                });
            });

        }

        $scope.finishTask = function(data)  {
            var taskKey = '';

            console.log($scope)

            // sync.$update({
            //     taskCompleted : true
            // }).then(function(data)  {

            // });
        }


    } else {

        console.log("User is logged out");

    }    

  }
]);