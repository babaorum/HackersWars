define(function () {

    'use strict';

    var database = function ($scope, resourceFactory) {

        $scope.name = "Data centers";
        $scope.img = "server_clq";
        $scope.description = "Give you one Bitcoin by hour and unblock the system administrator unit";

        $scope.price = 10;
        $scope.level = 1;
        $scope.blocked = true;

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
