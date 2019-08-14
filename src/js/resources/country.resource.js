'use strict';

baseResources.factory('Country', ['$resource', 'appConfig', function ($resource, appConfig) {
  return $resource ("https://restcountries.eu/rest/v2/name/:countryName");
}]);
