import express from "express";
const router = express.Router();

//Blog
const { createBlog, GetBlogs, GetBlogBySlug, GetBlogById, UpdateBlog } = require("../Controller/Blog");


//Routes
router.post("/blog/create", createBlog);
router.post("/blogs", GetBlogs);
router.get("/blog/:slug", GetBlogBySlug);
router.post("/blog/by-id", GetBlogById);
router.post("/blog/update", UpdateBlog);


export default router;