coffeeApp.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'app/components/home/homeController',
        templateUrl: function($routeParams) {
            console.log("routing to home");
            $('.home-nav').css('display', 'block');
            $('.order-nav').css('display', 'none');
            return 'app/components/home/homeView.html';
        }
    });
    $routeProvider.when('/register', {
        controller: 'app/components/register/registerController',
        templateUrl: function($routeParams) {
            console.log("routing to register");
            $('.home-nav').css('display', 'none');
            $('.order-nav').css('display', 'none');
            return 'app/components/register/registerView.html';
        }
    });
    $routeProvider.when('/login', {
        controller: 'app/components/login/loginController',
        templateUrl: function($routeParams) {
            console.log("routing to login");
            $('.home-nav').css('display', 'none');
            $('.order-nav').css('display', 'none');
            return 'app/components/login/loginView.html';
        }
    });
    $routeProvider.when('/options', {
        controller: 'app/components/options/optionsController',
        templateUrl: function($routeParams) {
            console.log("routing to order");
            $('.home-nav').css('display', 'none');
            $('.order-nav').css('display', 'block');
            return 'app/components/options/optionsView.html';
        }
    });
    $routeProvider.when('/delivery', {
        controller: 'app/components/delivery/deliveryController',
        templateUrl: function($routeParams) {
            console.log("routing to order");
            $('.home-nav').css('display', 'none');
            $('.order-nav').css('display', 'block');
            return 'app/components/delivery/deliveryView.html';
        }
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});
