define(function () {

    'use strict';

    var bank = function (resourceFactory) {

        //var resource = new resource();
        console.log(resourceFactory);
        //this.value = resource().bitcoins;

        this.value = 10;
    };

    return bank;
});
