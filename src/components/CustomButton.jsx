import Link from "next/link";

const CustomButton = ({ text, link }) => {
  return (
    <Link href={`/${link}`} legacyBehavior>
      <a className="relative inline-block px-5 py-3 font-medium text-xl text-white bg-[rgba(120,138,155,0.6)] rounded-lg shadow-lh group focus:outline-none  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:bg-[#788A9B] transition-all duration-500 ease-in-out">
        {text}
        <span className="ml-2 inline-block transform rotate-60 group-hover:rotate-0 transition-transform duration-300">
          ➔
        </span>
      </a>
    </Link>
  );
};

export default CustomButton;
