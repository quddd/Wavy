const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    hn_id: {
        type: Number,
        required: true,
        unique: true,
    },
    by: {
        type: String
    },
    time: {
        type: Number
    },
    text: {
        type: String
    },
    dead: {
        type: Boolean
    },
    parent: {
        type: Number
    },
    kids: {
        type: [Number]
    },
    url: {
        type: String
    },
    score: {
        type: Number
    },
    title: {
        type: String
    },
    parts: {
        type: String
    },
    descendants: {
        type: Number
    }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;




