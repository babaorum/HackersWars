var Table = require('./../Connectors/Table');
var _ = require('underscore');
var buildingTable = new Table('building');
var buildingConfig = require('./../config/config.building');
var unitsConfig = require('./../config/config.units');
var ObjectID = require('mongous/bson/bson.js').ObjectID;

function BuildingRessource(blob){
    this._id = blob._id;
    this.id_user = blob.id_user;
    this.type = blob.type;
    this.level = blob.level;
    this.units = blob.units;
};

BuildingRessource.CreateObjectId = function(id) {
    if(id == undefined) {
        id = null;
    }

    id = new ObjectID(id);
    return id;
};

BuildingRessource.InitForUser = function(id_user, done) {
    var buildingTypes = _.keys(buildingConfig);

    _.each(buildingTypes, function(type) {
        BuildingRessource.Deserialize({
            "id_user": id_user,
            type: type,
            level: 0,
            units: 0
        }, function(err, building) {
            building.Save(function(err, response) {});
        });
    });
};

BuildingRessource.Fetch = function(id, done) {
    buildingTable.Select('*', {_id: id}, {}, function(err, response){
        var result = null;

        if(response.length > 0) {
            _(response).each(function(building) {
                result = new BuildingRessource(building);
            });
        }
        
        done(err, result);
    });
};

BuildingRessource.List = function(id_user, done) {
    if(!(id_user instanceof ObjectID)) {
        id_user = BuildingRessource.CreateObjectId(id_user);
    }

    buildingTable.Select('*', {id_user: id_user}, {}, function(err, response){
        var result = [];

        _(response).each(function(building) {
            result.push(new BuildingRessource(building));
        });
        
        done(err, result);
    });
};

BuildingRessource.Delete = function(id, done) {
    buildingTable.Delete(id, function(err, response){
        
        done(err, response);
    });
};

BuildingRessource.Deserialize = function(blob, done) {
    var err = true;
    
    var buildingR = new BuildingRessource(blob);
    
    if(buildingR instanceof BuildingRessource) {
        err = null;
    }
    done(err, buildingR);
};

BuildingRessource.prototype.Save = function(done) {
    buildingTable.Save(this, function(err, response){
        done(err, response);
    });
};

BuildingRessource.prototype.Serialize = function() {
    var to_return = {
        _id: this._id,
        id_user: this.id_user,
        type: this.type,
        level: this.level,
        units: this.units
    };

    if(this.type && buildingConfig[this.type] != undefined) {
        to_return = _.extend(to_return, buildingConfig[this.type], unitsConfig[this.type]);
    }

    return to_return;
};

module.exports = BuildingRessource;
