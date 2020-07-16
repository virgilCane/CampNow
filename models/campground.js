var mongoose = require('mongoose');

//CAMPGROUND SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
	name: String,
	url: String,
	cloud_public_id: String, //delete images from cloudinary using public_id
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
	
	
});


//Compile Schema to db model
// var Campground
module.exports = new mongoose.model('Campground', campgroundSchema);