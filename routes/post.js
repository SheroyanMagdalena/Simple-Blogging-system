const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  dislikePost
} = require('../utils/post');


router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);


router.post('/posts', auth, createPost);
router.put('/posts/:id', auth, updatePost);
router.delete('/posts/:id', auth, deletePost);

router.post('/posts/:id/like', auth, likePost);
router.post('/posts/:id/dislike', auth, dislikePost);

module.exports = router;
