import { Request, Response } from "express";
const Blog = require("../../Module/Blog");
import { validateRequiredFields } from "../../Util/validate"

export const createBlog = async (req: Request, res: Response) => {
  try {
    const requiredFields = [
      "title",
      "slug",
      "imageUrl",
      "metaTitle",
      "metaDescription",
      "category",
      "blogText",
    ];

    const { isValid, message } = validateRequiredFields(
      req.body,
      requiredFields
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message,
      });
    }
    console.log("Body", req.body)
    const data = new Blog(req.body);
    await data.save();
    console.log(data)

    res.status(201).json({ success: true, blog: data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

export const GetBlogs = async (req: Request, res: Response) => {
  try {
    const requiredFields = [
      "pageNumber",
      "reslimit"
    ];

    const { isValid, message } = validateRequiredFields(
      req.body,
      requiredFields
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    const { pageNumber, reslimit } = req.body;

    const page = Math.max(Number(pageNumber) || 1, 1);
    const limit = Math.max(Number(reslimit) || 10, 1);
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments();

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        totalData: totalBlogs,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

export const GetBlogBySlug = async (req: Request, res: Response) => {
  try {
    const requiredFields = [
      "slug",
    ];

    const { isValid, message } = validateRequiredFields(
      req.params,
      requiredFields
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message,
      });
    }
    const blog = await Blog.findOne({ Slug: req.params.slug });
    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

export const GetBlogById = async (req: Request, res: Response) => {
  try {
    const requiredFields = [
      "id",
    ];

    const { isValid, message } = validateRequiredFields(
      req.body,
      requiredFields
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    const blog = await Blog.findById(req.body.id);
    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: error });
  }
};

export const UpdateBlog = async (req: Request, res: Response) => {
  try {
    const requiredFields = [
      "id",
    ];

    const { isValid, message } = validateRequiredFields(
      req.body,
      requiredFields
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message,
      });
    }

    const updateBlog = await Blog.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    if (!updateBlog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(updateBlog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const DeleteBlog = async (req: Request, res: Response) => {
  try {
    const requiredFields = [
      "id",
    ];

    const { isValid, message } = validateRequiredFields(
      req.body,
      requiredFields
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message,
      });
    }
    const blog = await Blog.findByIdAndDelete(req.body.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(204).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const RecentBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();     
    res.status(200).json({
      success: true,
      data: blogs,
      message:"data from backend blog"
    });
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};