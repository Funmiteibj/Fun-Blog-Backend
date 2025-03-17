const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    //define field and characteristics
    title: {
        type: String,
        required: true,
        unique:true
    },
    content:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        default: "User Author"
    },
    category: String,
    postDate: {
        type: Date,
        default: Date.now
    },
    tags: [String],
    likes: {
        type: Number,
        default: 0
    }
});

//export model

module.exports = mongoose.model('Post', PostSchema);