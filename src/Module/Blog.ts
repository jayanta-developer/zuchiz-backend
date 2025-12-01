import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    date: String,
    category: {
      type: String,
      required: true,
    },
    blogText: [
      {
        title: {
          type: String,
          required: true,
        },
        summarys: [{ summary: String }],
        imageUrl: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
