define(function () {

    'use strict';

    var database = function ($scope, $interval, resourceFactory) {

        var loop = false,
            building = resourceFactory.getBuilding('datacenter');



        $scope.name = building.name;
        $scope.img = building.img;
        $scope.description = building.description;
        $scope.price = building.price;
        $scope.level = building.level;
        $scope.blocked = building.blocked;
        $scope.upgrades = building.upgrades;

        $scope.buy = function () {
            if (resourceFactory.buyIfPossible($scope.price)) {
                $scope.blocked = false;
            }
        };

        // Database bitcoin Loop
        $scope.$watch('blocked', function () {

            if ($scope.blocked || loop) { return; }

            loop = true;

            $interval(function () {
                resourceFactory.addBitcoin($scope.level);
            }, 60 * 1000 - 59000);
        });
    };

    return database;
});
