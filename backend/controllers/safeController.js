//wrap async and then we don't have to use try catch
const aysncHanler = require('express-async-handler');
const Safe = require('../models/Safe');
const User = require('../models/User');

// @desc get user safe
// @route GET /safe
// @access Private

const  getSafe = aysncHanler(async (req,res) =>{
    
    //load user safe
    const safe = await Safe.find({user:req.user.id})
    
    res.status(200).json(safe);
})

// @desc set user safe
// @route SET /safe
// @access Private
// Cases:
// Admin can upload many safe ("under his name"). Admin safes are public safe to all users.
// Base User: can only upload one safe. Base user safe are priavte, except in class SafeWar.
const setSafe = aysncHanler(async (req,res)=>{
    if(!req.body.safeName){
        res.status(400)
        throw new Error('Plaease add safe name');
    }
    const userSafe = await Safe.find({user:req.user.id})
    if(userSafe.length !== 0 && req.user.userType !== 'admin'){
        res.status(400)
        throw new Error('There is a safe for this user try to remove first or update');
    }
    const safe = await Safe.create({
        safeName:req.body.safeName,
        user:req.user.id
    })
    res.status(201).json(safe);
})

// @desc update user safe
// @route PUT /safe/:id
// @access Private

const  updateSafe = aysncHanler(async (req,res)=>{

    const safe = await Safe.findById(req.params.id)
    if(!safe){
        res.status(400);
        throw new Error('Safe not found');
    }

    //Check for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    //Make sure the logged in user matches the safe user
    if(safe.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedSafe = await Safe.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedSafe)
})

// @desc remove user safe
// @route DELETE /safe/:id
// @access Private

const deleteSafe = aysncHanler(async (req,res)=>{
    const safe = await Safe.findById(req.params.id)

    //Check for user
    const user = await User.findById(req.user.id);


    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    //Make sure the logged in user matches the safe user
    if(safe.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized');
    }

    if(!safe){
        res.status(400);
        throw new Error('Safe not found');
    }
    await safe.remove()
    res.status(200).json({id:req.params.id})
})


module.exports = {
    getSafe,
    setSafe,
    updateSafe,
    deleteSafe
}