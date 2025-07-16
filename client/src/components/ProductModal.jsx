import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const ProductModal = ({ showModal, setShowModal, productId }) => {
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(10);
  const auth = JSON.parse(localStorage.getItem("auth"));
  let userId = null;
  if (auth) {
    userId = auth.user._id;
  }
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
      y: "70px",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  let sizes = [1, 3, 4, 5, 6, 7, 8, 10, 11, 12];

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

  const addToCart = async () => {
    // Replace with actual user ID logic
    const productToAdd = {
      productId: productId,
      size: size,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/addtoCart`,
        {
          products: [productToAdd],
          userId: userId,
        }
      );

      toast.success("Product added to Cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  useLockBodyScroll();

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
                  <div className="h-[11rem] lg:h-[35rem] overflow-hidden relative items-center justify-center">
                    <img
                      src={product.photos}
                      className="w-full h-full absolute "
                      alt=""
                    />
                  </div>
                </div>
                <div className="lg:w-[40%]  flex flex-col justify-center ">
                  <div className="w-full flex flex-col lg:justify-between px-4 lg:px-16 py-8 ">
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
                      {auth ? (
                        <div className="grid grid-cols-5 text-center lg:flex gap-4 mt-8">
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
                      ) : (
                        <></>
                      )}

                      {auth ? (
                        <>
                          <div className="flex my-4" onClick={addToCart}>
                            <button className="flex justify-center py-1 px-2 rounded transition-all w-full lg:w- text-center border border-black bg-white  text-black hover:bg-black hover:text-white ">
                              Add to cart
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <NavLink
                            to={"/login"}
                            className={`text- w-full text-center py-1 cursor-pointer px-4`}
                            onClick={() => {
                              setShowModal(false);
                              window.scrollTo({
                                top: window.innerHeight,
                                behavior: "smooth",
                              });
                            }}
                          >
                            <div className="flex my-4">
                              <button className="flex justify-center py-4 px-2 rounded transition-all w-full lg:w- text-center border border-black bg-white  text-black hover:bg-black hover:text-white ">
                                Register / Login
                              </button>
                            </div>
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <Toaster />
    </AnimatePresence>
  );
};

export default ProductModal;
