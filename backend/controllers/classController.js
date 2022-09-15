//wrap async and then we don't have to use try catch
const aysncHanler = require('express-async-handler');
const Safe = require('../models/Safe');
const User = require('../models/User');

// @desc get user safe
// @route GET /safe
// @access Public

const  getSafe = aysncHanler(async (req,res) =>{
    
    //load public safe  
    const admin = await User.findOne({userType:'admin'});
    const safe = await Safe.find({user:admin._id});

    res.status(200).json(safe);
})

module.exports = {
    getSafe,  
}