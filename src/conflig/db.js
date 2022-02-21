const mongoose = require('mongoose');

module.exports = ()=>{
    return mongoose.connect(
        "mongodb+srv://bhavesh:bhavesh_98333@cluster0.wszxi.mongodb.net/evaluation_C4?retryWrites=true&w=majority"
    )
}