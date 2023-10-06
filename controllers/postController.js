const catchAsync = require("../utils/catchAsync");
const cloudinary = require('../middleware/cloudinary')
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.makePost = catchAsync(async (req, res, next) => {
    
    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(result);
    const post = await Post.create({
        desc:req.body.desc,
        user: req.user,
        cloudinaryId:result.public_id,
        media:result.secure_url,
        
    });    
    res.status(201).json({
        status: "success",
        post,
    });
});

exports.getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    // get all comments for this post 
    const comments = await Comment.find({post:req.params.id}).sort({createdAt:"desc"}).lean();
        
    res.status(201).json({
        status: "success",
        post,
    });
});



exports.updateLikes = catchAsync(async (req, res, next) => {
    let post = await Post.findById(req.params.id);
    const user = req.user;

    if (post.likes.includes(user._id)) {
        // post.likes = post.likes.filter(id => id !== req.params.id)
        post.likes = post.likes.filter(id => id.toString() !== user._id.toString())
    }
    else{
        post.likes.push(user._id);
    }

    // Save the updated post
    await post.save();

    res.status(200).json({ status: 'success', post });

});
exports.updateFavourities = catchAsync(async (req, res, next) => {
    let post = await Post.findById(req.params.id);
    const user = req.user;

    if (post.favorites.includes(user._id)) {
        // post.likes = post.likes.filter(id => id !== req.params.id)
        post.favorites = post.favorites.filter(id => id.toString() !== user._id.toString())
    }
    else{
        post.favorites.push(user._id);
    }

    // Save the updated post
    await post.save();

    res.status(200).json({ status: 'success', post });

});

exports.deletePost = catchAsync(async (req, res, next) => {
    // find post and delete it

    const post = await Post.findByIdAndDelete(req.params.id);
    console.log(req.user);
    console.log(post);
    if (req.user._id.toString() !== post.user._id.toString())
        return res.status(404).json({status:"fail",message:"This post doesn't belong to you."})
    
    
    // Delete comments that belongs to this post
    const comments = await Comment.deleteMany({post:req.params.id}) ;
    console.log("➡️➡️",comments);
    // delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinaryId)
    // 
    
    res.status(201).json({status:"success",message:"Post Deleted"})

});

exports.getAllPosts = catchAsync(async (req, res, next) => {
    
    const posts = await Post.find().sort({createdAt:-1});
    
    res.status(200).json({status:"sucess", posts})

});

