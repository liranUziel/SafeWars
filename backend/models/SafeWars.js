const mongoose = require('mongoose');

const safeSchema = mongoose.Schema({
    class:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'Class'
    },
    users:[{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'Users'
    }],
    showScoore:{
        type:Boolean,
        required: [true,'Please add safe type'],
    }
});

module.exports = mongoose.model('safewars',safeSchema);