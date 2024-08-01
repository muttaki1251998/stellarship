import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "@/store/blogSlice";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import CustomButton from "./CustomButton";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const featuredBlogs = blogs.slice(0, 2);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 1 },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  return (
    <div className="flex flex-col bg-[#ffffff] py-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-7xl text-center justify-center text-black mb-8 ml-3"
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={textVariants}
        >
          My Blogs
        </motion.h1>
        <div className="flex flex-wrap items-center justify-center gap-16">
          {featuredBlogs.map((blog, blogIndex) => (
            <Link key={blog._id} href={`/blog/${blog._id}`} legacyBehavior>
              <a className="w-full max-w-lg h-128 bg-[#5B6C82] shadow rounded-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden group">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: blogIndex * 0.2 }}
                >
                  {blog.picture && (
                    <div className="h-64 w-full overflow-hidden">
                      <Image
                        alt="Blog Image"
                        className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                        src={blog.picture}
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
                </motion.div>
              </a>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <CustomButton text={"See All My Blogs"} link={"blog/blogs"} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
