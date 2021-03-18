const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Uid : {
        type : String,
        required : true,
    }, email : {
        type : String,
        required: true,
    }, pic : {
        type : String,
        required : true
    }, isOnline : {
        type : Boolean,
        require : true,
    }, blockedIds : {
        type : Array,
        required : false
    }, currentlyChatting : {
        type :String,
        required : false
    }
}, {timestamps: true})

const Users = mongoose.model('Users', UserSchema)

module.exports = Users