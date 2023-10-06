const catchAsync = require("../utils/catchAsync");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.makeComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.create({
        comment: req.body.comment,
        user: req.user,
        post: req.params.postid,
    });
    //find post and updates comments 
    const post = await Post.findById(req.params.postid);
    post.comments.push(comment._id) ; 
    await post.save() ;

    console.log(`${req.user.username}: comment=>`,comment);
    res.status(201).json({ status: "success", comment });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.deleteOne({ _id: req.params.commentid });
    // console.log("comment removed " + comment);
    res.status(204).json({status:'success'});
});
exports.updateComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findByIdAndUpdate(req.params.commentid ,
        {
            comment:req.body.comment
        },
        {
            new:true
        });
    console.log("comment updated " + comment);
    // res.redirect("/post/" + req.params.postid);
    res.status(200).json({status:'success',newComment:comment});
    
});


exports.getPostComments = catchAsync(async (req, res, next) => {
    const comments = await Comment.find({ post: req.params.postid })// maybe error from here here
    res.status(200).josn({
        status: "success",
        result: comments.length,
        comments ,
    });
    
});
