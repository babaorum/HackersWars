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
        'resourceController': '/app/controllers/resourceController',
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
            'resourceController',
            'databaseController',
            'computerController',
            'caveController',

            // Filters
            'zeroFilter'
        ]
    },
    deps: ['app']
});
