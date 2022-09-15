const mongoose = require('mongoose');

const ClassSchema = mongoose.Schema({
    className:{
        type:String,
        required: [true,'Please add a name'],
        unique: true
    },
    classID:{
        type:String,
        required: [true,'Please add an id'],
        unique: true
    },
    instructorId:{
        type:String,
        required: [true,'Please add a password']
    },
    students:[String],
},{
    timestamps:true,
});

module.exports = mongoose.model('class',ClassSchema);