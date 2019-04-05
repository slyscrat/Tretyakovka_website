var express    = require('express')
var app        = express()
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var env        = require('dotenv').load()
var exphbs     = require('express-handlebars')
var port       = 8080; 
    

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');


//Models
var models = require("./app/models");


//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);
var picturesRoute = require('./app/routes/picturesRoute.js')(app, passport);
var exhibitionsRoute = require('./app/routes/exhisRoute.js')(app, passport);
var excursionsRoute = require('./app/routes/excusRoute.js')(app, passport);
var programmsRoute = require('./app/routes/programmsRoute.js')(app, passport);
var errorRoute = require('./app/routes/errorRoute.js')(app, passport);
var ticketsRoute = require('./app/routes/ticketsRoute.js')(app, passport);



//load passport strategies
require('./app/config/passport/passport.js')(passport,models.user);


//Sync Database
models.sequelize.sync({force: false}).then(function(){
	console.log('Nice! Database looks fine');
}).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
});

app.use(express.static('public'));

app.listen(port, function(err){
	if(!err)
	console.log("Site is alive!"); else console.log(err)
});

var employeesRoute = require('./app/routes/employeesRoute.js')(app, passport);
var departRoute = require('./app/routes/departsRoute.js')(app, passport);
var employee_join = require('./app/routes/employee_join.js')(app, passport);