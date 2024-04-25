"use client";

import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isMenuOpen ? (
        <div className="px-5">
          <div className="flex items-center justify-between my-5">
            <img src="./logo_best.avif" className="w-36 h-11 mb-1" alt="" />
            <div
              onClick={() => {
                toggleMenu();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <p className="font-semibold text-lg my-5">Home</p>
          <p className="font-semibold text-lg my-5">About Us</p>
          <p className="font-semibold text-lg my-5">+91 8369003785</p>
        </div>
      ) : (
        <nav className="flex items-center justify-between px-5 md:px-24 h-24 shadow-md">
          <div
            onClick={() => {
              toggleMenu();
            }}
            className="md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <div className="md:flex items-center gap-10">
            <img
              src="./logo_best.avif"
              className="hidden md:block w-36 h-11 mb-1"
              alt=""
            />
            <div className="rounded-full flex items-center ms-4 gap-2 text-gray-500 shadow-xl w-60 md:w-96 h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 md:w-8 md:h-8 ms-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <p>Search for location</p>
            </div>
          </div>
          <div className="md:flex items-center gap-10">
            <p className="font-semibold text-lg mt-2 hidden md:block">
              +91 8369003785
            </p>
            <img
              src="https://avatars.githubusercontent.com/u/10999999?v=4"
              className="rounded-full h-10 md:h-12"
              alt=""
            />
          </div>
        </nav>
      )}
    </>
  );
}

/*
              <form
              className="rounded-full flex items-center ms-4 gap-2 text-gray-500 shadow-xl w-60 md:w-96 h-12 bg-gray-500"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="default-search" className="sr-only">
                Search for location
              </label>
              <div className="flex items-center gap-2 fixed w-[60%] light: text-gray-800 dark:text-gray-400 z-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8 ms-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  placeholder="Search for location..."
                  id="default-search"
                  className="ps-4 w-auto md:w-auto h-11 rounded-full light: border-stone-800 dark:border-stone-500"
                  autoComplete="off"
                />
              </div>
            </form>
*/
