const path = require("path");
const router = require("express").Router();

//HTML GET Requests
//code below is for when a user visits a page 

router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));

});

router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));

});

module.exports = router; 