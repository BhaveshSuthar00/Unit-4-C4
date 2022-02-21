const express = require('express');

const router = express.Router();

const {upload, uploadImage} = require('../middlewares/file.upload');

const User = require('../modules/user.model');

router.post('',uploadImage('profileImages'), async (req, res) => {
    try {
        const filePath = req.files.map((file) => file.path);
        const items = await User.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            profileImages : filePath,
            age : req.body.age,
            password : req.body.password,
        });
        return res.status(201).send(items);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})
router.get('/login', async (req, res) => {
    try {
        const items = await User.findOne({email : req.body.email, password : req.body.password}).lean().exec();
        return items ? res.status(201).send({items, message: 'User successfully logged in'}): res.status(404).send('User not found use another email or password');
    }
    catch(err) {
        return res.status(500).send(err.message);
    }
})
router.get('', async (req, res) => {
    try {
        const items = await User.find().lean().exec();
        return res.status(201).send(items);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const items = await User.findById({_id : req.params.id}).lean().exec();
        return res.status(201).send(items);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const items = await User.findByIdAndDelete({_id : req.params.id}).lean().exec();
        return res.status(201).send(items);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})
router.patch('/:id', async (req, res) => {
    try {
        const items = await User.findByIdAndUpdate({_id : req.params.id}, req.body, {new : true}).lean().exec();
        return res.status(201).send(items);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
})

module.exports = router;