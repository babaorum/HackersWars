var _ = require('underscore');
var BuildingRessource = require('./../Ressources/UnitRessource');

module.exports.mount = function(app) {
    app.post('/api/units', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        var unit = req.body.units;

        UnitRessource.Deserialize(unit, function(err, unitR) {
            if(err === null) {
                unitR.Save(function(err, response){
                    res.status(201).send(response);
                });
            }
        });
    });

    app.get('/api/units', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        UnitRessource.List(req.user._id, function(err, response){

            var to_return = [];
            _(response).each(function(unit){
                to_return.push(unit.Serialize());
            });
            res.status(200).send(to_return);
        });
    });

    app.get('/api/units/:id', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        var id = req.params.id;

        UnitRessource.Fetch(id, function(err, response){
            if(response instanceof UnitRessource){
                response = response.Serialize();
            }
            res.status(200).send(response);
        });
    });

    app.put('/api/units/:id', function(req, res) {
        if(!req.user) {
            return res.status(401).end();
        }

        var id = req.params.id;
        var unit = req.body.units;

        UnitRessource.Fetch(id, function(err, unitR) {
            unitR = _.extend(unitR, building);

            unitR.Save(function(err, response) {
                res.status(200).send(response);
            });
        });
    });
};
