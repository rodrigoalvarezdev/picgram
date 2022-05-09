const ctrlComment = {};
const Comment = require('../models/comments.model');

ctrlComment.postComment = async (req, res)=>{
    const user = req.user;
    const comment = new Comment({
        name: user.user,
        name_id: user._id,
        text: req.body.text,
        image_id: req.params.id_image
    });
    console.log(comment)
    await comment.save();
    res.redirect(`/photo/${req.params.id_image}`);
};

module.exports = ctrlComment;