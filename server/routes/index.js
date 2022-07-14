const express = require("express");
const router = express.Router();

const indexController = require('../controllers/index');
router.get("/", indexController.getTopNews);

router.get("/news/:id", indexController.getNewsArticle);

module.exports = router;