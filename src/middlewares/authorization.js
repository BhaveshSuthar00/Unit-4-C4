require('dotenv').config();

const jwt = require('jsonwebtoken');

const verifytoken = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token,process.env.MY_SECRET_KEY, (err,token)=>{
            if(err) return reject(err);
            
            return resolve(token);
        })
    })
}

module.exports = async(req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).send('token required');
    }
    if(!req.headers.authorization.startsWith('Bearer ')){
        return res.status(400).send('provide valid bearer token');
    }
    let token = req.headers.authorization.split(' ')[1];

    let current_user;
    try {
        current_user = await verifytoken(token);
    } catch (err) {
        return res.status(400).send('invalid token');
    }
    req.user = current_user;
    
    return next();
}