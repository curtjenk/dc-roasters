coffeeApp.controller('logoutController', function($scope, $cookies){
	$cookies.remove("token");
	$cookies.remove("username");
});
