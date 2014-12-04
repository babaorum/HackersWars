var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var expressSession = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserRessource = require('./server/Ressources/UserRessource');

var root = path.resolve(__dirname, '.');

var app = express();
app.use(expressSession({ secret: 'katsu kurry' }));
app.use(passport.initialize());
app.use(passport.session());
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

//coucou
passport.serializeUser(function (user, done) {
	done(null, user._id);
});
passport.deserializeUser(function (id, done) {
	UserRessource.Fetch(id, done);	
});

passport.use(new GoogleStrategy({
    clientID: "131420647360-0at81lq61r2qnn677cem90cbg2kdnver.apps.googleusercontent.com",
    clientSecret: "uiiXZ5NG2vDgctEP9d2VuUin",
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
    data = profile._json;
    blob = {
      id_google: data.id,
      email: data.email,
      name: data.family_name,
      firstname: data.given_name,
      picture: data.picture
    };
    UserRessource.FetchOrCreateByGoogleId(blob, function (err, user) {
      return done(err, user.Serialize());
    });
  }
));


//call routing
routes.mount(app);

app.get('/', function(req,res){
	if(!req.user) {
    return res.status(200).render('index.html');
  } else {
    if(!req.user.team) {
      return res.status(200).render('create.html');
    }
    else {
      return res.status(200).render('dashboard.html');
    }
  }
});

app.get('/auth/google', passport.authenticate('google', { scope: [
		'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]}), function(req, res){});
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
}); 

app.listen(8080);
