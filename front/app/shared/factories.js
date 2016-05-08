coffeeApp.factory('sharedData', function($http) {
  var sharedData = {};
  sharedData.apiUrl = "http://localhost:3000";
  return sharedData;
})

coffeeApp.factory('zipLookup', function($http) {
  return {
    get: function (zip, successFunc, errorFunc) {
      var zipApiUrl = encodeURI("http://api.zippopotam.us/us/" + zip);
      $http.get(zipApiUrl).then(
        function(resp) {
          console.log(resp);
          var city = resp.data.places[0]["place name"];
          var state = resp.data.places[0].state;
          successFunc({city: city, state: state});
        },
        function(err) {
          errorFunc(err);
        });
    }
  };
});
coffeeApp.factory('userData', function($http, sharedData) {
  return {
    get: function(token, successCallback, errorCallback) {
      $http.get(sharedData.apiUrl + '/getUserData?token=' + token).then(
        function (response){
          successCallback(response);
        },
        function (error){
            errorCallback(error);
        });
      }
    };
  });
