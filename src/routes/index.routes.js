const {Router} = require('express');
const ctrlIndex = require('../controllers/index.controllers');
const validator = require('../helpers/validator');


const router = Router();

router.get('/', ctrlIndex.getIndex);

router.get('/signup', ctrlIndex.getSignUp);
//validator//
router.post('/signup', validator, ctrlIndex.postSignup);

router.get('/login', ctrlIndex.getLogin);

router.post('/login', ctrlIndex.postLogin);

router.get('/logout', ctrlIndex.getLogout);

module.exports = router;