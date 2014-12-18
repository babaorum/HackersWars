define(function () {

    'use strict';

    var zero = function () {
        return function (input, max) {

            if (input === 'undefined') { return ''; }

            input = input.toString();

            while (input.length < max) { input = "0" + input; }

            input = input.split("").reverse().join("");

            input = input.replace(new RegExp('([0-9]{3})', 'g'), '$1 ');

            return input.split("").reverse().join("");
        };
    };

    return zero;
});
