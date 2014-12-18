define(function () {

    'use strict';

    var factory = function (userData) {

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

            user.id = userData['_id'];
            user.name = userData.name;
            user.firstname = userData.firstname;
            user.email = userData.email;
            user.picture = userData.picture;
            user.team = userData.team;
        };

        // init
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
