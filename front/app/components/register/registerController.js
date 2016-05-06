coffeeApp.controller('registerController', function($scope, $http, $location, $route) {
    var apiUrl = "http://localhost:3000";
    
    $scope.registerFunc = function() {
        console.log("here");
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
                console.log(response);
                //TODO: error handling
                $location.path('/order');
            },
            function(response) {
                console.log(response);
            }
        );
    };

});
