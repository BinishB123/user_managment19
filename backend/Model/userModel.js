const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true,'please add name']
    },
    mobile: {
        type: Number,
        required: [true,'please add mobile']
    },
    email: {
        type: String,
        required: [true,'please add email']
    },
    password: {
        type: String,
        required: [true,'please add password']
    },
    imgUrl:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
});

const usersModel = mongoose.model('users', userSchema);  // Corrected this line

module.exports = usersModel;
