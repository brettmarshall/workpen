var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'firebase', 'angular-md5']);

var ref = new Firebase("https://workpen.firebaseio.com/");


myApp.controller("LogoutController", ["$scope", "$firebase", "$firebaseAuth",
  function($scope, $firebase, $firebaseAuth) {
    $scope.authObj = $firebaseAuth(ref);   
    console.log($scope.authObj)

    jQuery('#logout').on('click', function(e)  {
      $scope.authObj.$unauth();
      window.location = '/#/login';
      return false;
    });
  }
]);

myApp.filter('quoteencode', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'views/home.html',
      controller: 'LogoutController'
    },  {
      controller: 'ListController'
    },  {
      controller: 'UserController'
    }).


    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'LoginController'
    },  {
      controller: 'LogoutController'
    },  {
      controller: 'UserController'
    }). 

    when('/settings', {
      templateUrl: 'views/settings.html',
      controller:  'LogoutController'
    },  {
      controller: 'UserController'
    }).     


    when('/register', {
      templateUrl: 'views/register.html',
      controller:  'RegisterController'
    },  {
      controller: 'LogoutController'
    },  {
      controller: 'UserController'
    }).  


    otherwise({
      redirectTo: '/home'
    });
}]);
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
myApp.controller("RegisterController", ["$scope", "$firebase", "$firebaseAuth",
  function($scope, $firebase, $firebaseAuth) {
    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // download the data into a local object
    $scope.data = sync.$asObject();

    // registers the user and logs them in and takes them to their task list
    // if there is an error, it just throws and error for now. need to do something with that.
    $scope.register = function(data)	{

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
          ref.child('users/' + authData.uid).$set({
            info: {
              firstname : firstname,
              lastname : lastname,
              email : email
            }
          }); 

        }).then(function(authData) { // then redirect the user to their task list                    

          window.location = '/#/home';

        }).catch(function(error) { // if there's an error, grab the error

          $scope.error = error;

        });

    }

  }

]);
myApp.controller("ListController", ["$scope", "$firebase", "md5", "$http",
    function($scope, $firebase, md5, $http) {

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
        $scope.tasks = sync.$asObject();
        
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

        $scope.finishTask = function($event)  {

            // gets the tasks that is being clicked
            var input = $event.target;
            var taskKey = jQuery(input).attr('data-key');

            // gets the task location
            var taskKeyUpdate = tasks.child(taskKey);

            // wraps taskKeyUpdate with firebase so it can access the $update function
            taskKeyUpdate = $firebase(taskKeyUpdate);

            // updates the task to completed
            taskKeyUpdate.$update({
                taskCompleted : true
            });
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
        }

        $scope.designQuote();


    } else {

        console.log("User is logged out");

    }    

  }
]);
/* Adds active link functionality */

myApp.directive('isActiveNav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function(scope, element) {
   scope.location = $location;
   scope.$watch('location.path()', function(currentPath) {
     if('/#' + currentPath === element[0].attributes['href'].value) {
       element.addClass('active');
     } else {
       element.removeClass('active');
     }
   });
 }
 };
}]);