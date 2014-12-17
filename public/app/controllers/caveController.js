define(function () {

    'use strict';

    var computer = function ($scope, resourceFactory) {

        var key, building, fillBuilding;

        key = 'caves';
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

        // Building modification watch
        $scope.$watchCollection(function () { return resourceFactory.getBuilding(key); }, function () {
            fillBuilding();
        });
    };

    return computer;
});
