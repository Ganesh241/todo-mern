const express=require('express');
const {register}=require('../controllers/userController');
const {login}=require('../controllers/userController')

const router=express.Router();

router.post('/register',register);
router.post('/login', login);

module.exports=router;