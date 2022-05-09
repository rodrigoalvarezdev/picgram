const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const imageSchema = new Schema({
    title: String,
    description: String,
    public_id: String,
    url: String,
    user_id : String,
    username: String,
    timestamp: {type: Date, default: Date.now},
    views: {type:Number, default:0},
    likes: {type:Number, default:0}
});

imageSchema.plugin(mongoosePaginate);

module.exports = model('image', imageSchema);