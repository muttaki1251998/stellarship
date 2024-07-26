import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpinnerIcon from './IconComponents/SpinnerIcon';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';

export default function CustomNavbar() {
  const [scroll, setScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = useSelector(state => state.user);
  const { firstName, lastName, email, phone } = userData;

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 160 || document.documentElement.scrollTop > 160) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    document.body.addEventListener('scroll', handleScroll);
    document.documentElement.addEventListener('scroll', handleScroll);

    return () => {
      document.body.removeEventListener('scroll', handleScroll);
      document.documentElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${
        scroll ? 'bg-[#5a6c82] h-16' : 'bg-[#35475C] bg-opacity-50 h-32'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href={`/`} legacyBehavior>
            <a className="flex-shrink-0 flex items-center space-x-2">
              <SpinnerIcon width={scroll ? '60' : '100'} height={scroll ? '60' : '100'} arrowColor="white" textColor="white" />
              <div>
                <h1 className="text-white text-2xl">{firstName.toUpperCase()} {lastName.toUpperCase()}</h1>
                <h2 className="text-white text-sm">IN TORONTO</h2>
              </div>
            </a>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/contact" className="text-white hover:text-gray-300">
                Reach Out
              </a>
              <a href={`tel:${phone}`} className="text-white hover:text-gray-300">
                {phone}
              </a>
              <a href={`mailto:${email}`} className="text-white hover:text-gray-300">
                {email}
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-gray-300">
              MENU
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#5B6C82]"
          >
            <div className="py-3">
              <span className="px-4 block text-xl text-white dark:text-white">{firstName} {lastName}</span>
            </div>
            <ul className="py-2">
              <li>
                <a href="/contact" className="block px-4 py-2 text-lg text-white dark:text-gray-200">Reach Out</a>
              </li>
              <li>
                <a href={`tel:${phone}`} className="block px-4 py-2 text-lg text-white dark:text-gray-200">{phone}</a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="block px-4 py-2 text-lg text-white dark:text-gray-200">{email}</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`border-b-2 ${scroll ? 'border-white' : 'border-white'}`}></div>
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 space-y-4 flex flex-col items-center mr-4">
        <SocialIcon url="https://www.facebook.com" bgColor="black" network="facebook" style={{ height: 40, width: 40 }} className="transition-transform transform hover:scale-110" />
        <SocialIcon url="https://www.instagram.com" bgColor="black" network="instagram" style={{ height: 40, width: 40 }} className="transition-transform transform hover:scale-110" />
        <SocialIcon url="https://www.twitter.com" bgColor="black" network="twitter" style={{ height: 40, width: 40 }} className="transition-transform transform hover:scale-110" />
      </div>
    </nav>
  );
}
