import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getAllBlogs } from "@/store/blogSlice";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import Footer from "../../components/Footer";
import axios from "axios";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (blogs.length > 0) {
      fetchImages();
    }
  }, [blogs]);

  const fetchImages = () => {
    blogs.forEach((blog, idx) => {
      fetchImage(blog.picture, idx);
    });
  };

  const fetchImage = async (imagePath, idx) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images/${imagePath}`, {
        responseType: 'blob',
        headers: {
          "x-frontend-id": "orionship",
        }
      });
      const imageUrl = URL.createObjectURL(response.data);
      setImageURLs((prevState) => ({
        ...prevState,
        [idx]: imageUrl,
      }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-[#ffffff] min-h-screen flex flex-col"
      >
        <div className="container mx-auto max-w-7xl px-4 flex-grow">
          <h1 className="text-center text-black font-poppins text-7xl mb-6 mt-48">
            All Blogs
          </h1>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
            {blogs.map((blog, blogIndex) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: blogIndex * 0.2 }}
                className="w-full max-w-lg h-128 bg-[#2a3c3a] shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden group"
              >
                <Link href={`/blog/${blog._id}`} legacyBehavior>
                  <a>
                    {imageURLs[blogIndex] && (
                      <div className="h-64 w-full overflow-hidden">
                        <Image
                          alt="Blog Image"
                          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                          src={imageURLs[blogIndex]}
                          style={{ borderRadius: 0 }} // Ensure the image is not rounded
                        />
                      </div>
                    )}
                    <div className="p-5 h-48">
                      <h5 className="mb-2 text-2xl tracking-tight text-gray-100 dark:text-white">
                        {blog.header}
                      </h5>
                      <p className="mb-3 font-normal text-white dark:text-white">
                        {blog.content.length > 300
                          ? `${blog.content.substring(0, 300)}...`
                          : blog.content}
                      </p>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default AllBlogs;
