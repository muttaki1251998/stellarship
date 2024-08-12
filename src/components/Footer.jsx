import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";

const Footer = () => {
  const userData = useSelector((state) => state.user);
  const { firstName, lastName, email, phone, city, country } = userData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/send-contact-email`,
        { ...formData, userEmail: email },
        {
          headers: {
            "x-frontend-id": "orionship",
          },
        }
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      alert("Message sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email");
    }
  };

  return (
    <div className="bg-black py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="p-4">
          <h2 className="text-7xl mb-8">Let Me Support Your Next Move</h2>
          <p className="text-3xl mb-2">
            Tell me where you’re headed, and I’ll help you get there. Backed by
            the Orion brokerage and global real estate leader, I have
            the nation-wide network to support you wherever you are.
          </p>
        </div>
        <div className="sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <p className="text-xl">
                {firstName} {lastName}, Realtor®
              </p>
              <p className="text-xl">
                {city}, {country}
              </p>
              <span className="text-xl">Call: {phone}</span><br />
              <span className="text-xl">Email: {email}</span>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-gray-200">
                  <i className="fab fa-linkedin-in fa-2x"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-200">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block px-4 py-2 w-full text-sm text-black bg-white border border-gray-300 rounded-md"
                    placeholder="Name *"
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block px-4 py-2 w-full text-sm text-black bg-white border border-gray-300 rounded-md"
                    placeholder="Email address *"
                    required
                  />
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block px-4 py-2 w-full text-sm text-black bg-white border border-gray-300 rounded-md"
                    placeholder="Phone number"
                  />
                </div>
                <div className="relative mb-4">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="block px-4 py-2 w-full text-sm text-black bg-white border border-gray-300 rounded-md"
                    rows="4"
                    placeholder="How can I help?"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 border border-white text-white bg-transparent hover:bg-gray-800 rounded-md transition duration-300"
                >
                  <span>Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <p className="text-sm">
              © Copyright 2024 {firstName} {lastName} in association with Orion
              Canva
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;