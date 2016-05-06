coffeeApp.controller('homeController', function($scope, $http, $location, $route) {

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
                    $scope.loginMessage = "Invalid username and/or password";
                } else {
                    $('li.active-session').css('display', 'block');
                    $location.path('/order');
                }
            },
            function(response) {
                console.log(response);
            }
        );
    };
});
