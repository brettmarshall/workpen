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