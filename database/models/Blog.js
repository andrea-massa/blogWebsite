const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    text: {
        type: String
    }
})

const Blog = new mongoose.model('blog', blogSchema);





module.exports = Blog;