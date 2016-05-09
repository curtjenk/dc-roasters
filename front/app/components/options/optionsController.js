coffeeApp.controller('optionsController', function($scope, $http, $location, $route, $cookies, sharedData, userData2) {

    $scope.errorMessage = "";
    //ensure user is logged in to access this page;
    var token = $cookies.get('token');
    // console.log('**** token retrieved from cookies = ' + token);
    userData2.get(token).then(
        function(resp) {
          //  console.log("*** resp from getUserData api call");
          //  console.log(resp.data);
            if (resp.data.success === false) {
                //User needs to log in
                $location.path('/login');
                //	$location.path('/register?failure=badToken');
            } else {
                $scope.userOptions = resp.data.doc;
                var tokenExpiration = Date.parse(resp.data.doc.tokenExpiration);
                //  console.log(tokenExpiration);
                //  console.log(Date.now());
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
    // --- end check for user login

    $scope.frequencies = [{
        option: "Weekly"
    }, {
        option: "Every other week"
    }, {
        option: "Monthly"
    }];

    $scope.grinds = [{
        option: "Espresso"
    }, {
        option: "Aeropress"
    }, {
        option: "Drip"
    }, {
        option: "Chemex/Clever"
    }, {
        option: "French Press"
    }];

    // $http.get(sharedData.apiUrl + '/getUserData?token=' + $cookies.get('token')).then(
    //     function(response) {
    //         console.log(response);
    //         if (response.data.success === false) {
    //             //User needs to log in
    //             $location.path('/login');
    //             //	$location.path('/register?failure=badToken');
    //         } else {
    //             $scope.userOptions = response.data.resp;
    //         }
    //     },
    //     function(error) {
    //         console.log(response.status);
    //     });

    $scope.optionsForm = function(formID) {
        //  console.log("option submitted = " + formID);
        var selectedGrind = "";
        var selectedQuantity = 0;
        var selectedFrequency = "";

        if (formID == 1) {
            selectedGrind = $scope.selGrindOne.option;
            selectedQuantity = 2;
            selectedFrequency = 'Weekly';
        } else if (formID == 2) {
            selectedGrind = $scope.selGrindTwo.option;
            selectedQuantity = 8;
            selectedFrequency = 'Monthly';
        } else if (formID == 3) {
            selectedGrind = $scope.selGrindThree.option;
            selectedQuantity = $scope.quantity;
            selectedFrequency = $scope.frequency.option;
        }
        $http.post(sharedData.apiUrl + '/options', {
            quantity: selectedQuantity,
            grind: selectedGrind,
            frequency: selectedFrequency,
            token: $cookies.get('token')
        }).then(function(response) {
            if (response.data.success === true) {
                $location.path('/delivery');
            } else {
                $scope.errorMessage = 'Please contact support.';
            }
        }, function(response) {
            console.log("ERROR.");
        });
    };

});
