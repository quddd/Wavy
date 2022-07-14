const express = require("express");
const router = express.Router();

const userController = require('../controllers/user');
router.get("/:id", userController.getUserStories);


module.exports = router;