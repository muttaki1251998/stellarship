import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getAllBlogs } from "@/store/blogSlice";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import axios from "axios";

const BlogPost = ({ initialBlog }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  // Fetch blogs from Redux store (if updated on the client side)
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    if (id) {
      dispatch(getAllBlogs());
    }
  }, [dispatch, id]);

  // Find blog in Redux store, fallback to initialBlog if not found
  const blog = blogs.find((b) => b._id === id) || initialBlog;

  if (!blog) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="relative w-full min-h-screen bg-[#ffffff] flex flex-col items-center pt-24">
      {blog.picture && (
        <motion.div
          className="container mt-32 flex flex-col items-center w-full max-w-5xl px-4 space-y-8 text-black"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            alt="Blog Image"
            src={blog.picture}
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full"
            style={{ borderRadius: 0 }}
          />
        </motion.div>
      )}
      <div className="max-w-5xl mx-auto px-4 py-12 text-black">
        <motion.h1
          className="text-7xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {blog.header}
        </motion.h1>
        <motion.div
          className="prose prose-lg prose-invert max-w-none text-black leading-relaxed text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {blog.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`, {
    headers: {
      "x-frontend-id": "orionship",
    }
  });
  const blogs = response.data;
  const blog = blogs.find((b) => b._id === id);

  return {
    props: {
      initialBlog: blog || null,
    },
  };
}

export default BlogPost;
