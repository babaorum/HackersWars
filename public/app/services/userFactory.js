define(function () {

    'use strict';

    var factory = function ($http) {

        var user = {};

        // Data
        user.id = null;
        user.name = null;
        user.firstname = null;
        user.email = null;
        user.picture = null;
        user.team = null;

        // Getter
        user.get = function (data) {
            return user[data];
        };

        // Setter
        user.set = function (data, value) {
            user[data] = value;
        };

        // Init
        user.init = function () {

            $http.get('/api/users/infos').success(function (data) {

                user.id = data['_id'];
                user.name = data.name;
                user.firstname = data.firstname;
                user.email = data.email;
                user.picture = data.picture;
                user.team = data.team;

            }).error(function(data, status, headers, config) {

                console.log(data, status, headers, config);
            });
        };

        user.init();

        return {
            //Data
            getId: function () { return user.get('id'); },
            getName: function () { return user.get('name'); },
            getFirstname: function () { return user.get('firstname'); },
            getEmail: function () { return user.get('email'); },
            getPicture: function () { return user.get('picture'); },
            getTeam: function () { return user.get('team'); },

            // Methods
            init: user.init
        };
    };

    return factory;
});
