const mongoose = require('mongoose');

const safeSchema = mongoose.Schema({
    class:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'Class'
    },
    safes:[{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'Safe'
    }],
    solve:[{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref:'Safe'
    }],
    showScoore:{
        type:Boolean,
        required: [true,'Please add safe type'],
    }
});

module.exports = mongoose.model('safewars',safeSchema);