coffeeApp.controller('checkoutController', function($scope, $http, $location, $route, $cookies, sharedData, userData2) {
    $('#step-options').removeClass('active');
    $('#step-delivery').removeClass('active');
    $('#step-checkout').addClass('active');

    $scope.errorMessage = "";
    userData2.get($cookies.get('token')).then(
        function(resp) {
            if (resp.data.success === false) {
                //User needs to log in
                $location.path('/login');
                //	$location.path('/register?failure=badToken');
            } else {

                $scope.userOptions = resp.data.doc;
                var d = new Date(resp.data.doc.deliveryDate);
                $scope.userOptions.deliveryDate = d.toLocaleDateString();
                $scope.total = Number(resp.data.doc.quantity) * 20;
                var tokenExpiration = Date.parse(resp.data.doc.tokenExpiration);
                console.log(tokenExpiration);
                console.log(Date.now());
                if (Date.now() > tokenExpiration) {
                    console.log("user needs to login again because token expired");
                    $scope.$broadcast('sessionExpired', {});
                    $location.path('/login');
                }
            }
        },
        function(error) {
            console.log("*** couldn't get user data **** ");
            console.log(resp.status);
        }
    );


    $scope.payOrder = function(userOptions) {
        $scope.errorMessage = "";
        var handler = StripeCheckout.configure({
            key: 'pk_test_KKclL9QmUITzeaCs7SloYdIj',
            image: 'assets/img/dc_roasters_200x124_lt.png',
            locale: 'auto',
            token: function(token) {
                console.log("The token Id is: ");
                console.log(token.id);

                $http.post(sharedData.apiUrl + '/checkout', {
                    amount: $scope.total * 100,
                    stripeToken: token.id,
                    token: $cookies.get('token')
                        //This will pass amount, stripeToken, and token to /payment
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if (response.data.success) {
                        //Say thank you
                        $location.path('/receipt');
                    } else {
                        $scope.errorMessage = response.data.message;
                        //same on the checkout page
                    }
                }, function errorCallback(response) {});
            }
        });
        handler.open({
            name: 'DC Roasters',
            description: 'A Better Way To Grind',
            amount: $scope.total * 100
        });
    };

    $scope.cancelOrder = function(userOptions) {
        console.log("cancel order for ...");
        console.log(userOptions);
        $location.path('/options');
    };
});
