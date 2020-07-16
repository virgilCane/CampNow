var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Santa's Retreat",
        url: "https://res.cloudinary.com/cloudsafe/image/upload/v1564664906/campnow/1564664902304.jpg",
        description: "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee."
    },
    {
        name: "Clide's Hole",
        url: "https://res.cloudinary.com/cloudsafe/image/upload/v1564664906/campnow/1564664902304.jpg",
        description: "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee."
    },
    {
        name: "Not a murder cabin",
        url: "https://res.cloudinary.com/cloudsafe/image/upload/v1564664906/campnow/1564664902304.jpg",
        description: "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee."
    }
]

var seedDB = () =>{
    //remove Campgrounds
    Comment.deleteMany({});
    Campground.deleteMany({},(err)=>{
        // if(err){console.log('err');}
        // data.forEach((seed)=>{
        //     Campground.create(seed,(err,campground)=>{
        //         if(!err){
        //             Comment.create({
        //                 text: "Comment ipsup dolor amet",
        //                 author: "Slim shady"
        //             }, (err,comment)=>{
        //                 campground.comments.push(comment);
        //                 campground.save();
        //             });
        //         }
                
        //     });
        // });
    });
}

module.exports = seedDB;