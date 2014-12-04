define(['angularAMD', 'angular-route'], function (angularAMD) {

    'use strict';

    // Define app
    var app = angular.module("toto", ['ngRoute']);

    // Bank+
    app.controller('BankController', require('bank'));

    // Databases
    app.controller('DatabaseController', require('database'));

    // Computers
    app.controller('ComputerController', require('computer'));

    // Caves
    app.controller('CaveController', require('cave'));

    return angularAMD.bootstrap(app);
});
