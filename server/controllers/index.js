const createError = require('http-errors');
const Comment = require('../models/CommentModel');
const News = require('../models/NewsModel');
const ObjectId = require("mongoose").Types.ObjectId;

/**
 * GET /
 * returns last 10 news records from db
 */
exports.getTopNews = async (req, res, next) => {
    try {
        const latestNews = await News.find()
            .sort({time: -1})
            .limit(10)
        res.status(200).send(latestNews);
    } catch (err) {
        next(createError(500, err.message));
    }
}

exports.getNewsArticle = async (req, res, next) => {
   try {
    if (!ObjectId.isValid(req.params.id)) {
        return next(createError(400, "Invalid Id"));
    }
    const news = await News.findById(req.params.id);
    let responseObj = {}
    if (news){
       const comments = await Comment.find({parent: news.hn_id});
       responseObj.comments = comments;
    } else {
        return next(createError(400, "News Article Not Found"));
    }
    responseObj.news = news;
    res.status(200).send(responseObj);
   } catch (err) {
       next(createError(500, err.message));
   }
}