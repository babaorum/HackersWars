var UserRessource = require('./../Ressources/UserRessource');
var _ = require('underscore');

module.exports.mount = function(app) {

	app.get('/api/1/users', function(req,res){

		UserRessource.List(function(err, response){
			//serialize users
			var to_return = [];
			_(response).each(function(user){
				to_return.push(user.Serialize());
			});
			res.status(200).send(to_return);
		});
	});

	app.get('/api/1/users/:id', function(req,res){
		var id = req.params.id;
		
		UserRessource.Fetch(id, function(err, response){
			if(response instanceof UserRessource){
				response = response.Serialize();
			}
			res.status(200).send(response);
		});
	});

	app.post('/api/1/users', function(req,res){
		var user = req.body.users;

		UserRessource.Deserialize(user, function(err, userR) {
			if(err === null) {
				userR.Save(function(err, response){
					res.status(201).send(response);
				});
			}
		});

	});
	
	app.put('/api/1/users/:id', function(req,res){
		var id = req.params.id;
		var user = req.body.users;

		UserRessource.Fetch(id, function(err, userR) {
			userR = _.extend(userR, user);
			
			userR.Save(function(err, response) {
				res.status(200).send(response);
			});
		});
	});
	
	app.delete('/api/1/users/:id', function(req,res){
		var id = req.params.id;

		UserRessource.Delete(id, function(err, response) {
			if (response === true)
			{
				res.status(204).end();
			}
		});
	});
};