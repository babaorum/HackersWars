var UserRessource = require('./../Ressources/UserRessource');
var _ = require('underscore');

module.exports.mount = function(app) {
    
    app.post('/users/team', function(req, res) {
        if (!req.user) {
            return res.redirect('/');
        }
        var user = req.user;
        user.team = req.body.team;

        UserRessource.Deserialize(user, function(err, userR) {
            console.log(userR);
            userR.Save(function(err, user) {
            });
        });

        return res.redirect('/');
    });

//API
    app.get('/api/users/infos', function(req, res) {
        if (!req.user) {
            return res.status(401).end();
        }

        return res.status(200).send(req.user).end();
    });

    app.get('/api/users', function (req, res) {

        UserRessource.List(function (err, response) {
            //serialize users
            var to_return = [];
            _(response).each(function (user) {
                to_return.push(user.Serialize());
            });
            res.status(200).send(to_return);
        });
    });

    app.get('/api/users/:id', function (req, res) {
        var id = req.params.id;

        UserRessource.Fetch(id, function(err, response) {
            if (response instanceof UserRessource) {
                response = response.Serialize();
            }
            res.status(200).send(response).end();
        });
    });

    app.post('/api/users', function (req, res) {
        var user = req.body.users;

        UserRessource.Deserialize(user, function (err, userR) {
            if (err === null) {
                userR.Save(function (err, response) {
                    res.status(201).send(response).end();
                });
            }
        });

    });

    app.put('/api/users/:id', function (req, res) {
        var id = req.params.id;
        var user = req.body.users;

        UserRessource.Fetch(id, function (err, userR) {
            userR = _.extend(userR, user);

            userR.Save(function (err, response) {
                res.status(200).send(response).end();
            });
        });
    });

    app.delete('/api/users/:id', function (req,res) {
        var id = req.params.id;

        UserRessource.Delete(id, function (err, response) {
            if (response === true) {
                res.status(204).end().end();
            }
        });
    });
};
