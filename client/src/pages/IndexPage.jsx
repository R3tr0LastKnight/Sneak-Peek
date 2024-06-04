import React from "react";
import wings from "../assets/wings.png";
import "../index.css";
import IndexProds from "../components/IndexProds";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity.tsx";
import { NavLink } from "react-router-dom";

const IndexPage = () => {
  return (
    <div className="flex items-center flex-col w-screen ">
      <div className="py-12 relative  ">
        <div className="absolute  w-32 top-3 left-[38%] md:left-[46%] z-30 bg-white py-8 px-4">
          <div className="bg-white w-full">
            <img className="" src={wings} alt="" />
          </div>
        </div>
        <VelocityScroll
          text="Sneak Peek"
          default_velocity={5}
          className="px-2 text-4xl font-bold font-mentra w-screen"
        />
      </div>
      <IndexProds />
      <NavLink
        to={"catalogue"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="px-4 py-2 border text-center bg-white rounded w-1/2 md:w-1/4 hover:invert transition-all"
      >
        View All
      </NavLink>
    </div>
  );
};

export default IndexPage;
