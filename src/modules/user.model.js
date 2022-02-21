const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {type : String, required : true, minLength : 3, maxLength : 30},
    lastName : {type : String, optional : true, minLength : 3, maxLength : 30,required : false},
    age : {type : Number, min : 1, max : 150, required : true},
    email : {type : String, required : true, unique : true},
    profileImages : [{type : String, required : true}],
    password : {type : String, required : true},
}, {
    timestamps : true,
    versionKey : false,
})

const User = mongoose.model('user', userSchema);

module.exports = User;
// User Model
// - firstName (string, required, minimum length 3 and maximum length 30)
// - lastName (string, optional, if given then minimum length 3 and maximum length 30)
// - age (integer, required, should be between 1 and 150)
// - email (string, required, unique)
// - profileImages: (array of imageUrls and atleast 1 profile image is required)
// - timestamps (string, required)
