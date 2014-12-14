define(function () {

    'use strict';

    var reverse = function () {

        return function (items) {

            return items.slice().reverse();
        };
    };

    return reverse;
});
