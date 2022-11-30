const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

///////////////////////////////Getting HomePage
router.get('/', userController.getHomePage);

router.post('/delete', (req, res)=>{
    res.send("HELLO")
})

module.exports = router;