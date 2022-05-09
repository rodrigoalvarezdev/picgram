const ctrlMessages = {};
const Message = require('../models/messages.model');

ctrlMessages.getMessage = (req, res)=>{
    res.render('write-message');
};

ctrlMessages.postMessage = async (req, res)=>{
    const message = new Message({
        sender: req.user.user,
        addressee: req.body.touser,
        message: req.body.tomessage
    });
    await message.save();
    res.redirect('/write-message')
};

ctrlMessages.getMailbox = async (req, res)=>{
    const mail = await Message.find({addressee:req.user.user}).lean();
    res.render('mail-box-received', {mail});
};

ctrlMessages.getSended = async (req, res)=>{
    const memail = await Message.find({sender:req.user.user}).lean();
    res.render('mail-box-sended', {memail});
};

module.exports = ctrlMessages;