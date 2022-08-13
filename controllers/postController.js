const PostModel = require('../models/postModel')

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find()

    res.status(200).json({
      message: 'Posts fetched successfully',
      results: posts.length,
      data: {
        posts: posts,
      },
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Fetching posts failed',
      data: {
        error: e,
      },
    })
  }
}

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id)

    res.status(200).json({
      message: 'Post fetched successfully',
      data: {
        post: post,
      },
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Fetching post failed',
      data: {
        error: e,
      },
    })
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const post = await PostModel.create(req.body)

    res.status(201).json({
      message: 'Post created successfully',
      data: {
        post: post,
      },
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Creating post failed',
      data: {
        error: e,
      },
    })
  }
}

exports.updatePost = async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      message: 'Post updated successfully',
      data: {
        post: post,
      },
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Updating post failed',
      data: {
        error: e,
      },
    })
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: 'Post deleted successfully',
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Deleting post failed',
      data: {
        error: e,
      },
    })
  }
}
