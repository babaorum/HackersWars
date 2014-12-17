define(function () {

    'use strict';

    var database = function ($scope, $interval, resourceFactory) {

        var loop, key, building, fillBuilding;

        loop = false;
        key = 'datacenter';
        building = resourceFactory.getBuilding(key);

        fillBuilding = function () {

            // Building
            $scope.name = building.name;
            $scope.img = building.img;
            $scope.description = building.description;
            $scope.level = building.level;
            $scope.upgrades = building.upgrades;

            $scope.upgradeMax = _.size(angular.copy($scope.upgrades));

            // Unit
            $scope.unitName = building.unitName;
            $scope.units = building.units;
            $scope.unitStat = building.unitStat;
        };

        $scope.buy = function () {
            $scope.upgrade();
        };

        $scope.upgrade = function () {

            if (!resourceFactory.buyIfPossible($scope.upgrades[$scope.level + 1].price)) { return; }

            resourceFactory.addBuildingLevel(key);
        };

        $scope.buyUnit = function () {
            if (!resourceFactory.buyIfPossible($scope.unitStat.price)) { return; }

            resourceFactory.addUnit(key);
        };

        // init
        fillBuilding();

        // Database bitcoin Loop
        $scope.$watch('level', function () {


            if ($scope.level === 0 || loop) { return; }

            loop = true;

            $interval(function () {
                resourceFactory.addBitcoin($scope.upgrades[$scope.level].bitcoinRatio);
            }, 60 * 1000 - 59950);
        });

        // Building modification watch
        $scope.$watchCollection(function () { return resourceFactory.getBuilding(key); }, function () {
            fillBuilding();
        });
    };

    return database;
});
