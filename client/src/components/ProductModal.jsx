import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import s1 from "../assets/carousel/s1.jpg";
import s2 from "../assets/carousel/s2.jpg";
import s3 from "../assets/carousel/s3.jpg";

const ProductModal = ({ showModal, setShowModal }) => {
  const [imgg, setImgg] = useState([s1, s2, s3]);

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: {
      y: "-1000",
      opacity: 0,
    },
    visible: {
      y: "100px",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          variants={backdrop}
          inherit="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="bg-[rgba(0,0,0,0.6)] h-screen w-full fixed top-0 right-0 left-0  z-40 overflow-y-auto "
          onClick={() => setShowModal(false)}
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
            }}
            variants={modal}
            hidden="hidden"
            visible="visible"
            className="overflow-hidden flex flex-col lg:flex-row"
          >
            <div className="px-4 lg:px-16 pt-8 lg:py-4">
              <div className="rounded-xl overflow-hidden flex flex-col lg:flex-row shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white relative">
                <div
                  className="absolute top-4 right-4 z-30 cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </div>

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
                      Pariatur molestias, in a beatae aspernatur incidunt
                      doloremque consectetur asperiores rerum accusantium harum
                      vitae delectus reprehenderit, molestiae esse? Ratione
                      consequatur eaque tempore?
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
