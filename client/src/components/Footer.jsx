import React from "react";
import linked from "../assets/nav/icons8-linkedin.svg";
import git from "../assets/nav/icons8-github.svg";
import insta from "../assets/nav/icons8-insta.svg";
import twitter from "../assets/nav/icons8-twitter.svg";
import shoex from "../assets/footer/asf.jpg";

const Footer = () => {
  return (
    <div className="flex gap-4 mt-8 pb-2 mx-4 relative bottom-0">
      <div className="flex gap-2w flex-col">
        <div className="">
          <h1 className="font-semibold text-xl ">Keep In Touch</h1>
          <ul className="flex my-2 ">
            <li>
              <img className="w-1/2" src={linked} alt="" />
            </li>
            <li>
              <img className="w-1/2" src={git} alt="" />
            </li>
            <li>
              <img className="w-1/2" src={twitter} alt="" />
            </li>
            <li>
              <img className="w-1/2" src={insta} alt="" />
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold text-xl ">Info</h1>
          <ul>
            <li>Contact Us</li>
            <li>Brands</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="w-1/2">
        <img
          src={shoex}
          alt=""
          className="rounded-xl mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        />
      </div>
    </div>
  );
};

export default Footer;
