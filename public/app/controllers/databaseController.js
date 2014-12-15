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
    };

    return database;
});
