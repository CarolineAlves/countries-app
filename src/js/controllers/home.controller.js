'use strict';

baseControllers.controller('HomeController', ['$rootScope', '$scope', '$stateParams', 'Alert', 'Countries', 'Country', 'Regions', 'BorderCountry', function($rootScope, $scope, $stateParams, Alert, Countries, Country, Regions, BorderCountry) {
    $scope.countries = [];
    $scope.changeColor = false;
    $scope.regions = [
        {
            name: "Africa",
            id: 'africa'
        },
        {
            name: "Americas",
            id: 'americas'
        },
        {
            name: "Asia",
            id: 'asia'
        },
        {
            name: "Europe",
            id: 'europe'
        },
        {
            name: "Oceania",
            id: 'oceania'
        }
    ];


    Countries.query(
        function (response) {
            $scope.countries = response;
        },
        function (error) {
            console.log("Error occured: ", error)
        }
    );

    Country.query(
        {countryName: $stateParams.countryName},
        function (response) {
            $scope.country = response;
        },
        function (error) {
            console.log("Error occured: ", error)
        }
    );


    $scope.selectRegion = function(regionName){
        $scope.regionName = regionName;
        Regions.query(
            {regionName: regionName},
            function (response) {
                $scope.countries = response;
            },
            function (error) {
                console.log("Error occured: ", error)
            }
        )
    };

    BorderCountry.get(
        {countryCode: $stateParams.countryCode},
        function (response) {
            $scope.country = [response];
        },
        function (error) {
            console.log("Error occured: ", error)
        }
    );

}]);
