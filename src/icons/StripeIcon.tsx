import React from 'react';

function StripeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <g clip-path="url(#clip0_142_5671)">
        <path d="M40 0H0V40H40V0Z" fill="url(#paint0_linear_142_5671)" />
        <g filter="url(#filter0_d_142_5671)">
          <path
            d="M21.8262 17.3435C19.8064 16.5964 18.6995 16.0154 18.6995 15.1023C18.6995 14.3274 19.3359 13.8848 20.4704 13.8848C22.5456 13.8848 24.676 14.6872 26.1426 15.4065L26.9727 10.2878C25.8105 9.73438 23.4309 8.82129 20.1384 8.82129C17.8142 8.82129 15.8772 9.42994 14.4939 10.5645C13.0549 11.7542 12.3079 13.4697 12.3079 15.5449C12.3079 19.3079 14.6045 20.9128 18.3398 22.2686C20.7471 23.1262 21.5495 23.7351 21.5495 24.6758C21.5495 25.5889 20.7747 26.1145 19.3635 26.1145C17.6204 26.1145 14.7429 25.2568 12.8613 24.1501L12.0312 29.3242C13.636 30.2373 16.6243 31.178 19.7234 31.178C22.1858 31.178 24.2334 30.5969 25.6169 29.4902C27.1663 28.2727 27.9688 26.4744 27.9688 24.1501C27.9688 20.304 25.6169 18.6992 21.8262 17.3435Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_142_5671"
          x="7.03125"
          y="3.82129"
          width="29.9375"
          height="36.3564"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="3.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.185125 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_142_5671"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_142_5671"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_142_5671"
          x1="4000"
          y1="2334.23"
          x2="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2697D4" />
          <stop offset="0.5" stop-color="#207BCB" />
          <stop offset="1" stop-color="#2285CE" />
        </linearGradient>
        <clipPath id="clip0_142_5671">
          <rect width="40" height="40" rx="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default StripeIcon;
