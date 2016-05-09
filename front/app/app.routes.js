//Don't need to specify the controller.  If you do and the you have
//ng-controller in the view, both controllers will be loaded.
//if ng-controller and the route controller are the same, the controller is loaded twice!!!!
coffeeApp.config(function($routeProvider) {
    // use the HTML5 History API
    // $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        // controller: 'homeController',
        templateUrl: function($routeParams) {
            // console.log("routing to home");
            return 'app/components/home/homeView.html';
        }
    });
    $routeProvider.when('/register', {
        templateUrl: function($routeParams) {
            // console.log("routing to register");
            return 'app/components/register/registerView.html';
        }
    });
    $routeProvider.when('/login', {
        templateUrl: function($routeParams) {
            // console.log("routing to login");
            return 'app/components/login/loginView.html';
        }
    });
    $routeProvider.when('/logout', {
        templateUrl: function($routeParams) {
            // console.log("routing to logout");
            return 'app/components/logout/logoutView.html';
        }
    });
    $routeProvider.when('/options', {
        templateUrl: function($routeParams) {
            // console.log("routing to options");
            return 'app/components/options/optionsView.html';
        }
    });
    $routeProvider.when('/delivery', {
        templateUrl: function($routeParams) {
            // console.log("routing to delivery");
            return 'app/components/delivery/deliveryView.html';
        }
    });
    $routeProvider.when('/checkout', {
        templateUrl: function($routeParams) {
            // console.log("routing to checkout");
            return 'app/components/checkout/checkoutView.html';
        }
    });
    $routeProvider.when('/receipt', {
        templateUrl: function($routeParams) {
            return 'app/components/receipt/receiptView.html';
        }
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });


});
