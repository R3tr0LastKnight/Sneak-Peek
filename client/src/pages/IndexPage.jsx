import React from "react";
import wings from "../assets/wings.png";
import "../index.css";
import Drop from "../components/Drop";
import IndexProds from "../components/IndexProds";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity.tsx";
import { NavLink } from "react-router-dom";
import Showcase from "../components/Showcase";

const IndexPage = () => {
  return (
    <div className="flex items-center flex-col w-screen ">
      <div className="py-12 relative  ">
        <div className="w-full">
          <div className="absolute  w-44 top-3 left-[28%] md:left-[44%] z-30">
            <img className="" src={wings} alt="" />
          </div>
        </div>
        <VelocityScroll
          text="Sneak Peek"
          default_velocity={5}
          className="px-2 text-4xl font-bold font-mentra w-screen"
        />
      </div>
      <Showcase />
      <IndexProds />
      <NavLink
        to={"catalogue"}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="px-4 py-2 border text-center bg-white rounded w-1/2 md:w-1/4 hover:invert transition-all"
      >
        View All
      </NavLink>
      <Drop />
    </div>
  );
};

export default IndexPage;
