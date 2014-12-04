// Config requirejs
requirejs.config({
    baseUrl: 'app',
    paths: {
        'angular': '../packages/angular/angular.min',
        'angular-route': '../packages/angular-route/angular-route.min',
        'angularAMD': '../packages/angularAMD/angularAMD.min',

        // Controllers
        'bank': 'controllers/bank',
        'database': 'controllers/database',
        'computer': 'controllers/computer',
        'cave': 'controllers/cave'
    },
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'app': [
            'bank',
            'database',
            'computer',
            'cave'
        ]
    },
    deps: ['app']
});
