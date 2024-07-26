import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const Footer = () => {
  const userData = useSelector((state) => state.user);
  const { firstName, lastName, email, phone, city, country } = userData;
  return (
    <div className="bg-[#5B6C82] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <p className="text-white text-xl">
              {firstName} {lastName}, Realtor®
            </p>
            <p className="text-white text-xl">
              {city}, {country}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="border border-gray-500 p-4 text-center text-white text-xl">
              <Link href="/contact" passHref legacyBehavior>
                <a>Questions? Contact Me!</a>
              </Link>
            </div>
          </div>
          <div className="space-y-4 text-right">
            <div className="flex justify-end items-center space-x-2 text-white text-xl">
              <p>Made by Orion Canva</p>
            </div>
            <p className="underline text-white text-xl"> orioncanva.com</p>
            <p className="underline text-white text-xl">(647) 394-7851</p>
            <div className="flex justify-end space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <p className="text-sm text-white">
            © Copyright 2024 {firstName} {lastName} in association with Orion
            Canva
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
