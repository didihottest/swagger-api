const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')


router.post('/post', postController.CreatePost)
router.get('/post', postController.GetPost)

module.exports = router