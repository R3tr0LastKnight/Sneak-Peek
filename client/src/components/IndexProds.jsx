import React from "react";
import IndexProd from "./IndexProd";

const IndexProds = () => {
  return (
    <div className="flex flex-col items-center">
      <IndexProd />
      <IndexProd />
      <IndexProd />
      <button className="px-4 py-2 border bg-white rounded w-1/2 hover:invert transition-all">
        View All
      </button>
    </div>
  );
};

export default IndexProds;
