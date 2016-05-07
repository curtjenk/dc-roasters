coffeeApp.controller('indexController', function($rootScope, $scope, $http, $location, $cookies, $route) {
  console.log("****** index controller *********")
  console.log($cookies.get('token'));
  $rootScope.$on("userLoggedIn", function (args) {
         $scope.loggedIn = true;
         $scope.username = $cookies.get('username');
     });
  $rootScope.$on("userLoggedOut", function (args) {
         alert("logged out");
            $scope.loggedIn = false;
        });
});
