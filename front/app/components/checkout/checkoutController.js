coffeeApp.controller('checkoutController', function($scope, $http, $location, $route) {
  $http.get(apiUrl + '/getUserData?token='+$cookies.get('token'),{
	}).then(function successCallback(response){
		console.log(response);
		if(response.data.failure == 'badToken'){
			//User needs to log in
			$location.path('/register?failure=badToken');
		}else{
			$scope.userOptions = response.data;
		}
	}, function errorCallback(response){
		console.log(response.status);
	});

	$scope.checkoutForm = function(){
			$http({
			method: 'POST',
			url: apiUrl + '/checkout',
			data: {
				token: $cookies.get('token'),
				frequency: $cookies.get('frequency'),
				quantity: $cookies.get('quantity'),
				grindType: $cookies.get('grindType'),
				fullname: $cookies.get('fullname'),
				addressOne: $cookies.get('addressOne'),
				addressTwo: $cookies.get('addressTwo'),
				city: $cookies.get('city'),
				state: $cookies.get('state'),
				zip: $cookies.get('zip'),
				deliveryDate: $cookies.get('deliveryDate')
			}
		}).then(function successCallback(response){
			if (response.data.failure == 'noToken'){
					// invalid token, so redirect to login page
					$location.path('/login');
				} else if (success = 'tokenMatch') {
					//redirect to receipt page
					$location.path('/receipt');
				}
		}, function errorCallback(status){
			console.log(status);
		});
	};
});
