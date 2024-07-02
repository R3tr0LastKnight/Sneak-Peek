import React, { useState } from "react";
import IndexProd from "./IndexProd";
import ProductModal from "./ProductModal";

const IndexProds = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  return (
    <>
      {showModal && (
        <ProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          productId={selectedProductId}
        />
      )}

      <h1 className="md:mx- font-mentra text-6xl">Trending</h1>

      <IndexProd
        setShowModal={setShowModal}
        setSelectedProductId={setSelectedProductId}
      />
    </>
  );
};

export default IndexProds;
