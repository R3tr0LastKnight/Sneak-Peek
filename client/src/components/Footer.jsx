import React from "react";
import linked from "../assets/nav/icons8-linkedin.svg";
import git from "../assets/nav/icons8-github.svg";
import insta from "../assets/nav/icons8-insta.svg";
import twitter from "../assets/nav/icons8-twitter.svg";
import shoex from "../assets/footer/asf.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";
import shoe1 from "../assets/carousel/crystal-jo-F45w1xY42BY-unsplash.jpg";
import shoe2 from "../assets/carousel/nelson-ndongala-kKObh7tUPNc-unsplash.jpg";
import shoe3 from "../assets/carousel/taylor-smith-aDZ5YIuedQg-unsplash (1).jpg";
import shoe4 from "../assets/carousel/joel-muniz-oCOykXMRteM-unsplash.jpg";
import shoe5 from "../assets/carousel/paul-volkmer-updW-QUccFE-unsplash.jpg";

const Footer = () => {
  return (
    <div className="flex gap-4 myu-8 pb-2 mx-4 md:mx-16 md:mb-12 relative bottom-0 w-screen justify-between">
      <div className="flex  flex-col md:justify-between md:w-1/4">
        <div className="">
          <h1 className="font-semibold text-xl md:text-2xl ">Keep In Touch</h1>
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
        <div>
          <h1 className="font-semibold text-xl md:text-2xl ">Info</h1>
          <ul className="md:text-base">
            <li>Contact Us</li>
            <li>Brands</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="w-1/2 md:w-3/4 flex justify-start md:justify-end items-end md:mr-32">
        <img
          src={shoex}
          alt=""
          className="rounded-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[80%] lg:w-[20%] "
        />
      </div>
    </div>
  );
};

export default Footer;
