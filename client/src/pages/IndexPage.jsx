import React from "react";
import wings from "../assets/wings.png";
import "../index.css";
import Drop from "../components/Drop.jsx";
import IndexProds from "../components/IndexProds";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity.tsx";
import { NavLink } from "react-router-dom";
import Showcase from "../components/Showcase";

const IndexPage = () => {
  return (
    <div className="flex items-center flex-col w-screen ">
      <div className="pt-12 pb-6 relative  ">
        <div className="w-full">
          {/* <div className="absolute  w-72 top-3 left-[28%] md:left-[44%] z-30">
            <img className="" src={wings} alt="" />
          </div> */}
        </div>
        <VelocityScroll
          defaultVelocity={5}
          className="px-2 text-4xl font- font-mentra w-screen"
        >
          Sneak Peek
        </VelocityScroll>
      </div>
      <Showcase />

      <IndexProds />
      <NavLink
        to={"catalogue"}
        onClick={() => window.scrollTo({ top: 520, behavior: "smooth" })}
        className="px-4 py-2 mb-6 border border-black text-center bg-white rounded w-1/2 md:w-[22%] hover:invert transition-all"
      >
        View All
      </NavLink>

      <Drop />
    </div>
  );
};

export default IndexPage;
