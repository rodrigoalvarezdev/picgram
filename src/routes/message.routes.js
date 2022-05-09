const {Router} = require('express');
const ctrlMessages = require('../controllers/message.cotrollers');
const helper = require('../helpers/isAuthenticated')

const router = Router();

router.get('/write-message',helper.authenticated, ctrlMessages.getMessage);

router.post('/write-message', ctrlMessages.postMessage);

router.get('/mail-box-received',helper.authenticated, ctrlMessages.getMailbox);

router.get('/mail-box-sended',helper.authenticated, ctrlMessages.getSended)

module.exports = router;