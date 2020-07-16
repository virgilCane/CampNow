var express = require('express');
var router  = express.Router();

var passport 				= require('passport');

var User					= require('../models/user');

// Display landing Page
router.get('/',(req,res)=>{
	res.render('landing.ejs');
});

//Auth routes
//signup
//Signup 
router.get('/register',(req,res)=>{
	res.render('signup.ejs');
});
router.post('/register',(req,res)=>{
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,(err,user)=>{
		if(err){
			console.log(err); //hanle error properly. If username is taken, program just hangs. Implement appropriate warning message.
			return res.redirect('/register');
		}
		passport.authenticate('local')(req,res,()=>{
			res.redirect('/campgrounds');
		});
	});
});

//Login
router.get('/login',(req,res)=>{
	res.render('login.ejs');
});
router.post('/login',passport.authenticate('local',{
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
	
}),(req,res)=>{
	
});
//log out
router.get('/logout', (req,res)=>{
	req.logOut();
	res.redirect('/campgrounds');
});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}
module.exports = router;