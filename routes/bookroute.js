const express = require("express");
const router = express.Router();

const {addbook,allbook,singlebook,updatebook,deletebook} = require("../controller/bookController");


router.post("/addbook",addbook)

router.get("/allbook",allbook)

router.get("/singlebook/:id",singlebook)

router.post("/update/:id",updatebook)
router.get("/delete/:id",deletebook)



module.exports = router