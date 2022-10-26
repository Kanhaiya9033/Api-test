const router = require('express').Router();
const { list } = require('../controller/userMangement');
const { verifyToken } = require('../middleWare/adminAuth');


router.get('/userList',verifyToken,list)
module.exports= router;