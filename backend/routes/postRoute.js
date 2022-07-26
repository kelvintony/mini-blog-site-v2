import express from 'express';

const router = express.Router();

//import controllers
import { getPosts, createPost, deletePost, updatePost, getPost, likePost } from '../controllers/post.js';

// , getPost,updatePost, likePost, deletePost

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);
router.get('/:id', getPost);
router.put('/:id/likepost', likePost);

export default router;
