const mongoose = require('mongoose');

const postLikeSchema = new mongoose.Schema({
    postid : {type : mongoose.Schema.Types.ObjectId, ref :"post", required : true},
    userid : {type : mongoose.Schema.Types.ObjectId, ref : 'user', required : true},
},{
    timestamps : true,
    versionKey : false,
});

const PostLike = mongoose.model('postlike',postLikeSchema);

module.exports = PostLike;