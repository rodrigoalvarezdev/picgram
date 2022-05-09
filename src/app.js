const express = require('express');
const path = require('path');
const {create} = require('express-handlebars');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const multer = require('multer');
const {v4} = require('uuid');

const app = express();

require('dotenv').config();
require('./passport/login.passport');

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload'),
    filename: ((req, file, cb)=>{
        cb(null, v4() + path.extname(file.originalname))
    })
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

const expHbs = create({
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    helpers: require('./helpers/helper.hbs')
});
app.engine('.hbs', expHbs.engine);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(multer({
    storage
}).single('img'));

app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.loginmje = req.flash('loginmje');
    app.locals.userpassport = req.user||null;
    app.locals.nreg = req.flash('nreg');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/index.routes'));
app.use(require('./routes/image.routes'));
app.use(require('./routes/comment.routes'));
app.use(require('./routes/message.routes'));

module.exports = app;