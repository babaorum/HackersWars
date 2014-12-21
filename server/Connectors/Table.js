var config = require('./../config/config');
var connector = require('./'+config.dbType+'Connector');

function Table(name) {
	this.name = name;

};

Table.prototype.Select = function(fields, where, options, done) {
	
	connector.Select(this.name, fields, where, options, done);
};

Table.prototype.Save = function(resource, done) {
	connector.Save(this.name, resource, done);
};

Table.prototype.Insert = function(blob, done) {
	connector.Insert(this.name, blob, done);
};

Table.prototype.Update = function(blob, where, done) {
	connector.Update(this.name, blob, where, done);
};

Table.prototype.Delete = function(id, done) {
	connector.Delete(this.name, id, done);
};

module.exports = Table;