import React from "react";
import Meteors from "../components/magicui/meteors.tsx";
import IndexProd from "../components/IndexProd.jsx";

const Catalogue = () => {
  return (
    <div className="py-8 relative flex flex-col items-center">
      <div>
        <div className="text-3xl font-mentra">Catalogue</div>
        <Meteors />
      </div>

      <div className="flex my-2 bg-white relative ">
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

      <div className="relative flex flex-col items-center justify-center">
        <IndexProd />
        <IndexProd />
        <IndexProd />
        <IndexProd />
      </div>
    </div>
  );
};

export default Catalogue;
