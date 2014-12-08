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
        'bank': '/app/controllers/bank',
        'database': '/app/controllers/database',
        'computer': '/app/controllers/computer',
        'cave': '/app/controllers/cave',

        // Services
        'resourceFactory': '/app/services/resource',

        // Filters
        'zero': '/app/filters/zero'
    },
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'app': [
            // Services
            'resourceFactory',

            // Controllers
            'bank',
            'database',
            'computer',
            'cave',

            // Filters
            'zero'
        ]
    },
    deps: ['app']
});
