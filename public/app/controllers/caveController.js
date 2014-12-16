define(function () {

    'use strict';

    var computer = function ($scope, resourceFactory) {

        var building = resourceFactory.getBuilding('personalcomputers');

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
    };

    return computer;
});
