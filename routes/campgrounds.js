var express = require('express');
var router  = express.Router();

var multer 					= require('multer');
var cloudinary 				= require('cloudinary');
var cloudinaryStorage 		= require('multer-storage-cloudinary');


var Campground = require('../models/campground');
var Comments = require('../models/comment');

//set up Cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: 	process.env.API_KEY,
	api_secret: process.env.API_SECRET
});
//setup Cloudinary storage path and image naming convention
var storage = cloudinaryStorage({
	cloudinary:       cloudinary,
	folder:           'campnow',
	allowedFormats:   ['jpg','png'],
	filename:         (req,file,cb) =>{
		                  cb(undefined, Date.now())
	                                  }
});

//set multer storage path to cloudinary storage [var storage]
var parser = multer({storage:storage});

//routes
//Display Trending Campgrounds [SHOW{DISPLAY} ROUTE]
router.get('/campgrounds',(req,res)=>{
	Campground.find({}).populate("comments").exec((err,foundCamground)=>{
		if(err){console.log(err);}
		else{
			campgroundArr = foundCamground;
			res.render('campgrounds.ejs',{campgrounds: campgroundArr, currentUser: req.user});
		}
	});

});
//Load new campsite details [CREATE ROUTE]
router.post('/campgrounds',parser.single('camp_image'),(req,res)=>{
	cloudinary.v2.uploader.upload(req.file.path,(err,result)=>{
		if(err){console.log('cloudinary uploader error: '+ err);}
	});
	var urlStr = req.file.secure_url;
	campurl  = urlStr.substr(0,49) + '/c_scale,w_1000,h_800/' + urlStr.substr(50);
	campName = req.body.camp_name;
	pubId    = req.file.public_id;
	desc 	 = req.body.camp_desc;


	Campground.create({
		name:             campName,
		url:              campurl,
		cloud_public_id:  pubId,
		description:      desc
		 
	});	
	res.redirect('/campgrounds');	
});
//Post route to add comments to campground

router.get('/campgrounds/:id',(req,res)=>{

	Campground.findById(req.params.id).populate("comments").exec(async (err,campground)=>{
		if(err){throw err}
		else {
			console.log(campground);
			// res.redirect('/campgrounds');
			await res.render('show.ejs', {campground: campground});
		}		
	});
});

//Delete Image from Cloudinary and Mongo [DESTROY ROUTE]
router.delete('/campgrounds/:id', async(req,res)=>{
	var campID = req.body.camp_id_pub;
	var MongID = req.params.id;

	
	cloudinary.v2.uploader.destroy(campID,(err,result)=>{
		if(err){console.log('Error deleting image');}
	});
	await Campground.findByIdAndRemove(MongID, (err,cb)=>{
		if(err){ res.send('Cannot delete the post')}
		else{ res.redirect('/campgrounds');}
	});	
});

module.exports = router;