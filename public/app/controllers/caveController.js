define(function () {

    'use strict';

    var computer = function ($scope, resourceFactory) {

        var key, building, fillBuilding;

        key = 'caves';
        building = resourceFactory.getBuilding(key);

        fillBuilding = function () {

            // Building
            $scope._id = building._id;
            $scope.name = building.name;
            $scope.img = building.img;
            $scope.description = building.description;
            $scope.level = building.level;
            $scope.upgrades = building.upgrades;

            $scope.upgradeMax = _.size(angular.copy($scope.upgrades));

            // Unit
            $scope.units = building.units;
            $scope.unitStat = building.unitStat;
        };

        $scope.buy = function () {
            $scope.upgrade();
        };

        $scope.upgrade = function () {

            if (!resourceFactory.buyIfPossible($scope.upgrades[$scope.level + 1].price)) { return; }

            resourceFactory.addBuildingLevel($scope._id, key);
        };

        $scope.buyUnit = function () {
            if (!resourceFactory.buyIfPossible($scope.unitStat.price)) {
                return;
            }

            resourceFactory.addUnit($scope._id, key);
        };

        // init
        fillBuilding();

        // Building modification watch
        $scope.$watchCollection(function () {
            return resourceFactory.getBuilding(key);
        }, function () {
            fillBuilding();
        });
    };

    return computer;
});
