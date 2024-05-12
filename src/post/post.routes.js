import express from "express";
import { createPost } from "./post.controller";
import { isAdmin, isAuthenticated } from "../middlewares/auth";
const router = express.Router();

router.post('/post/create', isAuthenticated, isAdmin, createPost); 

export default router;