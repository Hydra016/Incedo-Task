const express = require("express");
const router = express.Router();
const { getArtists } = require("../controllers/artistsController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/search", verifyToken, getArtists);

module.exports = router;
