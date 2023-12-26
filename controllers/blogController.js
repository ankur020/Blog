import slugify from "slugify";
import fs from "fs";
import { Blog } from "../models/blogModel.js";

export const createBlogController = async (req, res) => {
  try {
    const { title, summary, content } = req.fields;
    const { photo } = req.files;

    if (!title) return res.status(500).send({ message: "Title is required!" });
    if (!summary)
      return res.status(500).send({ message: "Summary is required!" });
    if (!content)
      return res.status(500).send({ message: "Content is required!" });

    if (photo && photo.size > 1000000) {
      return res.status(500).send({
        message: "Photo is required and should be less than 1MB",
      });
    }

    const blog = new Blog({
      ...req.fields,
      slug: slugify(title),
      author: req.user._id,
    });
    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }

    await blog.save();
    res.status(200).send({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating blog",
      error: error.message,
    });
  }
};

export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await Blog.find({}).select("-photo").sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      totalCount: blogs.length,
      message: "All Blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot get all blogs",
      error: error.message,
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).select("-photo");

    res.status(200).send({
      success: true,
      message: "Single Blog!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error in single blog",
      error,
    });
  }
};

export const getUserBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.id })
      .select("-photo")
      .sort({ createdAt: -1 });

    if (!blogs)
      return res.status(200).send({
        success: true,
        message: "No blogs! Write Some",
      });

    res.status(200).send({
      success: true,
      totalCount: blogs.length,
      message: "Your Blogs",
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching user's blogs",
      error: error.message,
    });
  }
};

export const blogPhotoController = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select("photo");
    if (blog.photo.data) {
      res.set("Content-type", blog.photo.contentType);
      return res.status(200).send(blog.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error while getting photo",
      error: error.message,
    });
  }
};

export const deleteBlogController = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Blog",
      error: error.message,
    });
  }
};

export const updateBlogController = async (req, res) => {
  try {
    const { title, summary, content } = req.fields;
    const { photo } = req.files;

    if (!title) return res.status(500).send({ message: "Title is required!" });
    if (!summary)
      return res.status(500).send({ message: "Summary is required!" });
    if (!content)
      return res.status(500).send({ message: "Content is required!" });

    if (photo && photo.size > 1000000) {
      return res.status(500).send({
        message: "Photo is required and should be less than 1MB",
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        slug: slugify(title),
      },
      { new: true }
    );
    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }
    await blog.save();
    res.status(200).send({
      success: true,
      message: "Blog Updated Successfully!!",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({
        success: false,
        message: "Error while Updating blog",
        error: error.message,
      });
  }
};
