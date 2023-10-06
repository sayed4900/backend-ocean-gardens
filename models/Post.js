const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    media: {
        type: String,
        requried: true,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

postSchema.pre(/^find/, function(next) {
    // this points to the current query.
    this.populate({
        path: 'user',
        select: 'username email'
    });

    
    this.populate({
        path: 'likes',
        select: 'username',
    });
    
    // this.populate({
    //     path: 'comments', // problem here 
    //     select: 'comment',
    // });

    next();
});




module.exports = mongoose.model("Post", postSchema);
