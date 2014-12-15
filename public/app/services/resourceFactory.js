define(function () {

    'use strict';

    var factory = function () {

        var res = {};

        // Data
        res.bitcoin = 100;
        res.power = 0;
        res.attack = 0;
        res.security = 0;

        // Getter
        res.get = function (data) {
            return res[data];
        };

        // Setter
        res.set = function (data, value) {
            res[data] = value;
        };

        // Methods
        res.buyIfPossible = function (price) {

            if (price > res.bitcoin) { return false; }

            res.bitcoin = res.bitcoin - price;

            return true;
        };

        return {
            //Data

            // Bitcoin
            getBitcoin: function () { return res.get('bitcoin'); },
            setBitcoin: function (value) { return res.set('bitcoin', value); },
            addBitcoin: function (value) { return res.set('bitcoin', res.bitcoin + value); },

            // Power
            getPower: function () { return res.get('power'); },
            setPower: function (value) { return res.set('power', value); },
            addPower: function (value) { return res.set('power', res.power + value); },

            // Attack
            getAttack: function () { return res.get('attack'); },
            setAttack: function (value) { return res.set('attack', value); },
            addAttack: function (value) { return res.set('attack', res.attack + value); },

            // Security
            getSecurity: function () { return res.get('security'); },
            setSecurity: function (value) { return res.set('security', value); },
            addSecurity: function (value) { return res.set('security', res.security + value); },

            // Methods
            buyIfPossible: res.buyIfPossible
        };
    };

    return factory;
});
