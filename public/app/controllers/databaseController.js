define(function () {

    'use strict';

    var database = function ($scope, resourceFactory) {

        this.name = "Data centers";
        this.img = "server_clq";
        this.description = "Give you one Bitcoin by hour and unblock the system administrator unit";

        this.price = 10;
        this.level = 1;
        this.blocked = true;

        this.buy = function () {
            if (resourceFactory.buyIfPossible(this.price)) {
                this.blocked = false;
            }
        };
    };

    return database;
});
