const {body, validationResult} = require('express-validator')
const validator = [
    body('user', 'ingrese un nombre de usuario valido')
    .exists()
    .isLength({min:5}),
    body('email', 'ingrese un email valido')
    .exists()
    .isEmail(),
    body('password', 'ingrese un password correcto')
    .exists()
    .isLength({min:6}),
    (req, res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const validations = errors.array();
            res.render('signup', {validations});
        }else{
            next();
        }
    }
]

module.exports = validator;