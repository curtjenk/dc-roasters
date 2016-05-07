coffeeApp.controller('deliveryController', function($scope, $http, $location, $cookies){
	$scope.dlvrStateOptions = states;
 $scope.deliveryMessage = "";

 function is_int(value) {
		 if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
				 return true;
		 } else {
				 return false;
		 }
 }

	$http.get(apiUrl + '/getUserData?token='+$cookies.get('token'),{
	}).then(function successCallback(response){
		console.log(response);
		if(response.data.success == false){
			//User needs to log in
			$location.path('/register?failure=badToken');
		}else{
			//TODO: what should happen with userOptions?
			$scope.userOptions = response.data;
		}
	}, function errorCallback(response){
		console.log(response.status);
	});


	$scope.deliveryFunc = function(){

		$http.post(apiUrl + '/delivery', {
			fullname: $scope.dlvrName,
			addressOne: $scope.dlvrAddr1,
			addressTwo: $scope.dlvrAddr2,
			usrCity: $scope.dlvrCity,
			usrState: $scope.dlvrState,
			usrZip: $scope.dlvrZip,
			deliveryDate: $scope.dlvrDate,
			token: $cookies.get('token')
		}).then(function successCallback(response){
			console.log(response.data.success);
			if(response.data.success == 'updated'){
				$location.path('/checkout');
			}
		}, function errorCallback(response){
			console.log("ERROR.");
		});

	};
});
