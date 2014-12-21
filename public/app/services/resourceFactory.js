define(function () {

    'use strict';

    var factory = function ($http, userData) {

        var res;

        res = {};

        // Data
        res.bitcoin = 10;
        res.power = 0;
        res.attack = 0;
        res.security = 0;
        res.buildings = {};

        // Getter
        res.get = function (data, key) {

            if (!key) { return res[data]; }

            var result = {};

            if (data === "buildings") {
                result = {
                    blocked: true
                };
            }

            return res[data][key] || result;
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

        res.addUnit = function (id, key) {

            $http.post('/api/building/' + id + '/units', {}).success(function () {

                res.buildings[key].units += 1;
                res.calculateStats();
            });
        };

        res.addBuildingLevel = function (id, key) {

            $http.post('/api/building/' + id + '/upgrade', {}).success(function () {

                res.buildings[key].level += 1;
                res.calculateStats();
            });
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

                        res.power += Math.floor(stat.power * ratio);
                        res.attack += Math.floor(stat.attack * ratio);
                        res.security += Math.floor(stat.security * ratio);
                    }
                }

            }
        };

        // Init
        res.init = function () {


            var building, buildingNb, dataBuilding;

            buildingNb = userData.building.length - 1;

            for (buildingNb; buildingNb >= 0; buildingNb--) {

                dataBuilding = userData.building[buildingNb];
                building = {};

                building._id = dataBuilding._id;
                building.name = dataBuilding.name;
                building.img = dataBuilding.img;
                building.description = dataBuilding.description;
                building.level = dataBuilding.level;
                building.upgrades = dataBuilding.upgrades;
                building.units = dataBuilding.units;
                building.unitStat = dataBuilding.unitStats;

                // Store each building
                res.buildings[dataBuilding.name.toLowerCase().replace(' ', '')] = building;
            }

            // Calculate Stats
            res.calculateStats();
        };

        // init
        res.init();

        // Define Factory API
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
