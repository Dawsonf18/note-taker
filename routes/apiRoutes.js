// CREATE (get), READ (post), UPDATE (put), DELETE (delete) => CRUD


// ==========
// DEPENDENCIES
// ==========

const router = require("express").Router();
const store = require("./../db/store");

// ==========
// ROUTES
// ==========

router.get("/notes", function (req, res) {
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
});