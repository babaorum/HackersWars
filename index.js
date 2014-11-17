var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var path = require('path');

var root = path.resolve(__dirname, '.');

var app = express();
app.use(express.static(path.resolve(root, 'public')));
app.use(express.static(path.resolve(root, 'bower_components')));
app.set('views', path.resolve(root, 'public/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

var routes = require('./server/routes');

app.use(bodyParser.json({
	extended: true
}));
app.use(bodyParser.urlencoded({
	extended: true
}));

//call routing
routes.mount(app);

app.get('/', function(req,res){
	res.status(200).render('user.html');
});

app.listen(8080);
