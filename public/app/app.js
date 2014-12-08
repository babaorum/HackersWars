define(['angularAMD', 'angular-route'], function (angularAMD) {

    'use strict';

    // Define app
    var app = angular.module("hackerWars", ['ngRoute']);


    /**
     * ================
     * ======= Services
     * ================
     */

    // Resource
    //app.factory('resourceFactory', require('resourceFactory'));
    app.factory('resourceFactory', function () {

        var factory = {};

        factory.toto = "ok";

        return factory;
    });


    /**
     * ================
     * ==== Controllers
     * ================
     */

    // Bank+
    app.controller('BankController', ['resourceFactory', require('bank')]);

    // Databases
    app.controller('DatabaseController', require('database'));

    // Computers
    app.controller('ComputerController', require('computer'));

    // Caves
    app.controller('CaveController', require('cave'));


    /**
     * ================
     * ======== Filters
     * ================
     */

    // Zero
    app.filter('zero', require('zero'));


    return angularAMD.bootstrap(app);
});
