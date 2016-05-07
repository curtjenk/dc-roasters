coffeeApp.factory('zipLookup', function($http) {
  return {
    get: function (zip, elemCity, elemState) {
      var zipApiUrl = encodeURI("http://api.zippopotam.us/us/" + zip);
      $http.get(zipApiUrl).then(
        function(resp) {
          console.log(resp);
          // console.log(resp.data.places[0]);
          elemCity.val(resp.data.places[0]["place name"]);
          elemState.val(resp.data.places[0].state);
          // console.log(elemCity);
        },
        function(err) {
         //TODO error handling
        }
      );
    }
  };
});
