const express = require("express");
const router = express.Router();

const newsController = require('../controllers/news');
router.get("/", newsController.getTopNews);

router.get("/news/:id", newsController.getNewsArticle);

module.exports = router;