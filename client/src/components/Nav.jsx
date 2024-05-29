import React, { useState } from "react";
import Carousels from "./Carousels";

const Nav = () => {
  const [nav, setNav] = useState(false);
  const changeNav = () => {
    window.scrollY >= 0 ? setNav(true) : setNav(false);
    window.scrollY <= 300 ? setNav(false) : setNav(true);
  };
  window.addEventListener("scroll", changeNav);
  return (
    <>
      <div
        className={`flex justify-between py-2 pt-4 fixed top-0 z-50 px-8 w-full transition-all items-center ${
          nav ? "text-black bg-white" : "text-white"
        }`}
      >
        <h1 className="flex items-center text-3xl font-mentra font-extralight mt-1">
          Sneak Peek
        </h1>
        <ul
          className={`flex gap-1 border border-white items-center px-2 py-1 rounded-xl ${
            nav ? "border-black" : "border-white"
          }`}
        >
          <li
            className={`border-r  px-2 ${
              nav ? "border-black" : "border-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </li>
          <li
            className={`border-r  px-2 ${
              nav ? "border-black" : "border-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </li>
          <li className="flex gap-2 mx-2 items-center">
            <h1>Profile</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </li>
        </ul>
      </div>
      <Carousels />
    </>
  );
};

export default Nav;
