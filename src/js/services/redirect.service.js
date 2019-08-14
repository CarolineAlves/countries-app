'use strict';

baseServices.service('Redirect', ['$window', '$location', function ($window, $location) {

  this.toHome = function() {
    $window.location.href = '/#!';
    $window.location.reload();
  };

}]);
