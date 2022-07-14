const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    hn_id: {
        type: Number,
        required: true,
        unique: true
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
    parent: {
        type: Number
    },
    kids: {
        type: [Number]
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;