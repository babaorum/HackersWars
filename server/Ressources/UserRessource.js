var Table = require('./../Connectors/Table');
var _ = require('underscore');
var userTable = new Table('users');

function UserRessource(blob){
	this._id = blob._id;
	this.name = blob.name;
	this.age = blob.age;
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

UserRessource.List = function(done) {

	var users = userTable.Select('*', {}, {}, function(err, response){
		var result = [];
		if(err){
			console.log('err in UserRessource.List');
		}
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
		done(err, response);
	});
};

UserRessource.prototype.Serialize = function() {
	return {
		_id: this._id,
		name: this.name,
		age: this.age
	};
};

module.exports = UserRessource;