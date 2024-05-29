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
        <input className="border bg-whtie px-2 py-1 rounded-l-xl" type="text" />

        <select
          className=" border bg-white rounded-r-xl px-2 py-1"
          name=""
          id=""
        >
          <option className="p-1" value="">
            Default
          </option>
          <option className="p-1" value="">
            Low To High
          </option>
          <option className="p-1" value="">
            High To Low
          </option>
        </select>
      </div>

      <div className="relative">
        <IndexProd />
        <IndexProd />
        <IndexProd />
        <IndexProd />
      </div>
    </div>
  );
};

export default Catalogue;
