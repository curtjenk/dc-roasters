coffeeApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: function($routeParams) {
            console.log("routing to home");
            return 'app/components/home/homeView.html';
        }
    });
    $routeProvider.when('/register', {
        controller: 'registerController',
        templateUrl: function($routeParams) {
            console.log("routing to register");
            return 'app/components/register/registerView.html';
        }
    });
    $routeProvider.when('/login', {
        controller: 'loginController',
        templateUrl: function($routeParams) {
            console.log("routing to login");
            return 'app/components/login/loginView.html';
        }
    });
    $routeProvider.when('/options', {
        controller: 'optionsController',
        templateUrl: function($routeParams) {
            console.log("routing to order");
            return 'app/components/options/optionsView.html';
        }
    });
    $routeProvider.when('/delivery', {
        controller: 'deliveryController',
        templateUrl: function($routeParams) {
            console.log("routing to order");
            return 'app/components/delivery/deliveryView.html';
        }
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});
