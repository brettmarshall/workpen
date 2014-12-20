/* DOM manipulation for task tools  */

myApp.directive('navOpen', [ '$location', function($location) {
	return function(scope, element, attr) {
		
		var openNav = function(element)	{
			jQuery('.sidebar, .main, .nav-icon').toggleClass('active-nav');
		}

		element.bind('click', openNav);
	}
}]);