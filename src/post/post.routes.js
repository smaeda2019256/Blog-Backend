import express from "express";
import { addComment, createPost, deletePost, showPost, showSinglePost, updatePost } from "./post.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post('/post/create', isAuthenticated, isAdmin, createPost); 
router.get('/posts/show', showPost);
router.get('/post/:id', showSinglePost);
router.delete('/delete/post/:id', isAuthenticated, isAdmin, deletePost);
router.put('/update/post/:id', isAuthenticated, isAdmin, updatePost);
router.put('/comment/post/:id', isAuthenticated, addComment);


export default router;