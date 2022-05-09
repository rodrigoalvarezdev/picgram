const User = require('../models/user.model');
const passport = require('passport');
const ctrlIndex = {};

ctrlIndex.getIndex = (req, res) =>{
    res.render('index');
};

ctrlIndex.getSignUp = (req, res)=>{
    res.render('signup');
};

ctrlIndex.postSignup = async (req, res)=>{
    const user = await User.findOne({email:req.body.email});
    if(user){
        req.flash('nreg', 'el email ya esta registrado');
        res.redirect('/signup');
    }else{
        const newUser = new User({
            user: req.body.user,
            email: req.body.email,
            password: await User.encryptPassword(req.body.password)
        });
        await newUser.save();
        req.flash('success', 'estas registrado');
        res.redirect('/login');
    }
};

ctrlIndex.getLogin = (req, res)=>{
    res.render('login');
};

ctrlIndex.postLogin =  (req, res)=>{
    passport.authenticate('login', {
        failureRedirect: '/login',
        successRedirect: '/profile',
    })(req, res)
    
}



ctrlIndex.getLogout = (req, res)=>{
    req.logOut();
    res.redirect('/login')
};



module.exports = ctrlIndex;