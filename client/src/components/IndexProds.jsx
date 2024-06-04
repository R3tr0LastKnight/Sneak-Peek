import React from "react";
import IndexProd from "./IndexProd";
import { NavLink } from "react-router-dom";

const IndexProds = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3  md:mx-16">
      <IndexProd />
      <IndexProd />
      <IndexProd />
      <IndexProd />
      <IndexProd />
      <IndexProd />
    </div>
  );
};

export default IndexProds;
