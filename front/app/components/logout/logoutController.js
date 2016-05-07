coffeeApp.controller('logoutController', function($rootScope, $scope, $cookies){
	$cookies.remove("token");
	$cookies.remove("username");
	$rootScope.$broadcast('userLoggedOut', {});

});
