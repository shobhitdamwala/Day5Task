import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { deleteBlog, updateBlog } from "../service/blog.service";
import { Blog } from "../types/blogTypes";

const Blogs = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/api/blogs");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    if (data) {
      setBlogs(data);
    }
  }, [data]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog.");
    }
  };

  const startEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setEditForm({
      title: blog.title,
      content: blog.content,
      author: blog.author,
    });
  };

  const cancelEdit = () => {
    setEditingBlog(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog?._id) return;
    try {
      await updateBlog(editingBlog._id, editForm);
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === editingBlog._id ? { ...b, ...editForm } : b
        )
      );
      setEditingBlog(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update blog.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 text-slate-800">
        <h2 className="text-2xl font-bold text-red-500">Failed to load blogs</h2>
        <p className="mt-2 text-slate-500">Please make sure the backend is running.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.15),_transparent_40%),linear-gradient(135deg,#f8fafc_0%,#f1f5f9_100%)] px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-100/50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 shadow-sm backdrop-blur">
              Latest Updates
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-slate-900">
              The Insight <span className="text-amber-500">Journal</span>
            </h1>
            <p className="mt-3 max-w-xl text-lg leading-8 text-slate-600">
              Discover our latest stories, thoughts, and ideas. A clean and premium reading experience.
            </p>
          </div>
          <Link
            to="/blog/form"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(15,23,42,0.3)] focus:outline-none focus:ring-4 focus:ring-slate-400"
          >
            <span className="relative flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              Create New Post
            </span>
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white/50 py-12 text-center backdrop-blur shadow-sm">
            <div className="mb-4 rounded-full bg-amber-100 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">No blogs found</h3>
            <p className="mt-2 text-slate-500">Get started by creating your first blog post.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <div className="flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button
                        onClick={() => startEdit(blog)}
                        className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="rounded-full bg-red-50 p-2 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold leading-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">
                    {blog.content}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{blog.author}</p>
                    <p className="text-xs text-slate-500">Author</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm transition-all">
          <div className="w-full max-w-lg scale-100 animate-in fade-in zoom-in-95 rounded-[2rem] bg-white p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Edit Blog Post</h2>
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-600 uppercase tracking-widest">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-600 uppercase tracking-widest">Author</label>
                <input
                  type="text"
                  value={editForm.author}
                  onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-600 uppercase tracking-widest">Content</label>
                <textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition"
                  required
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="w-full rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition hover:-translate-y-0.5"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Blogs;