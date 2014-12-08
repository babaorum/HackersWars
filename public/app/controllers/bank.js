define(['resourceFactory'], function (resourceFactory) {

    'use strict';

    var bank = function () {

        //var resource = new resource();
        console.log(resourceFactory);
        //this.value = resource().bitcoins;

        this.value = 10;
    };

    return bank;
});
