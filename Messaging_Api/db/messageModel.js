const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    Id: {
        type: Array,
        required: true,
    }, Message: {
        type: String,
        required: false
    }, date: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Message = mongoose.model('Messages', MessageSchema)

module.exports = Message