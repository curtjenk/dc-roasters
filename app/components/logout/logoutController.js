coffeeApp.controller('logoutController', function($rootScope, $scope, $cookies, sharedData){
	$scope.errorMessage = "";
	$cookies.remove("token");
	$cookies.remove("username");
	// $rootScope.$broadcast('userLoggedOut', {});
	$scope.$emit("userLoggedOut");

});
