import React from "react";
import Meteors from "../components/magicui/meteors.tsx";
import KartItem from "../components/KartItem.jsx";

const Catalogue = () => {
  return (
    <div className="py-8 relative flex flex-col items-center min-h-[50vh]">
      <div className="select-none">
        <div className="text-3xl font-mentra">Kart</div>
        <Meteors />
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2  justify-center mx-8 py-4 gap-4 ">
        <KartItem />
        <KartItem />
        <KartItem />
        <KartItem />
      </div>
    </div>
  );
};

export default Catalogue;
