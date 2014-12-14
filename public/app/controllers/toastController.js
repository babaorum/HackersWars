define(function () {

    'use strict';

    var toast = function ($scope, toastFactory) {

        $scope.toasts = toastFactory.list;

        $scope.close = function (key) {
            toastFactory.remove(key);
        };
    };

    return toast;
});
