import React from "react";

const Midriff = ({openingHeader, openingDescription}) => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-left">
            <p className="text-3xl text-gray-900 mb-6">
             {openingHeader}
            </p>
          </div>
          <div className="text-left">
            <p className="text-lg text-gray-700">
              {openingDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Midriff;
