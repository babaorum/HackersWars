define(function () {

    'use strict';

    var bank = function ($scope, resourceFactory) {

        // Property
        $scope.bitcoin = resourceFactory.getBitcoin();
        $scope.power = resourceFactory.getPower();
        $scope.attack = resourceFactory.getAttack();
        $scope.security = resourceFactory.getSecurity();

        // Watch
        $scope.$watch(resourceFactory.getBitcoin, function () { $scope.bitcoin = resourceFactory.getBitcoin(); });
        $scope.$watch(resourceFactory.getPower, function () { $scope.bitcoin = resourceFactory.getPower(); });
        $scope.$watch(resourceFactory.getAttack, function () { $scope.bitcoin = resourceFactory.getAttack(); });
        $scope.$watch(resourceFactory.getSecurity, function () { $scope.bitcoin = resourceFactory.getSecurity(); });
    };

    return bank;
});
