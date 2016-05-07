coffeeApp.factory('zipLookup', function($http) {
  return {
    get: function (zip, elementState, elementCity) {
      var zipApiUrl = encodeURI("http://api.zippopotam.us/us/" + zip);
      $http.get(zipApiUrl).then(
        function(resp) {

        },
        function(err) {

        }   
      );
    }
  };
});
