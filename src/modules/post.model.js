const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    body : {type : String, optional: true},
    likes : {type : Number, min : 0, default : 0},
    images : [{type : String, optional : true},],
    user_id : {type : mongoose.Schema.Types.ObjectId, ref : 'user', required : true},
}, {
    timestamps : true,
    versionKey : false,
})

const Post = mongoose.model('post', postSchema);
module.exports = Post;
// Post Model
// - body (string, optional),
// - likes (integer, minimum default is 0)
// - image (string, optional)
// - timestamps (string, required)