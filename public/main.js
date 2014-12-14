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
        'toastController': '/app/controllers/toastController',

        // Services
        'resourceFactory': '/app/services/resourceFactory',
        'toastFactory': '/app/services/toastFactory',

        // Filters
        'zeroFilter': '/app/filters/zeroFilter',
        'reverseFilter': '/app/filters/reverseFilter'
    },
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'app': [
            // Services
            'resourceFactory',
            'toastFactory',

            // Controllers
            'resourceController',
            'databaseController',
            'computerController',
            'caveController',
            'toastController',

            // Filters
            'zeroFilter',
            'reverseFilter'
        ]
    },
    deps: ['app']
});
