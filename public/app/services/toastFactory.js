define(function () {

    'use strict';

    var factory = function () {

        var service = {};

        service.list = [];

        service.add = function (content) {
            service.list.unshift({content: content});
        };

        service.remove = function (key) {
            service.list.splice(key, 1);
        };

        return service;
    };

    return factory;
});
