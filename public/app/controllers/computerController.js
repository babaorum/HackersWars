define(function () {

    'use strict';

    var computer = function ($scope, resourceFactory) {

        $scope.name = "Personal computers";
        $scope.img = "computer_clq";
        $scope.description = "Unblock the zombie computer unit and increase your attack score.";

        $scope.price = 50;
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
