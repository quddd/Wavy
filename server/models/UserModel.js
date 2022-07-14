const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    hn_id: {
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: Number
    },
    karma: {
        type: Number
    },
    about: {
        type: String
    }
})

const User = mongoose.model("Users", userSchema);

module.exports = User;