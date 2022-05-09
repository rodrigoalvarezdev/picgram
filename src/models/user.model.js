const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    user: String,
    email: String,
    password: String
});

userSchema.statics.encryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, reqpassword) =>{
    return await bcrypt.compare(password, reqpassword);
};

module.exports = model('user', userSchema);