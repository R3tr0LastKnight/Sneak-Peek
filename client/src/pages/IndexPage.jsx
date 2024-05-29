import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Carousels from "../components/Carousels";
import Marquee from "react-fast-marquee";
import wings from "../assets/wings.png";
import "../index.css";
import IndexProds from "../components/IndexProds";

const IndexPage = () => {
  return (
    <div>
      <div className="py-12 relative">
        <div className="absolute  w-32 top-0 left-[36%] z-30 bg-white py-4 px-4">
          <div className="bg-white w-full">
            <img className="" src={wings} alt="" />
          </div>
        </div>
        <Marquee autoFill speed={30} className="overflow-hidden">
          <h1 className="px-2 text-4xl font-bold font-mentra">Sneek Peek</h1>
        </Marquee>
      </div>
      <IndexProds />
    </div>
  );
};

export default IndexPage;
