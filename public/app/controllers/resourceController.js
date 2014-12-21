define(function () {

    'use strict';

    var bank = function ($scope, $http, resourceFactory) {

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

        // Post bitcoin amount
        window.onbeforeunload = function () {

            $http.post('/users/bitcoins', {bitcoins: $scope.bitcoin});

            return 'Do you really want to quit the game ?';
        };
    };

    return bank;
});
