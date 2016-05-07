coffeeApp.controller('loginController', function($rootScope, $scope, $http, $location, $route, $cookies) {
  console.log("in loginController");
  //If the user hit login, then remove any cookies
  $cookies.remove("token");
  $cookies.remove("username");
 //-----------------

  var apiUrl = "http://localhost:3000";
  $scope.loginMessage = "";

  if(($location.path() == '/login')){
  		if($cookies.get('token')){
  			//you should not be on the login page because you are logged in.
  			//I'm sending you to the options page. Don't try and come back.
  			$location.path('/options');
  		}
  }

    $scope.loginFunc = function() {
        console.log($scope.loginUsername);

        if (!$scope.loginUsername || $scope.loginUsername.length === 0 || !$scope.loginPassword || $scope.loginPassword.length === 0) {
            $scope.loginMessage = "please enter a username and password";
            return;
        }
        var loginUrl = apiUrl + "/loginApi";
        var loginData = {
            username: $scope.loginUsername,
            password: $scope.loginPassword
        };
        console.log(loginData);

        $http.post(loginUrl, loginData).then(
            function(response) {
                console.log(response);
                if (response.data.success === false) {
                    $scope.loginMessage = response.data.message;
                } else {
                    // store the token and username inside cookies
				           // potential security issue here
				          $cookies.put('token', response.data.resp.token);
				          $cookies.put('username', $scope.loginUsername);
                  $rootScope.$broadcast("userLoggedIn", {});
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
