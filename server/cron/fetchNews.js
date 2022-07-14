const cron = require('node-cron');
const axios = require('axios').default;
const News = require('../models/NewsModel');
const Comment = require('../models/CommentModel');
const Users = require('../models/UserModel');

const fetchTopStories = async () => {
    try {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=10`);
        return response.data;
    } catch(err){
        console.log(err.message);
    }
}

const fetchStoryDetails = async (topStories) => {
    try {
        for (let story of topStories){
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`);
            const {id, by, time, text, dead, parent, kids, url, title, parts, descendants} = response.data;
            const newsFields = {};
            //build news object
            if (id) newsFields.hn_id = id;
            if (by) newsFields.by = by;
            if (time) newsFields.time = time;
            if (text) newsFields.text = text;
            if (parent) newsFields.parent = parent;
            if (kids) newsFields.kids = kids;
            if (url) newsFields.url = url;
            if (title) newsFields.title = title;
            if (parts) newsFields.parts = parts;
            if (descendants) newsFields.descendants = descendants;
            
            //check if news record already exists in db
            let exists = await News.exists({hn_id: id});

            if(!exists && id && !dead) {
                const news = new News(newsFields);
                const savedNews = await news.save();
            } 
            //fetch comments
            if (kids && kids.length != 0){
                const existingComments = await Comment.find({parent: id }).select({"hn_id": 1, _id: 0});
                let existingCommentsIds = existingComments.map(a => a.hn_id);
                let commentsTofetch = kids.filter(item => !existingCommentsIds.includes(item));
                await fetchComments(commentsTofetch);

                //update kids and descendants
                const updatedNews = await News.findOneAndUpdate(
                    {hn_id: id},
                    {$set: {kids: kids, descendants: descendants}},
                    {new: true}
                );
            }
            //create user if user doesn't exist
            const userExists = await Users.exists({hn_id: by});
            if (!userExists) {
                await createUser(by);
            }

        };
    } catch (err) {
        console.log(err.message);
    }
}

const fetchComments = async (kids) => {
    try {
        for (let kid of kids) {
            const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`);
            const {id, by, time, parent, kids, text} = response.data;
            const commentFields = {};
            //build comment obj
            if (id) commentFields.hn_id = id;
            if (by) commentFields.by = by;
            if (time) commentFields.time = time;
            if (text) commentFields.text = text;
            if (parent) commentFields.parent = parent;
            if (kids) commentFields.kids = kids;

            //check if comment record already exists in db
            let exists = await Comment.exists({hn_id: id});

            //create new entry for comment if it doesn't exit
            //else check if more replies have been added
            if(!exists && id && text != "") {
                const comment = new Comment(commentFields);
                const savedComment = await comment.save();
            } else {
                const commentDetails = await Comment.findOne({hn_id: id}).select({"kids": 1});
                if (commentDetails.kids != kids) {
                    const updatedComments = await Comment.findOneAndUpdate(
                        {hn_id: id},
                        {$set: {kids: kids}},
                        {new: true}
                    );
                }
            }
        }

    } catch (err) {
        console.log(err.message);
    }
}
const createUser = async (userid) => {
    try  {
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${userid}.json?print=pretty`);
    const {id, created, karma, about} = response.data;

    const userFields = {};
    //build user obj
    if (id) userFields.hn_id = id;
    if (created) userFields.created = created;
    if (karma) userFields.karma = karma;
    if (about) userFields.about = about;

    const user = new Users(userFields);
    const savedUser = await user.save();
    } catch (err) {
        console.log(err.message);
    }
}

//run background task every hour
module.exports = () => {
    cron.schedule('0 0 */1 * * *', async () => {
        console.log('Background process started');
        let topStoriesId = await fetchTopStories();
        await fetchStoryDetails(topStoriesId);
        console.log('Backgorund process ended');
    });
}