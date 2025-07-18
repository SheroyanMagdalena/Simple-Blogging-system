const Post = require('../models/post');

const createPost = async (req, res) => {
  try {
    const { title, body, tags, categories } = req.body;
    const post = await Post.create({
      title,
      body,
      tags,
      categories,
      author: req.user.id
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Create failed', error: err.message });
  }
};


const getPosts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.categories = req.query.category;
    if (req.query.tag) filter.tags = req.query.tag;

    const posts = await Post.find(filter).populate('author', 'username email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};


const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Fetch failed', error: err.message });
  }
};


const updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      req.body,
      { new: true }
    );
    if (!post) return res.status(404).json({ msg: 'Not found or unauthorized' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Update failed', error: err.message });
  }
};


const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    if (!post) return res.status(404).json({ msg: 'Not found or unauthorized' });
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Delete failed', error: err.message });
  }
};


const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const userId = req.user.id;

    
    post.dislikes = post.dislikes.filter(id => id.toString() !== userId);

    
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes.length, dislikes: post.dislikes.length });
  } catch (err) {
    res.status(500).json({ msg: 'Like failed', error: err.message });
  }
};


const dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const userId = req.user.id;

    post.likes = post.likes.filter(id => id.toString() !== userId);


    if (post.dislikes.includes(userId)) {
      post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
    } else {
      post.dislikes.push(userId);
    }

    await post.save();
    res.json({ likes: post.likes.length, dislikes: post.dislikes.length });
  } catch (err) {
    res.status(500).json({ msg: 'Dislike failed', error: err.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  dislikePost
};
