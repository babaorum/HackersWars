define(function () {

    'use strict';

    var computer = function ($scope, resourceFactory) {

        var key, building, fillBuilding;

        key = 'caves';
        building = resourceFactory.getBuilding(key);

        fillBuilding = function () {
            $scope.name = building.name;
            $scope.img = building.img;
            $scope.description = building.description;
            $scope.level = building.level;
            $scope.upgrades = building.upgrades;

            $scope.upgradeMax = _.size(angular.copy($scope.upgrades)) - 1;
        };

        $scope.buy = function () {
            $scope.upgrade();
        };

        $scope.upgrade = function () {

            if (!resourceFactory.buyIfPossible($scope.upgrades[$scope.level + 1].price)) { return; }

            resourceFactory.addBuildingLevel(key);
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
