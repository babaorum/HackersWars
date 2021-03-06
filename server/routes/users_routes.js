var UserResource = require('./../Resources/UserResource');
var BuildingResource = require('./../Resources/BuildingResource');
var _ = require('underscore');

module.exports.mount = function(app) {
    
    app.post('/users/team', function(req, res) {
        if (!req.user) {
            return res.redirect('/');
        }
        var user = req.user;
        user.team = req.body.team;

        UserResource.Deserialize(user, function(err, userR) {
            userR.Save(function(err, user) {
                res.redirect('/');
            });
        });
    });

    app.post('/users/bitcoins', function(req, res) {
        if(!req.user) {
            return res.redirect('/');
        }
        var user = req.user;

        if(req.body.bitcoins != undefined) {
            user.bitcoins = req.body.bitcoins;
        }

        UserResource.Deserialize(user, function(err, userR) {
            userR.Save(function(err, user) {
                res.status(201).send(user);
            });
        });
    });

//API
    app.get('/api/users/infos', function(req, res) {
        if (!req.user) {
            return res.status(401).end();
        }

        var user = req.user;
        BuildingResource.List(user._id, function(err, building) {
            var to_return = [];
            _.each(building, function(build) {
                to_return.push(build.Serialize());
            })

            user.building = to_return;
            return res.status(200).send(user).end();
        });
    });

    app.get('/api/users', function (req, res) {

        UserResource.List(function (err, response) {
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

        UserResource.Fetch(id, function(err, response) {
            if (response instanceof UserResource) {
                response = response.Serialize();
            }
            res.status(200).send(response).end();
        });
    });

    app.post('/api/users', function (req, res) {
        var user = req.body.users;

        UserResource.Deserialize(user, function (err, userR) {
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

        UserResource.Fetch(id, function (err, userR) {
            userR = _.extend(userR, user);

            userR.Save(function (err, response) {
                res.status(200).send(response).end();
            });
        });
    });

    app.delete('/api/users/:id', function (req,res) {
        var id = req.params.id;

        UserResource.Delete(id, function (err, response) {
            if (response === true) {
                res.status(204).end();
            }
        });
    });
};
