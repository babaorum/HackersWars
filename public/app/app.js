define(['angularAMD', 'angular-route', 'underscore'], function (angularAMD) {

    'use strict';

    var app, _;

    // Define app
    app = angular.module('hackerWars', []);

    // Define global libs
    _ = require('underscore');

    /**
     * ================
     * ======= Services
     * ================
     */

    // Resource
    app.factory('ResourceFactory', ['userData', require('resourceFactory')]);

    // User
    app.factory('UserFactory', ['userData', require('userFactory')]);

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
    app.controller('DatabaseController', ['$scope', '$interval', 'ResourceFactory', 'ToastFactory', require('databaseController')]);

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


    /**
     * ================
     * ====== Bootstrap
     * ================
     */
    (function () {

        // Is dashboard ?
        if (!document.getElementById('dashboard')) {

            // Bootstrap AngularJs
            return angularAMD.bootstrap(app);
        }

        var injector, $http;

        injector = angular.injector(['ng']);
        $http = injector.get('$http');

        $http.get('/api/users/infos').success(function (data) {

            // Store user info to app constant
            app.constant('userData', data);

            // Bootstrap AngularJs
            angularAMD.bootstrap(app);

        }).error(function (data, status, headers, config) {
            console.log(data, status, headers, config);
        });
    }());
});
