import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import s1 from "../assets/carousel/s1.jpg";
// import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Dockx from "./Dockx.jsx";
import { Bounce, toast } from "react-toastify";

const ContactUs = ({ showModal, setShowModal, productId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      reset();
      toast.info(
        "Message delivered unto the void. Thy words now echo in distant halls...",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

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
            <div className="px-4 lg:px-16 pt-8 lg:py-4 w-full">
              <div className="rounded-xl overflow-hidden flex flex-col lg:flex-row-reverse shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white relative w-full">
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
                  <div className="h-[15rem] lg:h-[35rem] overflow-hidden relative items-center justify-center">
                    <img src={s1} className="w-full h-full absolute " alt="" />
                  </div>
                </div>
                <div className="lg:w-[40%]  flex flex-col my-8 ">
                  <div className="w-full flex flex-col  px-16 py-8 ">
                    <h1 className="font-mentra text-xl  ">Contact Us</h1>
                    <form
                      className="flex flex-col gap-4 my-6"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <input
                        className="border border-black px-2 py-1 rounded"
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: "Name is required" })}
                      />
                      <input
                        className="border border-black px-2 py-1 rounded"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      <textarea
                        className="border border-black px-2 py-1 rounded"
                        placeholder="Message"
                        {...register("message", {
                          required: "Message is required",
                        })}
                      />
                      <button
                        type="submit"
                        className="flex justify-center py-1 px-2 rounded transition-all w-full lg:w- text-center border border-black bg-white  text-black hover:bg-black hover:text-white "
                      >
                        Send
                      </button>
                    </form>
                  </div>
                  <hr className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-black border-dashed mx-8" />
                  <div className="relative">
                    <Dockx />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* <Toaster /> */}
    </AnimatePresence>
  );
};

export default ContactUs;
