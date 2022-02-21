require('dotenv').config();

const jwt = require('jsonwebtoken');

const User = require('../modules/user.model');
const makeToken = (user) => {
    return jwt.sign({user}, process.env.MY_SECRET_KEY);
}
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email}).lean().exec();
        if(!user){
            return res.status(404).send('User not found');
        }
        const token = makeToken(user);
        return res.status(200).send({user,token});
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}
module.exports = login;