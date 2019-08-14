'use strict';

var format = function(str, data) {
    return str.replace(/{([^{}]+)}/g, function(match, val) {
        var prop = data;
        val.split('.').forEach(function(key) {
            prop = prop[key];
        });

        return prop;
    });
};

String.prototype.format = function(data) {
    return format(this, data);
};

String.prototype.encodedURI = function() {
    return this.replace(' ', '+');
};

String.prototype.slugify = function() {
    function dasherize(str) {
        return str.trim().replace(/[-_\s]+/g, '-').toLowerCase();
    }

    function clearSpecial(str) {
        var from  = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž',
            to    = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz';
        to = to.split('');
        return str.replace(/.{1}/g, function(c){
            var index = from.indexOf(c);
            return index === -1 ? c : to[index];
        });
    }

    return clearSpecial(dasherize(this));
};

Number.prototype.paddingLeft = function(size, char) {
    if (!char) {
        char = '0'
    }
    var length = this.toString().length;
    if (length >= size) {
        return this.toString();
    }
    var result = [];
    for (var i = length; i < size; i++) {
        result.push(char);
    }
    return result.join('') + this.toString();
};


var baseServices  = angular.module('base.services', []);
var baseFactories  = angular.module('base.factories', []);
var baseResources  = angular.module('base.resources', []);
var baseDirectives  = angular.module('base.directives', []);
var baseFilters  = angular.module('base.filters', []);
var baseControllers  = angular.module('base.controllers', []);

var base = angular.module(
    'base', [
        'ngResource',
        'ngCookies',
        'ui.router',
        '19degrees.ngSweetAlert2',

        'base.services',
        'base.factories',
        'base.resources',
        'base.directives',
        'base.filters',
        'base.controllers'
    ]
);

base.constant('appConfig', {
    backendURL: '@@backendURL',
    bingKey: '@@bingKey'
});

base.config(['$httpProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    moment.locale('pt-BR');

    $locationProvider.hashPrefix('!');

    $stateProvider
        .state({
            name: 'homeState',
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'HomeController',
            cache: false,
            headers: {
                'Cache-Control' : 'no-cache'
            }
        })

        .state({
            name: 'country',
            url: '/country/:countryName',
            templateUrl: 'templates/country.html',
            controller: 'HomeController'
        })

        .state({
            name: 'borderCountry',
            url: '/country/:countryCode',
            templateUrl: 'templates/country.html',
            controller: 'HomeController'
        });

    $urlRouterProvider.when('', '/');
}]);

base.run(['$rootScope', '$timeout', '$q', 'Alert', function($rootScope, $timeout, $q, Alert) {

    $rootScope.loggedUser = null;

    $rootScope.$on('userInfo.updated', function(evt, userInfo) {
        $rootScope.loggedUser = userInfo;
    });

    $rootScope.showMyInfo = function() {
        Alert.itsOpenSourceDude();
    };

}]);
