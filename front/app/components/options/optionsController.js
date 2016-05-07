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
     console.log("option submitted = " + formID);
  		if(formID == 1){
  			var selectedGrind = $scope.selGrindOne.option;
  			var selectedQuantity = 2;
  			var selectedFrequency = 'Weekly';
  		}else if(formID == 2){
  			var selectedGrind = $scope.selGrindTwo;
  			var selectedQuantity = 8;
  			var selectedFrequency = 'Monthly';
  		}else if(formID == 3){
  			var selectedGrind = $scope.selGrindThree.option;
  			var selectedQuantity = $scope.quantity;
  			var selectedFrequency = $scope.frequency.option;
  		}
  		$http.post(apiUrl + '/options', {
  			quantity: selectedQuantity,
  			grind: selectedGrind,
  			frequency: selectedFrequency,
  			token: $cookies.get('token')
  		}).then(function (response){
  			if(response.data.success == true){
  				$location.path('/delivery');
  			}else{
  				$scope.errorMessage = 'Please contact support.';
  			}
  		}, function (response){
  			console.log("ERROR.");
  		});
  	};

});
