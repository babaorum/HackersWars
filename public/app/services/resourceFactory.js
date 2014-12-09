define(function () {

    'use strict';

    var resource = function () {

        var factory = {};

        factory.test = "ok";

        return {
            test: factory.test
        };
    };

    return resource;
});
