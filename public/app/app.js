define(['angularAMD', 'angular-route'], function (angularAMD) {

    'use strict';

    // Define app
    var app = angular.module("hackerWars", []);

    /**
     * ================
     * ======= Services
     * ================
     */

    // Resource
    app.factory('resourceFactory', require('resourceFactory'));


    /**
     * ================
     * ==== Controllers
     * ================
     */

    // Bank+
    app.controller('BankController', ['resourceFactory', require('bankController')]);

    // Databases
    app.controller('DatabaseController', require('databaseController'));

    // Computers
    app.controller('ComputerController', require('computerController'));

    // Caves
    app.controller('CaveController', require('caveController'));


    /**
     * ================
     * ======== Filters
     * ================
     */

    // Zero
    app.filter('zero', require('zeroFilter'));


    // Display App
    angular.element(document).ready(function () {
        document.getElementsByTagName('body')[0].className = 'loaded ' + document.getElementsByTagName('body')[0].className;
    });

    return angularAMD.bootstrap(app);
});
