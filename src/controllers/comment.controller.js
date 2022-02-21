const express = require('express');

const router = express.Router();

const Comment = require("../modules/comment.mode");

router.post('/', async (req, res) => {
    try {
        const items = await Comment.create(req.body);
        return res.status(200).send(items);
    }
    catch (err){
        return res.status(500).send(err.message);
    }
})

router.get('', async (req, res) => {
    try {
        const items = await Comment.find().lean().exec();
        return res.status(200).send(items);
    }
    catch (err){
        return res.status(500).send(err.message);
    }
})

module.exports = router;