coffeeApp.controller('logoutController', function($rootScope, $scope, $cookies){
	$scope.errorMessage = "";
	$cookies.remove("token");
	$cookies.remove("username");
	$rootScope.$broadcast('userLoggedOut', {});

});
