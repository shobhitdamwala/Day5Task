import Blog from "../models/blogSchema.js";
import { verifyRecaptchaToken } from "../utils/verifyRecaptcha.js";

export const addBlog = async (req, res) => {
    try {
        const { title, content, author, captchaToken } = req.body;
        if(!title || !content || !author) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!captchaToken) {
            return res.status(400).json({ message: "reCAPTCHA token is required" });
        }

        const recaptchaResult = await verifyRecaptchaToken(captchaToken, req.ip);

        if (!recaptchaResult.success) {
            return res.status(400).json({
                message: "reCAPTCHA verification failed",
                errors: recaptchaResult["error-codes"] || [],
            });
        }

        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {   
        console.error("Error creating blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }   
        res.status(200).json(blog);
    } catch (error) {       
        console.error("Error fetching blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
};

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, author }, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }   
        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
};
