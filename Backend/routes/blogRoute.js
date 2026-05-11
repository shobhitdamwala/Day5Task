import express from "express";
import { addBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../controller/blogController.js";


const router = express.Router();

router.get("/", getBlogs);
router.post("/", addBlog);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;