const {Router} = require('express');
const ctrlImage = require('../controllers/image.cotrollers');
const helper = require('../helpers/isAuthenticated');

const router = Router();

router.get('/upload',helper.authenticated, ctrlImage.getUpload);

router.post('/upload', ctrlImage.postImage);

router.get('/profile',helper.authenticated, ctrlImage.getProfile);

router.get('/wall',helper.authenticated, ctrlImage.getWall);

router.get('/photo/:id',helper.authenticated, ctrlImage.getPhoto);

router.post('/photo/like/:id', ctrlImage.postLikes);

router.get('/visit/:id',helper.authenticated, ctrlImage.getVisit);

router.get('/delete/:id',helper.authenticated, ctrlImage.delImage);

router.get('/update/:id',helper.authenticated, ctrlImage.getUpdateImage);

router.post('/update/:id',helper.authenticated, ctrlImage.postUpdateImage);

router.get('/change-profile', ctrlImage.getChange);

router.post('/change-profile', ctrlImage.postChange);

module.exports = router;