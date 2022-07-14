const cron = require('node-cron');
const axios = require('axios').default;
const News = require('../models/NewsModel');
const Comment = require('../models/CommentModel');


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
            //build news obj
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
                console.log("created new entry in news table");
            } else {
                console.log(`${id} News Already exists or is dead`);
            }
            //fetch comments
            if (kids && kids.length != 0){
                await fetchComments(kids);
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

            if(!exists && id && text != "") {
                const comment = new Comment(commentFields);
                const savedComment = await comment.save();
                console.log("created new entry in comments table");
            } else {
                console.log(`${id} Comment Already exists or is empty`);
            }
        }

    } catch (err) {
        console.log(err.message);
    }
}

//run background task every hour
module.exports = () => {
    cron.schedule('0 0 */1 * * *', async () => {
        let topStoriesId = await fetchTopStories();
        await fetchStoryDetails(topStoriesId);
    });
}