const mongoose = require('mongoose');

const todolistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Todolist = mongoose.model('Todolist', todolistSchema);

module.exports = Todolist;
