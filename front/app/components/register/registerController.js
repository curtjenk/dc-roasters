coffeeApp.controller('registerController', function($scope, $http, $location, $cookies, $route) {
    var apiUrl = "http://localhost:3000";
    //the location service has access to the query string.
	//Pull out the property and put the value in the errorMessage
	if($location.search().failure == "badToken"){
		$scope.errorMessage = "You must login to access the requested page.";
	}

    $scope.registerFunc = function() {
        console.log("here");
        if($scope.regPassword !== $scope.regPassword2){
			       $scope.errorMessage = "Your passwords do not match.";
             return;
		    }

        var regUrl = apiUrl + "/registerApi";
        var regData = {
            username: $scope.regUsername,
            password: $scope.regPassword,
            password2: $scope.regPassword2,
            email: $scope.regEmail
        };
        //  console.log(loginData);
        $http.post(regUrl, regData).then(
            function(response) {
                // console.log(response);
                // //TODO: error handling
                // $location.path('/options');
                if(response.data.success === false){
					        $scope.errorMessage = response.data.message;
				        } else if (response.data.success == 'added'){
					// store the token and username inside cookies
					// potential security issue here
					       $cookies.put('token', response.data.token);
					       $cookies.put('username', $scope.username);
					//redirect to options page
					       $location.path('/options');
				        }
            },
            function(response) {
                console.log(response);
            }
        );
    };

});
