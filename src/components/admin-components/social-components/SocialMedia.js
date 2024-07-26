import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const SocialMedia = () => {
  const router = useRouter();
  const [postContent, setPostContent] = useState("");
  const [status, setStatus] = useState("");
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("photo");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    const FB_APP_ID = process.env.NEXT_PUBLIC_FB_APP_ID;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/facebook/callback`;
    const authUrl = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=public_profile,email,pages_manage_posts,pages_read_engagement`;
    window.location.href = authUrl;
  };

  const handlePost = async () => {
    try {
      const pageAccessToken = pages.find(page => page.id === selectedPage)?.access_token;

      if (!pageAccessToken) {
        setStatus("Error: No page selected or invalid page access token.");
        return;
      }

      const formData = new FormData();
      formData.append('page_access_token', pageAccessToken);
      formData.append('page_id', selectedPage);
      formData.append('message', postContent);
      formData.append('media_type', mediaType);
      if (media) {
        formData.append('media', media);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/facebook/post`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            "x-frontend-id": "orionship",
          },
        }
      );
      setStatus("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      setStatus("Error creating post.");
    }
  };

  // Check for access token and pages in the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const pagesData = urlParams.get("pages");

    if (accessToken && pagesData) {
      localStorage.setItem("fb_access_token", accessToken);
      localStorage.setItem("fb_pages", pagesData);
      setPages(JSON.parse(pagesData));
      setStatus("Logged in successfully!");
      setIsLoggedIn(true);
      router.replace("/admin"); // Ensure we stay on the admin page
    } else {
      const savedAccessToken = localStorage.getItem("fb_access_token");
      const savedPages = localStorage.getItem("fb_pages");

      if (savedAccessToken && savedPages) {
        setPages(JSON.parse(savedPages));
        setStatus("Logged in successfully!");
        setIsLoggedIn(true);
      }
    }
  }, [router]);

  // Retrieve the selected page from localStorage on mount
  useEffect(() => {
    const savedSelectedPage = localStorage.getItem("selected_page");
    if (savedSelectedPage) {
      setSelectedPage(savedSelectedPage);
    }
  }, []);

  // Save the selected page to localStorage when it changes
  useEffect(() => {
    if (selectedPage) {
      localStorage.setItem("selected_page", selectedPage);
    }
  }, [selectedPage]);

  return (
    <div className="container mx-auto p-5 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">Social Media Integration</h1>
      <button
        onClick={!isLoggedIn ? handleLogin : null}
        className={`px-4 py-2 rounded mb-4 ${isLoggedIn ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}
        disabled={isLoggedIn}
      >
        {isLoggedIn ? "Logged In" : "Login with Facebook"}
      </button>
      {pages.length > 0 && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Page
          </label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a page</option>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Post Content
        </label>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Media
        </label>
        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Media Type
        </label>
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="photo">Photo</option>
          <option value="video">Video</option>
        </select>
      </div>
      <button
        onClick={handlePost}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Post
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default SocialMedia;
