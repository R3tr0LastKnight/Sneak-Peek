import React from "react";
import Meteors from "../components/magicui/meteors.tsx";
import { useState } from "react";
import ProductModal from "../components/ProductModal.jsx";
import CatalogueProd from "../components/CatalogueProd.jsx";

const Catalogue = () => {
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
      <div className="py-8 relative flex flex-col items-center lg:min-h-screen">
        <div>
          <div className="text-3xl font-mentra text-black relative z-30">
            Catalogue
          </div>
          <Meteors />
        </div>

        {/* <div className="flex my-2 bg-white w-full lg:justify-end justify-center lg:px-16 relative  lg:bottom-12 bg-transparent">
          <input
            className="border border-black bg-whtie px-4 py-2 rounded-l-xl"
            type="text"
          />

          <select
            className=" border border-black bg-white rounded-r-xl px-2 py-1"
            name=""
            id=""
          >
            <option className="p-2" value="">
              Default
            </option>
            <option className="p-2" value="">
              Low To High
            </option>
            <option className="p-2" value="">
              High To Low
            </option>
          </select>
        </div> */}

        <div className="w-full lg:mx-16">
          <CatalogueProd
            showModal={showModal}
            setShowModal={setShowModal}
            setSelectedProductId={setSelectedProductId}
          />
        </div>
      </div>
    </>
  );
};

export default Catalogue;
