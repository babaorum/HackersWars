define(function () {

    'use strict';

    var computer = function ($scope, resourceFactory) {

        this.name = "Personal computers";
        this.img = "computer_clq";
        this.description = "Unblock the zombie computer unit and increase your attack power.";

        this.price = 50;
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
