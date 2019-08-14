'use strict';

baseResources.factory('Countries', ['$resource', 'appConfig', function ($resource, appConfig) {
  return $resource ("https://restcountries.eu/rest/v2/all");
}]);
