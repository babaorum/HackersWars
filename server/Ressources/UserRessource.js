var Table = require('./../Connectors/Table');
var BuildingRessource = require('./BuildingRessource'); 
var _ = require('underscore');
var userTable = new Table('users');

function UserRessource(blob){
    this._id = blob._id == undefined ? blob._id : String(blob._id);
    this.id_google = blob.id_google;
    this.name = blob.name;
    this.firstname = blob.firstname;
    this.email = blob.email;
    this.picture = blob.picture;
    this.team = blob.team;
};

UserRessource.Fetch = function(id, done) {
    userTable.Select('*', {_id: id}, {}, function(err, response){
        var result = null;

        if(response.length > 0) {
            _(response).each(function(user) {
                result = new UserRessource(user);
            });
        }
        
        done(err, result);
    });
};

UserRessource.FetchByGoogleId = function(id_google, done) {
    userTable.Select('*', {id_google: id_google}, {}, function(err, response){
        var result = null;

        if(response.length > 0) {
            _(response).each(function(user) {
                result = new UserRessource(user);
            });
        }

        done(err, result);
    });
}

UserRessource.FetchOrCreateByGoogleId = function(blob, done) {
    userTable.Select('*', { id_google: blob.id_google }, {}, function(err, response){
        if(response.length > 0) {
            user = new UserRessource(response[0]);
            done(null, user);
        } else {
            user = new UserRessource(blob);
            user.Save(function(err, userR) {
                BuildingRessource.InitForUser(userR._id);
                done(null, response);
            });
        }
    });
    /*UserRessource.Fetch(id, function(err, result){
        if(result instanceof UserRessource)
        {
            done(null, result);
        } else {
            user = new UserRessource({ _id: id });
            user.Save(done);
        }
    });*/
};

UserRessource.List = function(done) {

    var users = userTable.Select('*', {}, {}, function(err, response){
        var result = [];
        
        _(response).each(function(user) {
            result.push(new UserRessource(user));
        });
        
        done(err, result);
    });
};

UserRessource.Delete = function(id, done) {
    userTable.Delete(id, function(err, response){
        
        done(err, response);
    });
};

UserRessource.Deserialize = function(blob, done) {
    var err = true;
    
    var userR = new UserRessource(blob);
    
    if(userR instanceof UserRessource) {
        err = null;
    }
    done(err, userR);
};

UserRessource.prototype.Save = function(done) {
    userTable.Save(this, function(err, response){
        return done(err, response);
    });
};

UserRessource.prototype.Serialize = function() {
    return {
        _id: this._id,
        id_google: this.id_google,
        name: this.name,
        firstname: this.firstname,
        email: this.email,
        picture: this.picture,
        team: this.team
    };
};

module.exports = UserRessource;