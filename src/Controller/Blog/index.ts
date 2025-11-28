import { Request, Response } from "express";
const Blog = require("../Module/blog");
import { validateRequiredFields } from "../../Util/validate"

export const createBlog = async (req: Request, res: Response) => {
  try {
    const requiredFields = [
      "title",
      "Slug",
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

    const data = new Blog(req.body);
    await data.save();

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