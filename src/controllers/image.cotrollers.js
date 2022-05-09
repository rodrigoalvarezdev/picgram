const ctrlImage = {};
const Image = require('../models/image.model');
const Comments = require('../models/comments.model');
const User = require('../models/user.model')
const cloudinary = require('cloudinary');
const fs = require('fs-extra');
const statCtrl = require('../helpers/stats');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

ctrlImage.getUpload = async (req, res)=>{
    const images = await Image.find({user_id: req.user._id}).lean().sort({timestamp: -1}).limit(3);
    res.render('upload', {images});
};

ctrlImage.postImage = async (req, res)=>{
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const image = new Image({
        title: req.body.title,
        description: req.body.description,
        public_id: result.public_id,
        url: result.url,
        user_id: req.user._id,
        username: req.user.user
    });
    await image.save();
    await fs.unlink(req.file.path);
    res.redirect('/upload');
};

ctrlImage.getProfile = async (req, res)=>{
    const user = req.user;
    const username = user.user
    const images = await Image.find({user_id: req.user._id}).lean().sort({timestamp: -1});
    const imgLikes = await Image.find({user_id: req.user._id}).lean().sort({likes:-1}).limit(4);
    const imgViews = await Image.find({user_id: req.user._id}).lean().sort({views:-1}).limit(4);
    let sumaComments = 0
    images.forEach(async el =>{
        const comment = await Comments.countDocuments({image_id:el._id});
        sumaComments += comment
    })
    const resp = await Promise.all([
        statCtrl.vistas(Image, {username}),
        statCtrl.gustas(Image, {username}),
    ])
    
    const count = await Image.countDocuments({user_id: req.user._id});
   
    const stats = {};
    stats.totalimages = count;
    stats.totalcomments = sumaComments;
    stats.totalviews =  resp[0];
    stats.totallikes = resp[1];
    res.render('profile', {username, images, stats, imgLikes, imgViews});
};

ctrlImage.getWall = async (req,res)=>{
    const page = req.query.page || 1;
    const image = await Image.paginate({}, {limit:5, page, lean: true, sort:{timestamp:-1}});
    const images = image.docs;
    
    const options = {};
    options.prev = image.hasPrevPage;
    options.next = image.hasNextPage;
    options.actualPage = image.page;
    
    res.render('wall', {images, options});
};

ctrlImage.getPhoto = async (req, res)=>{
    const imageid = await Image.findById(req.params.id);
    imageid.views += 1;
    const image = await Image.findByIdAndUpdate(imageid._id, {views: imageid.views}).lean();
    const comment = await Comments.find({image_id: image._id}).lean().sort({timestamp:-1});
    res.render('photo', {image, comment});
};

ctrlImage.postLikes = async (req, res)=>{
    const image = await Image.findById(req.params.id);
    if(image){
        image.likes += 1;
        await image.save();
        res.json({likes:image.likes})
    }
};

ctrlImage.getVisit = async (req, res)=>{
    const images = await Image.find({user_id: req.params.id}).lean();
    const user = await User.findById(req.params.id).lean();
    res.render('profile-visit', {images, user});
};

ctrlImage.delImage = async (req, res)=>{
    const id = req.params.id;
    const image = await Image.findByIdAndDelete(id);
    await cloudinary.v2.uploader.destroy(image.public_id);
    res.redirect('/profile')
};

ctrlImage.getUpdateImage = async (req, res)=>{
    const image = await Image.findById(req.params.id).lean();
    
    res.render('update-image', {image});
};

ctrlImage.postUpdateImage = async (req, res)=>{
    const {title, description} = req.body;
    const id = req.params.id;
    const image = await Image.findByIdAndUpdate(id, {title, description});
    res.redirect('/profile');
}
module.exports = ctrlImage;