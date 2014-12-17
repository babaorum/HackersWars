define(function () {

    'use strict';

    var factory = function ($timeout) {

        var service = {};

        service.list = [];

        service.add = function (content) {

            service.list.unshift({content: content});
            $timeout(function () { service.list.pop(); }, 3000);
        };

        service.remove = function (key) {

            service.list.splice(key, 1);
        };

        return service;
    };

    return factory;
});
