coffeeApp.controller('checkoutController', function($scope, $http, $location, $route, $cookies, userData) {

  	var userDataSuccess = function(resp) {
  	 	if (resp.data.success == false) {
  		 //User needs to log in
  		 	$location.path('/login');
  	 //	$location.path('/register?failure=badToken');
  	 	}else{
        console.log(resp.data);
  		 	$scope.userOptions = resp.data.doc;
        var d = new Date(resp.data.doc.deliveryDate)
        $scope.userOptions.deliveryDate = d.toLocaleDateString();
        $scope.total = Number(resp.data.doc.quantity) * 20;
  	 	}
  	};

  	var userDataError = function(resp) {
  		console.log("*** couldn't get user data **** ");
   	 	 console.log(resp.status);
  	 };

    userData.get($cookies.get('token'), userDataSuccess, userDataError);

	$scope.checkoutForm = function(){

     //use the data from the userData call instead of using the cookies.
     //bypass the api call and just forward to the receipt view;
     	$location.path('/receipt');

     /*
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
    */
	};
});
