import express from "express";
const router = express.Router();

//Blog
const { recentBlog, createBlog, GetBlogs, GetBlogBySlug, GetBlogById, UpdateBlog,DeleteBlog} = require("../Controller/Blog");


//Routes
router.get("/blog/recent",recentBlog);
router.post("/blog/create", createBlog);
router.post("/blogs", GetBlogs);
router.get("/blog/:slug", GetBlogBySlug);
router.post("/blog/by-id", GetBlogById);
router.post("/blog/update", UpdateBlog);
router.post("/blog/delete",DeleteBlog)



export default router;