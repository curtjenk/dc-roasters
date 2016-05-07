coffeeApp.controller('optionsController', function($scope, $http, $location, $route, $cookies) {
  var apiUrl = "http://localhost:3000";
  $scope.errorMessage = "";

  $scope.frequencies = [
    {
      option: "Weekly"
    },
    {
      option: "Every other week"
    },
    {
      option: "Monthly"
    }
  ];

  $scope.grinds = [
    {
      option: "Espresso"
    },
    {
      option: "Aeropress"
    },
    {
      option: "Drip"
    },
    {
      option: "Chemex/Clever"
    },
    {
      option: "French Press"
    }
  ];

  $http.get(apiUrl + '/getUserData?token='+$cookies.get('token')).then(
     function (response){
  			console.log(response);
        if (response.data.success = false) {
  				//User needs to log in
          $location.path('/login');
  			//	$location.path('/register?failure=badToken');
  			}else{
  				$scope.userOptions = response.data.resp;
  			}
  		}, function (error){
  			console.log(response.status);
  		});

  $scope.optionsForm = function(formID){

  		if(formID == 1){
  			var selectedGrind = $scope.selGrindOne;
  			var selectedQuantity = 2;
  			var selectedFrequency = 'weekly';
  		}else if(formID == 2){
  			var selectedGrind = $scope.selGrindTwo;
  			var selectedQuantity = 8;
  			var selectedFrequency = 'monthly';
  		}else if(formID == 3){
  			var selectedGrind = $scope.selGrindThree;
  			var selectedQuantity = $scope.quantity;
  			var selectedFrequency = $scope.frequency;
  		}
  		$http.post(apiUrl + '/options', {
  			quantity: selectedQuantity,
  			grind: selectedGrind,
  			frequency: selectedFrequency,
  			token: $cookies.get('token')
  		}).then(function(response){
  			if(response.data.success == true){
  				$location.path('/delivery');
  			}else{
  				$scope.errorMessage = 'Please contact support.';
  			}
  		}, function errorCallback(response){
  			console.log("ERROR.");
  		});
  	};

});
