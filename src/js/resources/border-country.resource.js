'use strict';

baseResources.factory('BorderCountry', ['$resource', 'appConfig', function ($resource, appConfig) {
  return $resource ("https://restcountries.eu/rest/v2/alpha/:countryCode");
}]);
