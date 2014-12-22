myApp.controller("UploadController", ["$scope", "$firebase", "$rootScope", "$resource",
    function($scope, $firebase, $rootScope, $resource) {

        var Files = $resource('/files/:id', { id: "@id" });

        angular.extend($scope, {

            model: { file: null },

            upload: function(model) {
                Files.prototype.$save.call(model.file, function(self, headers) {
                    console.log(model)
                    // Handle server response
                });
            }
        });   



    }
]);