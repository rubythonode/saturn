'use strict';
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    // allow for everyone
    let STAT = req.user.check();
    if (STAT === 'DENIED') return;
    else res.send({status: STAT});
});

module.exports = router;