const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

///////////////////////////////Getting HomePage
router.get('/', userController.getHomePage);

router.post('/delete', (req, res)=>{
    res.send("HELLO")
});

router.get('/create', userController.getMessageForm);

router.post('/message', userController.postMessage);

router.get('/membership', userController.getMembershipForm);

router.post('/membership', userController.updateMembership);

router.post('/delete/:id', userController.deleteMessage)

router.get('/logout', userController.logoutUser)

module.exports = router;