import React from "react";
import shoe from "../assets/carousel/paul-volkmer-updW-QUccFE-unsplash.jpg";

const drop = () => {
  return (
    <div className="w-screen px-8 lg:px-16 pt-6 pb-10 font-poppins">
      <div className="rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-8 px-4 lg:px-16 flex flex-col lg:flex-row">
        <div className="lg:w-1/2  flex flex-col justify-center">
          <h1 className=" opacity-25 font-bold text-lg lg:text-3xl">
            Drop of the day
          </h1>
          <h1 className=" font-bold opacity-100 text-xl lg:text-6xl">
            Yeezey 5000
          </h1>
          <div>
            <button className="border lg:my-6 my-3  border-black shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-1 px-3 rounded hover:bg-black hover:text-white transition-all text-sm lg:text-lg">
              Buy now for Rs 4200
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img className="w-[100%] rounded-xl" src={shoe} alt="" />
        </div>
      </div>
    </div>
  );
};

export default drop;
