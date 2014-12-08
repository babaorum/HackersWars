define(function () {

    'use strict';

    var resource = function () {

        var factory = {};

        factory.toto = "ok";

        return {
            toto: factory.toto
        };
    };

    return resource;
});
