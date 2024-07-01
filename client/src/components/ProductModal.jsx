import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import s1 from "../assets/carousel/s1.jpg";
import s2 from "../assets/carousel/s2.jpg";
import s3 from "../assets/carousel/s3.jpg";
import axios from "axios";
const ProductModal = ({ showModal, setShowModal, productId }) => {
  const [imgg, setImgg] = useState([s1, s2, s3]);
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(10);

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

  let sizes = [1, 3, 4, 5, 6, 7, 8, 10, 11];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/getSpecificProduct/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);
  return (
    <AnimatePresence>
      {showModal && product && (
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
            <div className="px-4 lg:px-16 pt-8 lg:py-4 w-full">
              <div className="rounded-xl overflow-hidden flex flex-col lg:flex-row shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white relative w-full">
                <div
                  className="absolute top-4 right-4 z-30 cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
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

                <div className="lg:w-[60%]  text-white transition-all">
                  <div className="h-[35rem] overflow-hidden relative items-center justify-center">
                    <img
                      src={product.photos}
                      className="w-full h-full absolute "
                      alt=""
                    />
                  </div>
                </div>
                <div className="lg:w-[40%]  flex flex-col justify-center ">
                  <div className="w-full flex flex-col lg:justify-between px-16 py-8 ">
                    <h1
                      title={product.brand}
                      className="font-mentra text-lg opacity-50  "
                    >
                      {product.brand}
                    </h1>
                    <h1
                      title={product.companymodel}
                      className="font-mentra text-xl  "
                    >
                      {product.companymodel}
                    </h1>
                    <p>{product.about}</p>
                    <div className="my-2 flex flex-col  w-full  ">
                      <div className="font-semibold text-lg w-full">
                        &#8377; {product.price} | {product.brand} |{" "}
                        {product.colorway}
                      </div>
                      <div className="flex gap-4 mt-8">
                        {sizes.map((item, index) => (
                          <div
                            onClick={() => setSize(item)}
                            className={`border border-black text-black bg-white hover:bg-black hover:text-white active:bg-black active:text-white px-2 py-1 rounded cursor-pointer ${
                              size === item ? "!bg-black text-white" : ""
                            }`}
                            key={index}
                          >
                            {item}
                          </div>
                        ))}
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
