import React from "react";
import Meteors from "../components/magicui/meteors.tsx";
import IndexProd from "../components/IndexProd.jsx";
import { useState } from "react";
import ProductModal from "../components/ProductModal.jsx";

const Catalogue = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <ProductModal showModal={showModal} setShowModal={setShowModal} />
      )}
      <div className="py-8 relative flex flex-col items-center">
        <div>
          <div className="text-3xl font-mentra">Catalogue</div>
          <Meteors />
        </div>

        <div className="flex my-2 bg-white w-full justify-end px-16 relative ">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3  md:mx-8">
          <IndexProd showModal={showModal} setShowModal={setShowModal} />
          <IndexProd showModal={showModal} setShowModal={setShowModal} />
          <IndexProd showModal={showModal} setShowModal={setShowModal} />
          <IndexProd showModal={showModal} setShowModal={setShowModal} />
          <IndexProd showModal={showModal} setShowModal={setShowModal} />
          <IndexProd showModal={showModal} setShowModal={setShowModal} />
          <IndexProd showModal={showModal} setShowModal={setShowModal} />
          <IndexProd showModal={showModal} setShowModal={setShowModal} />
          <IndexProd showModal={showModal} setShowModal={setShowModal} />
        </div>
      </div>
    </>
  );
};

export default Catalogue;
