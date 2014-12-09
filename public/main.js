// Config requirejs
requirejs.config({
    baseUrl: 'app',
    paths: {
        'angular': '/packages/angular/angular.min',
        'angular-route': '/packages/angular-route/angular-route.min',
        'angularAMD': '/packages/angularAMD/angularAMD.min',

        // App
        'app': '/app/app',

        // Controllers
        'bankController': '/app/controllers/bankController',
        'databaseController': '/app/controllers/databaseController',
        'computerController': '/app/controllers/computerController',
        'caveController': '/app/controllers/caveController',

        // Services
        'resourceFactory': '/app/services/resourceFactory',

        // Filters
        'zeroFilter': '/app/filters/zeroFilter'
    },
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'app': [
            // Services
            'resourceFactory',

            // Controllers
            'bankController',
            'databaseController',
            'computerController',
            'caveController',

            // Filters
            'zeroFilter'
        ]
    },
    deps: ['app']
});
