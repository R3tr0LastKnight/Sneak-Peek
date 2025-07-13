/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dockx from "./Dockx.jsx";
import shoex from "../assets/footer/asf.jpg";
import globe from "../assets/footer/globe.gif";
import "swiper/css";
import "swiper/css/effect-creative";
import Meteors from "./magicui/meteors.tsx";
import { NavLink } from "react-router-dom";
import ContactUs from "./ContactUsModal.jsx";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [quotes, setQuotes] = useState(null);
  const [subbed, setSubbed] = useState(!false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getQuotes`
        );
        setQuotes(response.data);
        console.log("quotenigga:", response.data);
      } catch (error) {
        console.error("Error fetching the random product:", error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <>
      <ContactUs showModal={showModal} setShowModal={setShowModal} />
      <div className="flex flex-col lg:flex-row gap-4 my-8 pb-2 mx-4 md:mx-16 relative bottom-0 w-screen justify-between ">
        <div className="flex flex-row w-full md:justify-between lg:gap-6">
          <div className="flex flex-col  lg:w-1/3 ">
            <div className="flex flex-col">
              <h1 className="font-semibold text-xl md:text-2xl ">
                Remain Entwined
              </h1>
              <ul className="flex h-[5rem] ">
                <div className="absolute top-4">
                  <Dockx />
                </div>
              </ul>
            </div>
            <div className="flex w-full gap-2 lg:gap-4 transition-all  ">
              <div className="w-1/2">
                <h1 className="font-semibold text-xl md:text-2xl lg:mb-2 ">
                  Lore
                </h1>
                <ul className="md:text-base flex flex-col lg:gap-1 border-b-black ">
                  <li
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer hover:underline"
                  >
                    Speak Thy Will
                  </li>
                  <li className="cursor-pointer hover:underline">
                    Hallowed Makers
                  </li>
                  <li className="cursor-pointer hover:underline">
                    Fated Revelations
                  </li>
                  {/* <li>Blogs</li> */}
                </ul>
              </div>
              <div className="w-1/2 text-nowrap">
                <h1 className="font-semibold text-xl md:text-2xl lg:mb-2 ">
                  Edicts
                </h1>
                <ul className="md:text-base flex flex-col lg:gap-1">
                  <NavLink
                    onClick={() =>
                      window.scrollTo({ top: 500, behavior: "smooth" })
                    }
                    to={"/privacy-policy"}
                    className="cursor-pointer hover:underline"
                  >
                    Veil of Secrets
                  </NavLink>
                  <NavLink
                    onClick={() =>
                      window.scrollTo({ top: 500, behavior: "smooth" })
                    }
                    to={"/terms-and-conditions"}
                    className="cursor-pointer hover:underline"
                  >
                    Bindings of Accord
                  </NavLink>
                  <NavLink
                    onClick={() =>
                      window.scrollTo({ top: 500, behavior: "smooth" })
                    }
                    to={"/returns-exchange"}
                    className="cursor-pointer hover:underline"
                  >
                    Pact of Reclaiming
                  </NavLink>
                </ul>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-col   items-center  relative right-4 ">
            {subbed ? (
              <>
                <div className="flex flex-col gap-6 my items-center">
                  <h1 className="font-semibold text-2xl w-full text-nowrap ">
                    Bind thyself to the Herald’s Scroll
                  </h1>
                  <div className="flex border border-black overflow-hidden rounded-lg  ">
                    <input
                      className="px-2 py-1 "
                      type="email"
                      placeholder="tarnised@grace.xxx"
                    />
                    <button className="px-2 py-1 bg-black text-white">
                      Offer
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-6 my items-center">
                  <h1 className="font-semibold text-2xl ">
                    Thou hast joined the fold. Remain vigilant...
                  </h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-16"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </div>
              </>
            )}
            {quotes ? (
              <div className="font-light text-base my-4 w-[80%] text-center text-black">
                {quotes.quote}
              </div>
            ) : (
              <div className="font-light text-base text-black">
                Loading quotes...
              </div>
            )}
          </div>

          <div className="w-1/2 hidden lg:w-1/3  lg:flex justify-end  items-end ">
            <img
              src={shoex}
              alt=""
              className="rounded-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)]  w-[80%] "
            />
          </div>
        </div>
        <div className="w- mx- flex flex-col gap-2 my-2 items-center relative right-4 lg:hidden">
          <h1 className="font-semibold text-xl md:text-2xl ">
            Bind thyself to the Herald’s Scroll
          </h1>
          <div className="flex border border-black overflow-hidden rounded-lg  ">
            <input className="px-2 py-1 " type="email" />
            <button className="px-2 py-1 bg-black text-white">Offer</button>
          </div>
          {quotes ? (
            <div className="font-light text-base mx-4 text-center text-black">
              {quotes.quote}
            </div>
          ) : (
            <div className="font-light text-base text-black">
              Loading quotes...
            </div>
          )}
        </div>
        <div className="w-[90%] lg:w-1/3 flex justify-start md:justify-end items-end md:mr-32 shadow-xl select-none bg-black text white rounded-xl overflow-hidden ">
          <div className="relative flex h-full w-full lg:max-w-[32rem] items-center justify-center overflow-hidden rounded-lg  bg-background px-32 lg:px-40 pb-40 md:pb-32 ">
            <div className="whitespace-nowrap relative z-20 font-mentra text-5xl   -bottom-8 text-white">
              Visit us
            </div>
            <div className="absolute left-0 z-20">
              <Meteors />
            </div>
            <img className="w-full absolute z-0 top-[10%]" src={globe} alt="" />
          </div>
        </div>
        <div className="absolute -bottom-5   w-screen right-8 lg:right-16 font-light text-xs text-center">
          copyright &copy; {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
};

export default Footer;
