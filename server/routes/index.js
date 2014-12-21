var _ = require('underscore');

var routes = [
    'users',
    'building'
];

module.exports.mount = function(app) {
    _(routes).each(function(route){
        require('./'+route+'_routes').mount(app);
    });
};
