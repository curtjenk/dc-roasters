coffeeApp.controller('deliveryController', function($scope, $http, $location, $cookies, zipLookup, userData2) {
    console.log("in deliveryController");
    //set delivery indicator to active
		$("#step-options").removeClass('active');
		$("#step-delivery").addClass('active');
    $('#step-checkout').removeClass('active');

	  var apiUrl = "http://localhost:3000";
    $scope.dlvrStateOptions = states;
    $scope.deliveryMessage = "";
    $scope.dlvrCity = "";
    $scope.dlvrState = "";

    $("#zip").keyup(function() {
        var el = $(this);
        if (el.val().length === 5 && is_int(el.val())) {
            var ok = function(resp) {
                $scope.dlvrCity = resp.city;
                $scope.dlvrState = resp.state;
            };
            var error = function(err) {
                $scope.dlvrCity = "";
                $scope.dlvrState = "";
            };
            zipLookup.get(el.val(), ok, error);
        }
    });

    function is_int(value) {
        if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
            return true;
        } else {
            return false;
        }
    }

    userData2.get($cookies.get('token')).then(
        function(resp) {
            if (resp.data.success === false) {
                //User needs to log in
                $location.path('/login');
                //	$location.path('/register?failure=badToken');
            } else {
                $scope.userOptions = resp.data.doc;
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
    // var userDataSuccess = function(resp) {
    //     if (resp.data.success === false) {
    //         //User needs to log in
    //         $location.path('/login');
    //         //	$location.path('/register?failure=badToken');
    //     } else {
    //         $scope.userOptions = resp.data.resp;
    //     }
    // };
		//
    // var userDataError = function(resp) {
    //     console.log("*** couldn't get user data **** ");
    //     console.log(resp.status);
    // };
		//
    // userData.get($cookies.get('token'), userDataSuccess, userDataError);

    $scope.deliveryFunc = function() {

        $http.post(apiUrl + '/delivery', {
            fullname: $scope.dlvrName,
            addressOne: $scope.dlvrAddr1,
            addressTwo: $scope.dlvrAddr2,
            usrCity: $scope.dlvrCity,
            usrState: $scope.dlvrState,
            usrZip: $scope.dlvrZip,
            deliveryDate: $scope.dlvrDate,
            token: $cookies.get('token')
        }).then(function successCallback(response) {
            console.log(response.data.success);
            if (response.data.success === true) {
                $location.path('/checkout');
            } else {
                $scope.deliveryMessage = response.data.message;
            }
        }, function errorCallback(response) {
            console.log("ERROR.");
        });

    };
});
