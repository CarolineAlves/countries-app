'use strict';

baseResources.factory('Regions', ['$resource', 'appConfig', function ($resource, appConfig) {
  return $resource ("https://restcountries.eu/rest/v2/region/:regionName");
}]);
