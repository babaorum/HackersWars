var Table = require('./../Connectors/Table');
var _ = require('underscore');
var unitTable = new Table('units');

function UnitRessource(blob){
	this._id = blob._id;
	this.id_user;
	this.type = blob.type;
	this.quantity = blob.quantity;
	this.level = blob.level;
};

UnitRessource.Fetch = function(id, done) {
	unitTable.Select('*', {_id: id}, {}, function(err, response){
		var result = null;

		if(response.length > 0) {
			_(response).each(function(unit) {
				result = new UnitRessource(unit);
			});
		}
		
		done(err, result);
	});	
};

UnitRessource.List = function(id_user, done) {

	unitTable.Select('*', {id_user: id_user}, {}, function(err, response){
		var result = [];
		if(err){
			console.log('err in UnitRessource.List');
		}
		_(response).each(function(unit) {
			result.push(new UnitRessource(unit));
		});
		
		done(err, result);
	});
};

UnitRessource.Delete = function(id, done) {
	unitTable.Delete(id, function(err, response){
		
		done(err, response);
	});
};

UnitRessource.Deserialize = function(blob, done) {
	var err = true;
	
	var unitR = new UnitRessource(blob);
	
	if(unitR instanceof UnitRessource) {
		err = null;
	}
	done(err, unitR);
};

UnitRessource.prototype.Save = function(done) {
	unitTable.Save(this, function(err, response){
		done(err, response);
	});
};

UnitRessource.prototype.Serialize = function() {
	return {
		_id: this._id,
		id_user: this.id_user,
		type: this.type,
		quantity: this.quantity,
		level: this.level
	};
};

module.exports = UnitRessource;
