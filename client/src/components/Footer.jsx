/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import linked from "../assets/nav/icons8-linkedin.svg";
import git from "../assets/nav/icons8-github.svg";
import insta from "../assets/nav/icons8-insta.svg";
import twitter from "../assets/nav/icons8-twitter.svg";
import shoex from "../assets/footer/asf.jpg";
import globe from "../assets/footer/globe.gif";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";
import shoe1 from "../assets/carousel/crystal-jo-F45w1xY42BY-unsplash.jpg";
import shoe2 from "../assets/carousel/nelson-ndongala-kKObh7tUPNc-unsplash.jpg";
import shoe3 from "../assets/carousel/taylor-smith-aDZ5YIuedQg-unsplash (1).jpg";
import shoe4 from "../assets/carousel/joel-muniz-oCOykXMRteM-unsplash.jpg";
import shoe5 from "../assets/carousel/paul-volkmer-updW-QUccFE-unsplash.jpg";
import Globe from "./magicui/globe.tsx";
import Meteors from "./magicui/meteors.tsx";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 my-8 pb-2 mx-4 md:mx-16 relative bottom-0 w-screen justify-between ">
      <div className="flex flex-row  md:justify-between lg:gap-6">
        <div className="flex flex-col lg:w-1/3 ">
          <div className="flex flex-col">
            <h1 className="font-semibold text-xl md:text-2xl ">
              Keep In Touch
            </h1>
            <ul className="flex my-2 ">
              <li>
                <img className="w-1/2 md:w-3/4" src={linked} alt="" />
              </li>
              <li>
                <img className="w-1/2 md:w-3/4" src={git} alt="" />
              </li>
              <li>
                <img className="w-1/2 md:w-3/4" src={twitter} alt="" />
              </li>
              <li>
                <img className="w-1/2 md:w-3/4" src={insta} alt="" />
              </li>
            </ul>
          </div>
          <div className="flex w-full gap-8 ">
            <div>
              <h1 className="font-semibold text-xl md:text-2xl lg:mb-2 ">
                Info
              </h1>
              <ul className="md:text-base flex flex-col lg:gap-1 ">
                <li className="cursor-pointer">Contact Us</li>
                <li className="cursor-pointer">Brands</li>
                <li className="cursor-pointer">Releases</li>
                {/* <li>Blogs</li> */}
              </ul>
            </div>
            <div>
              <h1 className="font-semibold text-xl md:text-2xl lg:mb-2 ">
                Policies
              </h1>
              <ul className="md:text-base flex flex-col lg:gap-1">
                <NavLink
                  onClick={() =>
                    window.scrollTo({ top: 500, behavior: "smooth" })
                  }
                  to={"/privacy-policy"}
                  className="cursor-pointer"
                >
                  Privacy Policy
                </NavLink>
                <NavLink
                  onClick={() =>
                    window.scrollTo({ top: 500, behavior: "smooth" })
                  }
                  to={"/terms-and-conditions"}
                  className="cursor-pointer"
                >
                  Terms & Conditions
                </NavLink>
                <NavLink
                  onClick={() =>
                    window.scrollTo({ top: 500, behavior: "smooth" })
                  }
                  to={"/returns-exchange"}
                  className="cursor-pointer"
                >
                  Returns & Exchange
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-col gap-6 my items-center relative right-4 ">
          <h1 className="font-semibold text-2xl ">
            Subscribe to our newsletter
          </h1>
          <div className="flex border border-black overflow-hidden rounded-lg  ">
            <input className="px-2 py-1 " type="email" />
            <button className="px-2 py-1 bg-black text-white">Submit</button>
          </div>
          <div className="font-light text-base text-black">"Donquixote"</div>
        </div>
        <div className="w-1/3 lg:w- flex justify-end  items-end ">
          <img
            src={shoex}
            alt=""
            className="rounded-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[60%] lg:w-[80%] "
          />
        </div>
      </div>
      <div className="w- mx- flex flex-col gap-2 my-2 items-center relative right-4 lg:hidden">
        <h1 className="font-semibold text-xl md:text-2xl ">
          Subscribe to our newsletter
        </h1>
        <div className="flex border border-black overflow-hidden rounded-lg  ">
          <input className="px-2 py-1 " type="email" />
          <button className="px-2 py-1 bg-black text-white">Submit</button>
        </div>
        <div className="font-light text-base text-black">"Quote"</div>
      </div>
      <div className="w-[90%] lg:w-1/3 flex justify-start md:justify-end items-end md:mr-32 shadow-xl select-none bg-black text white rounded-xl overflow-hidden ">
        <div className="relative flex h-full w-full lg:max-w-[32rem] items-center justify-center overflow-hidden rounded-lg  bg-background px-48 lg:px-40 pb-40 md:pb-32 ">
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
        copyright &copy; 2024
      </div>
    </div>
  );
};

export default Footer;
