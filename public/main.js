// Config requirejs
requirejs.config({
    baseUrl: 'app',
    paths: {
        // Vendor
        'angular': '/packages/angular/angular.min',
        'angular-route': '/packages/angular-route/angular-route.min',
        'angularAMD': '/packages/angularAMD/angularAMD.min',
        'underscore': '/packages/underscore/underscore-min',

        // App
        'app': '/app/app',

        // Controllers
        'resourceController': '/app/controllers/resourceController',
        'databaseController': '/app/controllers/databaseController',
        'computerController': '/app/controllers/computerController',
        'caveController': '/app/controllers/caveController',
        'userController': '/app/controllers/userController',
        'toastController': '/app/controllers/toastController',

        // Services
        'resourceFactory': '/app/services/resourceFactory',
        'userFactory': '/app/services/userFactory',
        'toastFactory': '/app/services/toastFactory',

        // Filters
        'zeroFilter': '/app/filters/zeroFilter',
        'reverseFilter': '/app/filters/reverseFilter'
    },
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'underscore': ['angular'],

        'app': [
            // Services
            'resourceFactory',
            'toastFactory',
            'userFactory',

            // Controllers
            'resourceController',
            'databaseController',
            'computerController',
            'caveController',
            'userController',
            'toastController',

            // Filters
            'zeroFilter',
            'reverseFilter'
        ]
    },
    deps: ['app']
});
