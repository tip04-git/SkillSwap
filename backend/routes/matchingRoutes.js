const express = require("express");
const router = express.Router();

router.post("/match", (req, res) => {
    // Your matching logic here
    res.send("POST request to /match is working!");
});

module.exports = router;
