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
    app.factory('ResourceFactory', require('resourceFactory'));

    // User
    app.factory('UserFactory', ['$http', require('userFactory')]);

    // Toast
    app.factory('ToastFactory', ['$timeout', require('toastFactory')]);


    /**
     * ================
     * ==== Controllers
     * ================
     */

    // Bank
    app.controller('ResourceController', ['$scope', 'ResourceFactory', require('resourceController')]);

    // Databases
    app.controller('DatabaseController', ['$scope', '$interval', 'ResourceFactory', require('databaseController')]);

    // Computers
    app.controller('ComputerController', ['$scope', 'ResourceFactory', require('computerController')]);

    // Caves
    app.controller('CaveController', ['$scope', 'ResourceFactory', require('caveController')]);

    // User
    app.controller('UserController', ['$scope', 'UserFactory', require('userController')]);

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


    return angularAMD.bootstrap(app);
});
