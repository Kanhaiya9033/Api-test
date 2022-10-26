const router = require('express').Router();
const { signup, login } = require('../controller/userController');


router.post('/signUp',signup);
router.post('/login',login);

module.exports = router;
