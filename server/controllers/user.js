const createError = require('http-errors');
const Users = require('../models/UserModel');
const News = require('../models/NewsModel');

exports.getUserStories = async (req, res, next) => {
    try {
        const userData = await Users.findOne({hn_id: req.params.id});

        if (!userData){
            return next(createError(400, 'User does not exist'));
        }

        const userStories = await News.find({by: req.params.id});

        res.status(200).send({
            user: userData,
            stories: userStories
        });

    } catch (err) {
        createError(500, err.message);
    }
}