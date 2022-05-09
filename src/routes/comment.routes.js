const {Router} = require('express');
const ctrlComment = require('../controllers/comment.controllers');

const router = Router();

router.post('/photo/:id_image', ctrlComment.postComment);

module.exports = router;


