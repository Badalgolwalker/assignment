const express =  require('express');
const { user,register, login, logout, alluser, singleuser, updateuser,deleteuser } = require('../controller/userController');

const router = express.Router();

const usermolde = require('../models/usermolde');




router.get('/', user)

router.post('/register',register)

router.get("/alluser",alluser)

router.get("/singleuser/:id",singleuser)

router.post("/update/:id",updateuser)
router.get("/delete/:id",deleteuser)


module.exports = router