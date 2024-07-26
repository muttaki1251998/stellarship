import React from 'react';

const SpinnerIcon = ({ width, height, circleColor = 'black', textColor = 'black' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="relative transition-all duration-700 ease-in-out"
  >
    <text x="50%" y="50%" textAnchor="middle" fill={textColor} dy=".3em" fontSize="24">ME</text>
    <g className="animate-spin">
      <path
        d="M50 10
           A 40 40 0 0 1 90 50
           L 80 50
           A 30 30 0 0 0 50 20
           Z"
        fill={circleColor}
      />
      <path
        d="M50 90
           A 40 40 0 0 1 10 50
           L 20 50
           A 30 30 0 0 0 50 80
           Z"
        fill={circleColor}
      />
    </g>
    <style>
      {`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 4s linear infinite;
          transform-origin: center;
        }
      `}
    </style>
  </svg>
);

export default SpinnerIcon;
