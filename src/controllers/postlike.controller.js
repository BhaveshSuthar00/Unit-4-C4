const express = require('express');

const router = express.Router();

const Postlike = require('../modules/post.like.model');

router.get('/', (req, res) =>{
    try {
        const items = await Postlike.find().lean().exec();
        return res.send(items);
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
})

router.post('', (req, res) =>{
    try {
        const items = await Postlike.create(req.body);
        return res.send(items);
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
})
module.exports = router;