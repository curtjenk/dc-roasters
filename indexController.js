coffeeApp.controller('indexController', function($rootScope, $scope, $http, $location, $cookies, $route) {
    // console.log("****** index controller *********")
    // console.log($cookies.get('token'));
    // $rootScope.$on("userLoggedIn", function(args) {
    //     $scope.loggedIn = true;
    //     $scope.username = $cookies.get('username');
    // });
    // $rootScope.$on("userLoggedOut", function(args) {
    //     // alert("logged out");
    //     $scope.loggedIn = false;
    // });
    $scope.$on("userLoggedIn", function(event, args) {
      //  console.log("userLoggedIn event ");
      //  console.log(event);
      //  console.log(args);
        $scope.loggedIn = true;
        $scope.username = args.username;
    });
    $scope.$on("userLoggedOut", function(event, args) {
        // alert("logged out");
        $scope.loggedIn = false;
    });
});
