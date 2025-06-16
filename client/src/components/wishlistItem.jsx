import React from "react";
import img from "../assets/carousel/taylor-smith-aDZ5YIuedQg-unsplash (1).jpg";
import KartIco from "../assets/icons/addToCart.png";

const WishlistItem = () => {
  return (
    <div className="flex border rounded-xl w-full overflow-hidden relative bg-white ">
      <img className="w-[40%] md:w-[20%]" src={img} alt="" />
      <div className="flex flex-col p-2">
        <h1 className="font-bold cursor-pointer">XMS 456</h1>
        <h2 className="font-medium ">&#8377; 420</h2>
        <h3 className="font-thin mt-4 text-xs">Added On : 31st Feb 2024</h3>
        <div className="flex absolute right-2 bottom-2 bg-black text-white rounded px-2 py-1 invert cursor-pointer">
          <img className="invert" src={KartIco} alt="" />
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
