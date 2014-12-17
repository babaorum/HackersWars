define(function () {

    'use strict';

    var factory = function ($http) {

        var res = {};

        // Data
        res.bitcoin = 10;
        res.power = 0;
        res.attack = 0;
        res.security = 0;
        res.buildings = {};

        // Getter
        res.get = function (data, key) {

            if (!key) { return res[data]; }

            return res[data][key];
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

        res.addUnit = function (key) {
            res.buildings[key].units += 1;

            res.calculateStats();
        };

        res.addBuildingLevel = function (key) {
            res.buildings[key].level += 1;
            res.calculateStats();
        };

        res.calculateStats = function () {

            var building, nbUnit, stat, level, ratio;

            // Reset
            res.power = 0;
            res.attack = 0;
            res.security = 0;

            // Each building
            for (building in res.buildings) {
                if (res.buildings.hasOwnProperty(building)) {

                    nbUnit = res.buildings[building].units;
                    stat = res.buildings[building].unitStat;

                    if (nbUnit < 0) { return; }

                    level = res.buildings[building].level;
                    ratio = !level ? 1 : res.buildings[building].upgrades[level].unitRatio;

                    for (nbUnit; nbUnit > 0; nbUnit--) {

                        console.log(ratio);

                        res.power += Math.floor(stat.power * ratio);
                        res.attack += Math.floor(stat.attack * ratio);
                        res.security += Math.floor(stat.security * ratio);
                    }
                }

            }
        };

        // Init
        res.init = function () {

            // Get buildings list
            $http.get('/api/buildings').success(function (data) {

                var building = {};

                building.name = data.name;
                building.img = data.img;
                building.description = data.description;
                building.blocked = data.blocked;
                building.price = data.price;
                building.level = data.level;
                building.upgrades = data.upgrades;

                // Store each building
                res.buildings[data.name] = building;

                // Calculate Stats
                res.calculateStats();

            }).error(function (data, status, headers, config) {

                console.log(data, status, headers, config);
            });
        };

        //@FIX: in the wait of the API
        res.initFake = function () {

            // Data Center
            var building = {};

            building.name = 'Data center';
            building.img = 'server_clq';
            building.description = 'Give you one Bitcoin by hour and unblock the system administrator unit to increase your security';
            building.level = 0;
            building.upgrades = {
                1: {price: 10, bitcoinRatio: 1, unitRatio: 1},
                2: {price: 100, bitcoinRatio: 2, unitRatio: 1.2},
                3: {price: 250, bitcoinRatio: 3, unitRatio: 1.4},
                4: {price: 450, bitcoinRatio: 4.5, unitRatio: 1.6},
                5: {price: 700, bitcoinRatio: 6, unitRatio: 1.8},
                6: {price: 1200, bitcoinRatio: 10, unitRatio: 2}
            };
            building.units = 0;
            building.unitStat = {
                attack: 0,
                security: 25,
                power: 500,
                price: 2000,
                name: 'SysAdmin'
            };

            res.buildings[building.name.toLowerCase().replace(' ', '')] = building;

            // Personal computers
            building = {};

            building.name = 'Personal computers';
            building.img = 'computer_clq';
            building.description = 'Unblock the zombie computer unit and increase your attack score.';
            building.level = 0;
            building.upgrades = {
                1: {price: 50, unitRatio: 1},
                2: {price: 100, unitRatio: 1.2},
                3: {price: 250, unitRatio: 1.4},
                4: {price: 450, unitRatio: 1.6},
                5: {price: 700, unitRatio: 1.8},
                6: {price: 1200, unitRatio: 2}
            };
            building.units = 0;
            building.unitStat = {
                attack: 10,
                security: 0,
                power: 10,
                price: 300,
                name: 'Zombie computer'
            };

            res.buildings[building.name.toLowerCase().replace(' ', '')] = building;

            // Caves
            building = {};

            building.name = 'Caves';
            building.img = 'console_clq';
            building.description = 'Unblock the hacker unit to increase your attack, power and security score';
            building.level = 0;
            building.upgrades = {
                1: {price: 100, unitRatio: 1},
                2: {price: 200, unitRatio: 1.2},
                3: {price: 350, unitRatio: 1.4},
                4: {price: 500, unitRatio: 1.6},
                5: {price: 750, unitRatio: 1.8},
                6: {price: 1200, unitRatio: 2}
            };
            building.units = 0;
            building.unitStat = {
                attack: 25,
                security: 0,
                power: 0,
                price: 2000,
                name: 'Hacker'
            };

            res.buildings[building.name.toLowerCase().replace(' ', '')] = building;

            // Calculate Stats
            res.calculateStats();
        };

        // init
        res.initFake();

        return {
            //Data

            // Bitcoin
            getBitcoin: function () { return res.get('bitcoin'); },
            setBitcoin: function (value) { return res.set('bitcoin', Math.floor(value)); },
            addBitcoin: function (value) { return res.set('bitcoin', Math.floor(res.bitcoin + value)); },

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

            // Building
            getBuilding: function (key) { return res.get('buildings', key); },
            addBuildingLevel: res.addBuildingLevel,

            // Units
            addUnit: res.addUnit,

            // Methods
            buyIfPossible: res.buyIfPossible
        };
    };

    return factory;
});
