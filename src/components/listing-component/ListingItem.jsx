import React from "react";
import BedSingleIcon from "../IconComponents/BedSingleIcon";
import BathIcon from "../IconComponents/BathIcon";
import Link from "next/link";

const ListingItem = ({ listing, formatPrice, isSoldListing }) => {
  const listingType = isSoldListing ? 'sold' : 'listing';
  const images = isSoldListing ? listing.soldListingImages : listing.listingImages;

  return (
    <Link legacyBehavior href={`/listing/${listing._id}?type=${listingType}`}>
      <a>
        <div className="relative bg-white shadow-lg overflow-hidden group">
          {isSoldListing && (
            <div className="absolute top-2 left-2 bg-[#0f5c7d] text-white text-md rounded px-2 py-1 z-10">
              SOLD
            </div>
          )}
          <div className="relative">
            {images && images.length > 0 ? (
              <img
                src={images[0]}
                alt={`Listing Image`}
                className="w-full h-80 transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
            <h3 className="text-xl">
              <span className="font-jakarta text-white hover:underline">
                {listing.city}, {listing.provinceState}
              </span>
            </h3>
            <div className="flex items-center mt-2">
              <BedSingleIcon width="24" height="24" color="#fff" />
              <span className="ml-2 mr-2">{listing.bedrooms}</span>
              <BathIcon width="24" height="24" color="#fff" />
              <span className="ml-2 mr-2">{listing.bathrooms}</span>
            </div>
            <p className="mt-1">{listing.squareFeet} sqft</p>
            <p className="mt-1">{formatPrice(listing.price)}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ListingItem;
