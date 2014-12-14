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

    // Toast
    app.factory('ToastFactory', ['$rootScope', require('toastFactory')]);


    /**
     * ================
     * ==== Controllers
     * ================
     */

    // Bank
    app.controller('ResourceController', ['$scope', 'ResourceFactory', 'ToastFactory', require('resourceController')]);

    // Databases
    app.controller('DatabaseController', ['$scope', 'ResourceFactory', require('databaseController')]);

    // Computers
    app.controller('ComputerController', ['$scope', 'ResourceFactory', require('computerController')]);

    // Caves
    app.controller('CaveController', ['$scope', 'ResourceFactory', require('caveController')]);

    // Toasts
    app.controller('ToastController', ['$scope', 'ToastFactory', require('toastController')]);


    /**
     * ================
     * ======== Filters
     * ================
     */

    // Zero
    app.filter('zero', require('zeroFilter'));

    // Reverse
    app.filter('reverse', require('reverseFilter'));


    /**
     * Initialisation
     */

    // Display App
    angular.element(document).ready(function () {
        document.getElementsByTagName('body')[0].className = 'loaded ' + document.getElementsByTagName('body')[0].className;
    });

    return angularAMD.bootstrap(app);
});
