import express from "express";
import { createPost, showPost, showSinglePost } from "./post.controller.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post('/post/create', isAuthenticated, isAdmin, createPost); 
router.get('/posts/show', showPost);
router.get('/post/:id', showSinglePost);

export default router;