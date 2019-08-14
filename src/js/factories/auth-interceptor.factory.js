'use strict';

baseFactories.factory('AuthInterceptor', ['$rootScope', '$q', function($rootScope, $q) {
  return {
    request: function(config) {
      return config;
    },
    responseError: function(response) {
      if (response.status === 401) {
        window.location.href = '/#!/login';
      }
      return $q.reject(response);
    }
  };
}]);
