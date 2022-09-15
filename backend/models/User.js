const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    realName:{
        type:String,
        required: [true,'Please add a name']
    },
    userName:{
        type:String,
        required: [true,'Please add a user name'],
        unique: true
    },
    email:{
        type:String,
        required: [true,'Please add an email'],
        unique: true
    },
    password:{
        type:String,
        required: [true,'Please add a password']
    },
    userType:{
        type:String,
        required: [true,'Please add a user Type']
    }
},{
    timestamps:true,
});

module.exports = mongoose.model('Users',UserSchema);