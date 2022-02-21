const express = require('express');

const router = express.Router();
const fs = require('fs');
const Post = require('../modules/post.model');
const User = require('../modules/user.model');
const {upload, uploadImage} = require('../middlewares/file.upload.post');
const authorization = require('../middlewares/authorization');
router.post('',uploadImage("file"), async (req, res) => {
    try {
        const filePath = req.files.map((file) => file.path);
        const items = await Post.create({
            body : req.body.body,
            likes : req.body.likes,
            comments_ids : req.body.comments_ids,
            user_id : req.body.user_id,
            images : filePath,
        });
        return res.status(201).send(items);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get('', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const size = req.query.limit || 10;
        const max = (page-1)*size;
        const items = await Post.find({}).skip(max).limit(size).lean().exec();
        return res.status(201).send({items,currentPage : page,limit : size});
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        
        const items = await Post.findById({_id : req.params.id}).lean().exec();
        return res.status(201).send(items);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})

router.delete('/:id',authorization, async (req, res) => {
    try {
        let dd = req.user.user._id;
        const findUser = await Post.findById({$and: [{_id : {$eq:req.params.id}}, {user_id : {$eq : dd}} ]}).lean().exec();
        if(!findUser){
            return res.status(404).send("you can't update this post");
        }
        const user_post = await Post.findByIdAndDelete(req.params.id).lean().exec();
        let images_file = user_post.images;
        images_file.map(images =>{
            fs.unlink(images, (err => {
                if (err) console.log(err);
                else {
                    console.log(`Deleted file: ${images}`);
                }
            }));
        })
        return res.status(201).send(user_post);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})
router.patch('/:id',authorization, async (req, res) => {
    try {
        let dd = req.user.user._id;
        const findUser = await Post.findById({$and: [{_id : {$eq:req.params.id}}, {user_id : {$eq : dd}} ]}).lean().exec();
        if(!findUser){
            return res.status(404).send("you can't update this post");
        }
        const poo = await Post.findByIdAndUpdate({_id : req.params.id}, req.body, {new : true}).lean().exec();
        return res.status(201).send(poo);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})

module.exports = router;