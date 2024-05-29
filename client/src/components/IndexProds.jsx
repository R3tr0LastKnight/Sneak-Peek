import React from "react";
import IndexProd from "./IndexProd";
import { NavLink } from "react-router-dom";

const IndexProds = () => {
  return (
    <div className="flex flex-col items-center">
      <IndexProd />
      <IndexProd />
      <IndexProd />
      <NavLink
        to={"catalogue"}
        className="px-4 py-2 border text-center bg-white rounded w-1/2 hover:invert transition-all"
      >
        View All
      </NavLink>
    </div>
  );
};

export default IndexProds;
