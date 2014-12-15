define(function () {

    'use strict';

    var computer = function ($scope, resourceFactory) {

        $scope.name = "Caves";
        $scope.img = "console_clq";
        $scope.description = "Unblock the hacker unit to increase your attack, power and security score";

        $scope.price = 100;
        $scope.level = 1;
        $scope.blocked = true;

        $scope.buy = function () {
            if (resourceFactory.buyIfPossible($scope.price)) {
                $scope.blocked = false;
            }
        };
    };

    return computer;
});
