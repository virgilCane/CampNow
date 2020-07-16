var express = require('express');
var router  = express.Router();

var Campground = require('../models/campground');
var Comment = require('../models/comment');

//comment routes
router.get('/campgrounds/:id/comments/new', isLoggedIn,(req,res)=>{	
	Campground.findById((req.params.id),(err,campground)=>{
		if(err){
			throw err;
		}else{
			res.render('comments.ejs',{campground: campground});
		}
	});
});
router.post('/campgrounds/:id/comments/new',isLoggedIn,(req,res)=>{
	Campground.findById((req.params.id),(err,campground)=>{
		if(err){console.log(err);}
		else{
			Comment.create(req.body.comment,(err,comment)=>{
				if(err){console.log(err);}
				else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds');
				}
			});
		}
	});
});

//middleware

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}
module.exports = router;