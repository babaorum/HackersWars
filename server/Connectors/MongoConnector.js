var config = require('./../config/config');
var driver_config = require('./../config/config.'+config.dbType);
var $ = require(driver_config.driverName).Mongous;
var db = driver_config.db.name;
var _ = require('underscore');

function MongoConnector() {

};

MongoConnector.CreateObjectId = function(ressource) {
	var id = null;
	var oid = require("mongous/bson/bson.js").ObjectID;
	
	if(ressource._id !== undefined) {
		id = ressource._id;
	}
	
	ressource._id = new oid(id);
	return ressource;
};

MongoConnector.Select = function(table_name, fields, where, options, done) {
	if(where._id !== undefined) {
		where = MongoConnector.CreateObjectId(where);
	}

	$(db+'.'+table_name).find(where, function(r){
		done(null, r.documents);
	});
};

MongoConnector.Save = function(table_name, ressource, done) {
	var oid = require("mongous/bson/bson.js").ObjectID;

	if(!ressource._id) {
		ressource = MongoConnector.CreateObjectId(ressource);
		$(db+'.'+table_name).save(ressource);
		done(null, ressource);
	}else{
		MongoConnector.Select(table_name, "*", { _id: ressource._id }, {}, function(err, response){
			if(!(ressource._id instanceof oid)) {
				ressource = MongoConnector.CreateObjectId(ressource);
			}
			if(response == null) {
				$(db+'.'+table_name).save(ressource);
				done(null, ressource);
			} else {
				MongoConnector.Update(table_name, ressource, {_id: ressource._id}, done);
			}
			done(null, ressource);
		});
	}
};

MongoConnector.Insert = function(table_name, ressource, done) {
	$(db+'.'+table_name).insert(ressource);
};

MongoConnector.Update = function(table_name, ressource, where, done) {
	var response = $(db+'.'+table_name).update(where, ressource);
	done(response, ressource);
};

MongoConnector.Delete = function(table_name, id, done) {

	MongoConnector.Select(table_name, '*', {_id: id}, {}, function(err, results){
		var response = true;
		if(results.length > 0) {
			response = $(db+'.'+table_name).remove(results[0]);
		}
		
		done(!response, response);
	});
};

module.exports = MongoConnector;