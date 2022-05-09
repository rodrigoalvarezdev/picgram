const passport = require('passport');
const {Strategy} = require('passport-local');
const User = require('../models/user.model');

passport.use('login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
    const user = await User.findOne({email});
    
    if(!user){
        return done(null, false, req.flash('loginmje', 'usuario no registrado'));
    }else{
        const matchPassword = await User.comparePassword(password, user.password);
        if(!matchPassword){
            return done(null, false, req.flash('loginmje', 'contraseña incorrecta'));
        }else{
            return done(null, user);
        };
        
    };
}));


passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});
