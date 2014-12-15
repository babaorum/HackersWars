define(function () {

    'use strict';

    var bank = function ($scope, userFactory) {

        // Property
        $scope.id = 100;
        $scope.name = 0;
        $scope.firstname = 0;
        $scope.email = 0;
        $scope.picture = 0;
        $scope.team = 0;

        $scope.id = userFactory.getId();
        $scope.name = userFactory.getName();
        $scope.firstname = userFactory.getFirstname();
        $scope.email = userFactory.getEmail();
        $scope.picture = userFactory.getPicture();
        $scope.team = userFactory.getTeam();

        // Watch
        $scope.$watch(userFactory.getId, function () { $scope.id = userFactory.getId(); });
        $scope.$watch(userFactory.getName, function () { $scope.name = userFactory.getName(); });
        $scope.$watch(userFactory.getFirstname, function () { $scope.firstname = userFactory.getFirstname(); });
        $scope.$watch(userFactory.getEmail, function () { $scope.email = userFactory.getEmail(); });
        $scope.$watch(userFactory.getPicture, function () { $scope.picture = userFactory.getPicture(); });
        $scope.$watch(userFactory.getTeam, function () { $scope.team = userFactory.getTeam(); });
    };

    return bank;
});
