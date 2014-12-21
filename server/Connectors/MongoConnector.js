var config = require('./../config/config');
var driver_config = require('./../config/config.'+config.dbType);
var $ = require(driver_config.driverName).Mongous;
var db = driver_config.db.name;
var _ = require('underscore');
var ObjectID = require("mongous/bson/bson.js").ObjectID;

function MongoConnector() {

};

MongoConnector.CreateObjectId = function(resource) {
	var id = null;
	
	if(resource._id !== undefined) {
		id = resource._id;
	}
	
	resource._id = new ObjectID(id);
	return resource;
};

MongoConnector.Select = function(table_name, fields, where, options, done) {
	if(where._id !== undefined && !(where._id instanceof ObjectID)) {
		where = MongoConnector.CreateObjectId(where);
	}

	$(db+'.'+table_name).find(where, function(r){
		done(null, r.documents);
	});
};

MongoConnector.Save = function(table_name, resource, done) {
	if(!resource._id) {
		resource = MongoConnector.CreateObjectId(resource);
		$(db+'.'+table_name).save(resource);
		done(null, resource);
	}else{
		MongoConnector.Select(table_name, "*", { _id: resource._id }, {}, function(err, response){
			if(!(resource._id instanceof ObjectID)) {
				resource = MongoConnector.CreateObjectId(resource);
			}
			if(response == null) {
				$(db+'.'+table_name).save(resource);
				done(null, resource);
			} else {
				MongoConnector.Update(table_name, resource, {_id: resource._id}, done);
			}
		});
	}
};

MongoConnector.Insert = function(table_name, resource, done) {
	$(db+'.'+table_name).insert(resource);
};

MongoConnector.Update = function(table_name, resource, where, done) {
	var response = $(db+'.'+table_name).update(where, resource);
	done(response, resource);
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