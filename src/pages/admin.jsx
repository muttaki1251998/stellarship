import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import HomeComponents from "../components/admin-components/HomeComponents";
import UploadListing from "../components/admin-components/new-listing/UploadListing";
import ShowListingsToAdmin from "../components/admin-components/new-listing/ShowListingsToAdmin";
import ShowSoldListing from "../components/admin-components/sold-listing/ShowSoldListing";
import UploadSoldListing from "../components/admin-components/sold-listing/UploadSoldListing";
import LoadingIndicator from "../components/LoadingIndicator";
import { fetchListings } from "../store/listingSlice";
import { fetchSoldListings } from "../store/soldListingSlice";
import { getAllReviews } from "../store/reviewSlice";
import { logout } from "../store/authSlice";
import AdminReviews from "../components/admin-components/AdminReviews";
import AdminBlog from "../components/admin-components/blog-components/AdminBlog";
import SocialMedia from "../components/admin-components/social-components/SocialMedia";
import Inbox from "../components/admin-components/contact-components/Inbox"; // Import Inbox component
import Contacts from "../components/admin-components/contact-components/Contacts";

const AdminPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const listings = useSelector((state) => state.listing);
  const soldListings = useSelector((state) => state.soldListing);
  const reviews = useSelector((state) => state.reviews.reviews);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [reviewList, setReviewList] = useState([]);
  const [activeComponent, setActiveComponent] = useState("profile");
  const [contactSubComponent, setContactSubComponent] = useState("contactForm");

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleListingUploaded = () => {
    dispatch(fetchListings());
  };

  const handleSoldListingUploaded = () => {
    dispatch(fetchSoldListings());
  };

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else {
      Promise.all([
        dispatch(fetchListings()),
        dispatch(fetchSoldListings()),
        dispatch(getAllReviews()),
      ]).then(() => setLoading(false));
    }
  }, [dispatch, user, router]);

  useEffect(() => {
    if (reviews.length > 0) {
      setReviewList(reviews);
    }
  }, [reviews]);

  if (!user || loading) {
    return <LoadingIndicator />;
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <div>Dashboard Component</div>; // Replace this with the actual Dashboard component
      case "profile":
        return <HomeComponents />;
      case "listings":
        return (
          <>
            <UploadListing onListingUploaded={handleListingUploaded} />
            <ShowListingsToAdmin listings={listings} />
          </>
        );
      case "soldListings":
        return (
          <>
            <UploadSoldListing
              onSoldListingUploaded={handleSoldListingUploaded}
            />
            <ShowSoldListing soldListings={soldListings} />
          </>
        );
      case "reviews":
        return <AdminReviews reviews={reviewList} setReviews={setReviewList} />;
      case "blog":
        return <AdminBlog />;
      case "socialMedia":
        return <SocialMedia />;
      case "inbox":
        return <Inbox />;
        case "contacts":
          return <Contacts />;
      default:
        return <HomeComponents />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-[#1D2334] p-4 z-50 transition-transform">
        <a
          href="#"
          className="flex items-center pb-4 border-b border-b-gray-800"
        >
          <h2 className="text-white text-2xl">ADMIN</h2>
        </a>
        <ul className="mt-4">
          <li className="mb-1 group">
            <button
              onClick={() => setActiveComponent("dashboard")}
              className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left"
            >
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Dashboard</span>
            </button>
          </li>
          <li className="mb-1 group">
            <button
              onClick={() => setActiveComponent("profile")}
              className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left"
            >
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Profile</span>
            </button>
          </li>
          <li className="mb-1 group">
            <button
              onClick={() => setActiveComponent("listings")}
              className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left"
            >
              <i className="bx bx-user mr-3 text-lg"></i>
              <span className="text-sm">Listings</span>
            </button>
          </li>
          <li className="mb-1 group">
            <button
              onClick={() => setActiveComponent("soldListings")}
              className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left"
            >
              <i className="bx bx-list-ul mr-3 text-lg"></i>
              <span className="text-sm">Sold Listings</span>
            </button>
          </li>
          <li className="mb-1 group">
            <button
              onClick={() => setActiveComponent("reviews")}
              className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left"
            >
              <i className="bx bx-star mr-3 text-lg"></i>
              <span className="text-sm">Reviews</span>
            </button>
          </li>
          <li className="mb-1 group">
            <button
              onClick={() => setActiveComponent("blog")}
              className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left"
            >
              <i className="bx bx-pencil mr-3 text-lg"></i>
              <span className="text-sm">Blog</span>
            </button>
          </li>
          <li className="mb-1 group">
            <button
              onClick={() => setActiveComponent("socialMedia")}
              className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left"
            >
              <i className="bx bx-share-alt mr-3 text-lg"></i>
              <span className="text-sm">Social Media</span>
            </button>
          </li>
          <li className="mb-1 group">
            {" "}
            {/* Add Inbox button */}
            <button
              onClick={() => {
                setActiveComponent("inbox");
              }}
              className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left"
            >
              <i className="bx bx-contact mr-3 text-lg"></i>
              <span className="text-sm">Inbox</span>
            </button>
          </li>
          <li className="mb-1 group">
            {" "}
            {/* Add Inbox button */}
            <button
              onClick={() => {
                setActiveComponent("contacts");
              }}
              className="flex font-semibold items-center py-2 px-4 text-white rounded-md w-full text-left"
            >
              <i className="bx bx-contact mr-3 text-lg"></i>
              <span className="text-sm">Contact</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all">
        {/* Navbar */}
        <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
          <button type="button" className="text-lg text-gray-900 font-semibold">
            <i className="ri-menu-line"></i>
          </button>
          <ul className="ml-auto flex items-center">
            <li className="mr-1">
              <button
                type="button"
                className="text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="hover:bg-gray-100 rounded-full"
                  viewBox="0 0 24 24"
                  style={{ fill: "gray" }}
                >
                  <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
                </svg>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="hover:bg-gray-100 rounded-full"
                  viewBox="0 0 24 24"
                  style={{ fill: "gray" }}
                >
                  <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path>
                </svg>
              </button>
            </li>
            <li className="ml-3">
              <button type="button" className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 relative">
                  <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                      alt="User"
                    />
                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                    <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                  </div>
                </div>
                <div className="p-2 text-left">
                  <h2 className="text-sm font-semibold text-gray-800">
                    John Doe
                  </h2>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="p-6">{renderComponent()}</div>
      </main>
    </div>
  );
};

export default AdminPage;
