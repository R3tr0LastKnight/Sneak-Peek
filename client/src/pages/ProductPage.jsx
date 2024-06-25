import React from "react";
import { useState } from "react";
import s1 from "../assets/carousel/s1.jpg";
import s2 from "../assets/carousel/s2.jpg";
import s3 from "../assets/carousel/s3.jpg";

const ProductPage = () => {
  const [imgg, setImgg] = useState([s1, s2, s3]);

  const handleImageClick = (img) => {
    const newImgg = [img, ...imgg.filter((item) => item !== img)];
    setImgg(newImgg);
  };

  return (
    <>
      <div className="w-screen px-4 lg:px-16 pt-8 lg:py-4">
        <div className="flex gap-4 relative justify-center my-2">
          <div className="absolute left-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden flex flex-col lg:flex-row shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="lg:w-[60%] relative text-white transition-all">
            <img src={imgg[0]} className="h-full" alt="" />
          </div>
          <div className=" lg:w-[40%] flex flex-col justify-center ">
            <div className="w-full flex flex-col lg:justify-between px-16 py-8 ">
              <h1
                title="Liberator Penitrator"
                className="font-mentra text-lg opacity-50  "
              >
                NIKE
              </h1>
              <h1
                title="Liberator Penitrator"
                className="font-mentra text-xl  "
              >
                Liberator Penitrator
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur molestias, in a beatae aspernatur incidunt doloremque
                consectetur asperiores rerum accusantium harum vitae delectus
                reprehenderit, molestiae esse? Ratione consequatur eaque
                tempore?
              </p>
              <div className="my-2 flex flex-col  w-full  ">
                <div className="font-semibold text-lg w-full">
                  &#8377; 5000 | Nike | hash-brownie
                </div>
                <div className="flex my-4">
                  <button className="flex justify-center py-1 px-2 rounded transition-all w-full lg:w- text-center border border-black bg-white  text-black hover:bg-black hover:text-white ">
                    Add to kart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
