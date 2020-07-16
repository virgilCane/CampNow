var express 				= require('express');
var app 					= express();
const PORT					= process.env.PORT || 3000;

var bodyParser 				= require('body-parser');
var multer 					= require('multer');
var path 					= require('path');
var mongoose 				= require('mongoose');
var cloudinary 				= require('cloudinary');
var cloudinaryStorage 		= require('multer-storage-cloudinary');
var mongo 					= require('mongodb');
var methodOverride      	= require('method-override');
var passport 				= require('passport');
var localStrategy 			= require('passport-local');
var passportLocalMongoose	= require('passport-local-mongoose');


var seedDB					= require('./seeds.js');
//MONGO COLLECTIONS
var Campground				= require('./models/campground');
var Comment					= require('./models/comment');
var User					= require('./models/user');
//Routes
var campgroundRoutes		= require('./routes/campgrounds');
var commentRoutes			= require('./routes/comments');
var indexRoutes				= require('./routes/index');

// for the .env file
require('dotenv').config();

//General setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/content',express.static('uploads'));
app.use(methodOverride('_method'));

//mongoose deprecation fix
mongoose.set('useFindandModify', false);

//set up Cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: 	process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

//running DB seed func
// seedDB();

//for mongo
var campurl;
var campName;
var pubId;
var desc;
//for get(/campsites) route
var campgroundArr;




//connecting to mongodb
mongoose.connect('mongodb://localhost/campnow', { useNewUrlParser: true });

//session initialisation
app.use(require('express-session')({
	secret: 'cats',
	resave: false,
	saveUninitialized: false
}));
// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for userData
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});



//ROUTES																										
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);	

//Server
var server = app.listen(PORT,()=>{
	console.log('CampNow server is running');
});
