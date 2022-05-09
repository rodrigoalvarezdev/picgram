const {Schema, model} = require('mongoose');

const messageSchema = new Schema({
    sender: String,
    addressee: String,
    message: String
});

module.exports = model('message', messageSchema);