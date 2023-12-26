import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  blogPhotoController,
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getSingleBlog,
  getUserBlog,
  updateBlogController,
} from "../controllers/blogController.js";
import formidable from "express-formidable";

//router object
const router = express.Router();

//create blog
router.post("/createblog", requireSignIn, formidable(), createBlogController);

//get all blogs
router.get("/allblogs", getAllBlogsController);

//get single blog
router.get("/singleBlog/:slug", getSingleBlog);

//get user's blog
router.get("/myblogs/:id", requireSignIn, getUserBlog);

//get blog photo
router.get("/photo/:id", blogPhotoController);

//update blog
router.put(
  "/updateblog/:id",
  requireSignIn,
  formidable(),
  updateBlogController
);

//delete blog
router.delete("/deleteblog/:id", requireSignIn, deleteBlogController);

export default router;
