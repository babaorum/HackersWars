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
    app.factory('ResourceFactory', ['$rootScope', require('resourceFactory')]);


    /**
     * ================
     * ==== Controllers
     * ================
     */

    // Bank+
    app.controller('ResourceController', ['$scope', 'ResourceFactory', require('resourceController')]);

    // Databases
    app.controller('DatabaseController', ['$scope', 'ResourceFactory', require('databaseController')]);

    // Computers
    app.controller('ComputerController', ['$scope', 'ResourceFactory', require('computerController')]);

    // Caves
    app.controller('CaveController', ['$scope', 'ResourceFactory', require('caveController')]);


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
