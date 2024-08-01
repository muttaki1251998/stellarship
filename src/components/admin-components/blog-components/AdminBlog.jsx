import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/solid";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
} from "@/store/blogSlice";
import axios from "axios";

const AdminBlog = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [showChatGPTButton, setShowChatGPTButton] = useState(true);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [headerError, setHeaderError] = useState(false);
  const fileInputRef = useRef(null);
  const contentRef = useRef(null);

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleContentClick = () => {
    setShowChatGPTButton(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (e.target.value !== "") {
      setShowChatGPTButton(true);
    }
  };

  const handleHeaderChange = (e) => {
    setHeader(e.target.value);
    if (e.target.value !== "") {
      setHeaderError(false);
    }
  };

  const wordCount = 200;

  const handleChatGPTClick = async () => {
    if (!header) {
      setHeaderError(true);
    } else {
      let prompt = `Here is the header for a blog post I am trying to write: ${header}.`;
      if (content) {
        prompt += ` I have written this amount of content so far: ${content}. Write me the rest, approximately ${wordCount} words.`;
      } else {
        prompt += ` Write me the content, approximately ${wordCount} words.`;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_BACKEND_API_URL}/openai/generate`, 
          { prompt },
          {
            headers: {
              "x-frontend-id": "orionship",
            }
          }
        );
        setContent(response.data.choices[0].message.content);
      } catch (error) {
        console.error("Error generating content:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      header,
      content,
      image,
    };

    if (editingBlogId) {
      await dispatch(updateBlog({ id: editingBlogId, blogData }));
      setEditingBlogId(null);
    } else {
      await dispatch(createBlog(blogData));
    }
    setImage(null);
    setImagePreview(null);
    setHeader("");
    setContent("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    dispatch(getAllBlogs());
  };

  const handleEditClick = (blog) => {
    setEditingBlogId(blog._id);
    setHeader(blog.header);
    setContent(blog.content);
    setImagePreview(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${blog.picture}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = async (id) => {
    await dispatch(deleteBlog(id));
    dispatch(getAllBlogs());
  };

  const createMarkup = (html) => {
    return { __html: html.replace(/\n/g, "<br />") };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl relative">
        {imagePreview && (
          <div className="relative mb-8">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-96 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-1 hover:bg-gray-800 focus:outline-none"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mx-auto">
          <div className="mb-5">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="header"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Header
            </label>
            <input
              type="text"
              id="header"
              name="header"
              value={header}
              onChange={handleHeaderChange}
              className={`shadow-sm bg-gray-50 border ${
                headerError ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
              required
            />
            {headerError && (
              <p className="text-red-500 text-xs mt-1">
                You need to write a header for AI to generate your content
              </p>
            )}
          </div>
          <div className="mb-5 relative" ref={contentRef}>
            {showChatGPTButton && (
              <button
                type="button"
                className="absolute -top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-blue-600"
                onClick={handleChatGPTClick}
              >
                Use AI to fill your content
              </button>
            )}
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onClick={handleContentClick}
              onChange={handleContentChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              rows="10"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {editingBlogId ? "Update Blog" : "Submit Blog"}
            </button>
          </div>
        </form>

        <div className="mt-8 w-full">
          {blogs.map((blog, idx) => (
            <div
              key={blog._id}
              className="bg-white p-4 rounded-lg shadow-md mb-8 w-full"
            >
              {blog.picture && (
                <img
                  src={blog.picture}
                  alt="Blog"
                  className="w-full h-64 object-cover rounded-lg mb-2"
                />
              )}
              <h2 className="text-lg font-semibold mb-2">{blog.header}</h2>
              <div
                className="text-gray-600 whitespace-pre-wrap"
                dangerouslySetInnerHTML={createMarkup(blog.content)}
              ></div>
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={() => handleEditClick(blog)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;