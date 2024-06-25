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
      <div className="grid grid-cols-1 md:grid-cols-3  md:mx-8">
        <IndexProd showModal={showModal} setShowModal={setShowModal} />
        <IndexProd showModal={showModal} setShowModal={setShowModal} />
        <IndexProd showModal={showModal} setShowModal={setShowModal} />
        <IndexProd showModal={showModal} setShowModal={setShowModal} />
        <IndexProd showModal={showModal} setShowModal={setShowModal} />
        <IndexProd showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default IndexProds;
