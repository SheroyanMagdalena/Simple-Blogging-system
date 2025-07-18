const Comment = require('../models/comment');


const createComment = async (req, res) => {
  try {
    const { text, parent } = req.body;

    const comment = await Comment.create({
      post: req.params.id,
      author: req.user.id,
      text,
      parent: parent || null
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ msg: 'Comment failed', error: err.message });
  }
};


const buildTree = (comments, parentId = null) => {
  return comments
    .filter(c => String(c.parent) === String(parentId))
    .map(c => ({
      ...c.toObject(),
      children: buildTree(comments, c._id)
    }));
};


const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .sort({ createdAt: 1 })
      .populate('author', 'username email');

    const nested = buildTree(comments);
    res.json(nested);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};

module.exports = { createComment, getComments };
