const { User, Post } = require('../models')


const CreatePost = async (req, res) => {
  const { user_uuid, title, content } = req.body

  try {
    const user = await User.findOne({ where: { uuid: user_uuid } })

    const post = await Post.create({ title, content, user_uuid: user.uuid })

    return res.status(201).json({
      message: "Post Successfully Created",
      data: post
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message
    })
  }
}

const GetPost = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: 'user' })

    return res.json({
      message: "Posts Successfully Found",
      data: posts
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message
    })
  }
}


module.exports = {
  CreatePost,
  GetPost
}