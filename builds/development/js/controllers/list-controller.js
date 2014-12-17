myApp.controller("ListController", ["$scope", "$firebase", "md5", "$http", "$interval",
    function($scope, $firebase, md5, $http, $interval) {

    // gets user information
    var authData = ref.getAuth();

    if (authData) { // if logged in
        

        // gets the user id
        var user_id = authData.uid;

        // gets the data specific to the logged in user
        var user = new Firebase("https://workpen.firebaseio.com/users/" + user_id);

        // gets the users tasks
        var tasks = user.child('tasks');

        // syncs the data between the app and firebase, also provides help functions
        var sync = $firebase(tasks);

        // reads the tasks as an object
        $scope.tasks = sync.$asArray();

        $scope.filteredResults = '';
        
        // will expose the results of the createTask.then obj function to the next .then function
        var key = '';

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

        $scope.completedToggle = function($event)  {

            // gets the tasks that is being clicked
            var input = $event.target;
            var taskKey = jQuery(input).attr('data-key');

            // gets the task location
            var taskKeyUpdate = tasks.child(taskKey);

            var isCompletedBool = tasks.child(taskKey + '/taskCompleted');

            // wraps taskKeyUpdate with firebase so it can access the $update function
            taskKeyUpdate = $firebase(taskKeyUpdate);

            var taskObj = $firebase(isCompletedBool).$asArray();

            $scope.comBool = '';

            isCompletedBool.on("value", function(snapshot) {
                return $scope.comBool = snapshot.val();
            });

            console.log($scope.comBool)

            if ($scope.comBool == true) {
                // updates the task to completed
                taskKeyUpdate.$update({
                    taskCompleted : false
                });
            } else  {
                // updates the task to completed
                taskKeyUpdate.$update({
                    taskCompleted : true
                });                
            }

        }

        $scope.deleteTask = function($event)    {
            // gets the tasks that is being clicked
            var input = $event.target;
            var taskKey = jQuery(input).attr('data-key');

            // gets the task location
            var taskKeyUpdate = tasks.child(taskKey);

            var obj = $firebase(taskKeyUpdate);

            console.log(obj)
            obj.$remove();      
        }

        $scope.designQuote = function() {

            var url = "http://quotesondesign.com/api/3.0/api-3.0.json" + "?callback=JSON_CALLBACK";

            $http.jsonp(url).
              success(function(data, status, headers, config) {

                $scope.quote = data.quote;
                $scope.author = data.author;

              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              }); 

              console.log("working");                         
        }

        $scope.designQuote();  

        // fetches the quote every minutes
        setInterval( function(){ $scope.designQuote(); }, 120000);

    } else {

        console.log("User is logged out");

    }    

  }

]);