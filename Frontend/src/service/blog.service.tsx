import API from "../lib/axios/axiosInstance";
import { Blog, CreateBlogPayload } from "../types/blogTypes";


export const createBlog = async (blogData: CreateBlogPayload) =>{
    const response = await API.post("/blogs",blogData);
    return response.data;
} 

export const getBlogs = async () =>{
    const response = await API.get("/blogs");
    return response.data;
}

export const updateBlog = async (id: string, blogData: Partial<Blog>) => {
    const response = await API.put(`/blogs/${id}`, blogData);
    return response.data;
}

export const deleteBlog = async (id: string) => {
    const response = await API.delete(`/blogs/${id}`);
    return response.data;
}
