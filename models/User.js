const bcrypt = require("bcrypt");
const validator = require('validator');
const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: [true,"Please provide a username"],trim:true },
    email: { type: String, unique: true, required: [true, "Please provide an email"],lowercase:true,
    validate:[validator.isEmail,"Please provide a valid email"]
    },
    password: {type:String,required:[true,"Please Provide a password"]},
    profileImg:{
        type:String,
        // required:true
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    socre:{
        type:Number,
        default: 0 
    }
    
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre("save", async function (next) {
    // run this function if password was actually modified
    if (!this.isModified("password")) return next();

    //Hash the password with salt(cost) of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

module.exports = mongoose.model("User", userSchema);
