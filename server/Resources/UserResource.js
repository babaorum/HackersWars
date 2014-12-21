var Table = require('./../Connectors/Table');
var BuildingResource = require('./BuildingResource'); 
var _ = require('underscore');
var userTable = new Table('users');

function UserResource(blob){
    this._id = blob._id == undefined ? blob._id : String(blob._id);
    this.id_google = blob.id_google;
    this.name = blob.name;
    this.firstname = blob.firstname;
    this.email = blob.email;
    this.picture = blob.picture;
    this.team = blob.team;
    this.bitcoins = blob.bitcoins;
};

UserResource.Fetch = function(id, done) {
    userTable.Select('*', {_id: id}, {}, function(err, response){
        var result = null;

        if(response.length > 0) {
            _(response).each(function(user) {
                result = new UserResource(user);
            });
        }
        
        done(err, result);
    });
};

UserResource.FetchByGoogleId = function(id_google, done) {
    userTable.Select('*', {id_google: id_google}, {}, function(err, response){
        var result = null;

        if(response.length > 0) {
            _(response).each(function(user) {
                result = new UserResource(user);
            });
        }

        done(err, result);
    });
}

UserResource.FetchOrCreateByGoogleId = function(blob, done) {
    userTable.Select('*', { id_google: blob.id_google }, {}, function(err, response){
        if(response.length > 0) {
            user = new UserResource(response[0]);
            done(null, user);
        } else {
            user = new UserResource(blob);
            user.Save(function(err, userR) {
                BuildingResource.InitForUser(userR._id);
                done(null, response);
            });
        }
    });
    /*UserResource.Fetch(id, function(err, result){
        if(result instanceof UserResource)
        {
            done(null, result);
        } else {
            user = new UserResource({ _id: id });
            user.Save(done);
        }
    });*/
};

UserResource.List = function(done) {

    var users = userTable.Select('*', {}, {}, function(err, response){
        var result = [];
        
        _(response).each(function(user) {
            result.push(new UserResource(user));
        });
        
        done(err, result);
    });
};

UserResource.Delete = function(id, done) {
    userTable.Delete(id, function(err, response){
        
        done(err, response);
    });
};

UserResource.Deserialize = function(blob, done) {
    var err = true;
    
    var userR = new UserResource(blob);
    
    if(userR instanceof UserResource) {
        err = null;
    }
    done(err, userR);
};

UserResource.prototype.Save = function(done) {
    userTable.Save(this, function(err, response){
        return done(err, response);
    });
};

UserResource.prototype.Serialize = function() {
    return {
        _id: this._id,
        id_google: this.id_google,
        name: this.name,
        firstname: this.firstname,
        email: this.email,
        picture: this.picture,
        team: this.team,
        bitcoins: this.bitcoins
    };
};

module.exports = UserResource;