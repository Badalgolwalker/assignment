const express = require('express');
const { issue,returned,issueStatus,totalrent,daterange } = require('../controller/transactioncontroller');
const router = express.Router();

router.post("/issue",issue)
router.post("/return",returned)

router.get("/issueStatus/:id",issueStatus)

router.get("/totalrent/:id",totalrent)

router.get("/daterange",daterange)

module.exports = router