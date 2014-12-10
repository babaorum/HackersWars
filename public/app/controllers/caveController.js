define(function () {

    'use strict';

    var computer = function ($scope, resourceFactory) {

        this.name = "Caves";
        this.img = "console_clq";
        this.description = "Increase your attack power, security score and unblock the hacker unit";

        this.price = 100;
        this.level = 1;
        this.blocked = true;

        this.buy = function () {
            if (resourceFactory.buyIfPossible(this.price)) {
                this.blocked = false;
            }
        };
    };

    return computer;
});
