const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createComment, getComments } = require('../utils/comment');


router.get('/posts/:id/comments', getComments);


router.post('/posts/:id/comments', auth, createComment);

module.exports = router;
