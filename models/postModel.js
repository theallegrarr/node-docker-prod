const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: [true, 'post must have a body'],
  },
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
