const mongoose = require('mongoose');

const safeSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'Users'
    },
    safeName:{
        type:String,
        required: [true,'Please add safe name'],
    },
    safeType:{
        type:String,
        required: [true,'Please add safe type'],
    }
});

module.exports = mongoose.model('safes',safeSchema);