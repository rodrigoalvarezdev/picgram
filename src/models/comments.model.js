const {Schema, model} = require('mongoose');
const objectId = Schema.ObjectId;

const commentSchema = new Schema({
    name: {type:String},
    name_id: {type:String},
    text: {type:String},
    image_id: {type: objectId},
    timestamp: {type:Date, default: Date.now}
});

module.exports = model('comment', commentSchema);