var _ = require('underscore');
var BuildingRessource = require('./../Ressources/BuildingRessource');
var ObjectID = require('mongous/bson/bson.js').ObjectID;

module.exports.mount = function(app) {
    
    app.post('/api/building/:id/upgrade', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        var id_building = req.params.id;
        BuildingRessource.Fetch(id_building, function(err, response) {
            if(response instanceof BuildingRessource) {
                if(response.id_user == req.user._id) {
                    response.level += 1;
                    response.Save(function(err, response){
                        return res.status(201).send(response.Serialize());
                    });
                } else {
                    return res.status(401).end();
                }
            } else {
                return res.status(404).end();
            }
        });
    });

    app.post('/api/building/:id/units', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        var id_building = req.params.id;
        BuildingRessource.Fetch(id_building, function(err, response) {
            if(response instanceof BuildingRessource) {
                if(response.id_user == req.user._id) {
                    response.units += 1;
                    response.Save(function(err, response){
                        return res.status(201).send(response.Serialize());
                    });
                } else {
                    return res.status(401).end();
                }
            } else {
                return res.status(404).end();
            }
        });
    });

//API
    /*app.post('/api/building', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        var building = req.body.building;

        BuildingRessource.Deserialize(building, function(err, buildingR) {
            if(err === null) {
                buildingR.Save(function(err, response){
                    res.status(201).send(response);
                });
            }
        });
    });*/

    app.get('/api/building', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        BuildingRessource.List(req.user._id, function(err, response){

            var to_return = [];
            _(response).each(function(user){
                to_return.push(user.Serialize());
            });
            res.status(200).send(to_return);
        });
    });

    app.get('/api/building/:id', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        var id = req.params.id;

        BuildingRessource.Fetch(id, function(err, response){
            if(response instanceof BuildingRessource){
                response = response.Serialize();
            }
            res.status(200).send(response);
        });
    });

    app.put('/api/building/:id', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        var id = req.params.id;
        var building = req.body.building;

        BuildingRessource.Fetch(id, function(err, buildingR) {
            buildingR = _.extend(buildingR, building);

            buildingR.Save(function(err, response) {
                res.status(200).send(response);
            });
        });
    });
};
