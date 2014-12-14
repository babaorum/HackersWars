define(function () {

    'use strict';

    var bank = function ($scope, resourceFactory, toastFactory) {

        // Property
        $scope.bitcoin = resourceFactory.getBitcoin();
        $scope.power = resourceFactory.getPower();
        $scope.attack = resourceFactory.getAttack();
        $scope.security = resourceFactory.getSecurity();

        // Watch
        $scope.$watch(resourceFactory.getBitcoin, function () { $scope.bitcoin = resourceFactory.getBitcoin(); });

        $scope.$watch(resourceFactory.getPower, function () { $scope.power = resourceFactory.getPower(); });
        $scope.$watch(resourceFactory.getAttack, function () { $scope.attack = resourceFactory.getAttack(); });
        $scope.$watch(resourceFactory.getSecurity, function () { $scope.security = resourceFactory.getSecurity(); });
    };

    return bank;
});
