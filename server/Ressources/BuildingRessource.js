var Table = require('./../Connectors/Table');
var _ = require('underscore');
var buildingTable = new Table('building');

function BuildingRessource(blob){
	this._id = blob._id;
	this.id_user;
	this.type = blob.type;
	this.quantity = blob.quantity;
	this.level = blob.level;
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

	buildingTable.Select('*', {id_user: id_user}, {}, function(err, response){
		var result = [];
		if(err){
			console.log('err in BuildingRessource.List');
		}
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
	return {
		_id = this._id,
		id_user = this.id_user,
		type = this.type,
		quantity = this.quantity,
		level = this.level;
	};
};

module.exports = BuildingRessource;