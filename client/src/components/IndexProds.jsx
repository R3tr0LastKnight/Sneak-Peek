import React from "react";
import IndexProd from "./IndexProd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ProductModal from "./ProductModal";

const IndexProds = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <ProductModal showModal={showModal} setShowModal={setShowModal} />
      )}

      <h1 className="md:mx-16 font-mentra text-6xl">Trending</h1>
      
        <IndexProd showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default IndexProds;
