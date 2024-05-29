import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Carousels from "../components/Carousels";
import Marquee from "react-fast-marquee";
import wings from "../assets/wings.png";
import "../index.css";
import IndexProds from "../components/IndexProds";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity.tsx";

const IndexPage = () => {
  return (
    <div>
      <div className="py-12 relative">
        <div className="absolute  w-32 top-3 left-[32%] z-30 bg-white py-8 px-4">
          <div className="bg-white w-full">
            <img className="" src={wings} alt="" />
          </div>
        </div>
        <VelocityScroll
          text="Sneak Peek"
          default_velocity={5}
          className="px-2 text-4xl font-bold font-mentra"
        />
      </div>
      <IndexProds />
    </div>
  );
};

export default IndexPage;
