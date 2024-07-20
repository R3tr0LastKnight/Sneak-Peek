import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import s1 from "../assets/carousel/s1.jpg";
import s2 from "../assets/carousel/s2.jpg";
import s3 from "../assets/carousel/s3.jpg";
import axios from "axios";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Dock, DockIcon } from "./magicui/dock.tsx";
import linked from "../assets/nav/icons8-linkedin.svg";
import git from "../assets/nav/icons8-github.svg";
import insta from "../assets/nav/icons8-insta.svg";
import twitter from "../assets/nav/icons8-twitter.svg";

const ContactUs = ({ showModal, setShowModal, productId }) => {
  const [imgg, setImgg] = useState([s1, s2, s3]);
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(10);
  const auth = JSON.parse(localStorage.getItem("auth"));
  // const userId = auth.user._id;
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

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
                        {...register("Name", { required: true })}
                      />
                      <input
                        className="border border-black px-2 py-1 rounded"
                        type="text"
                        placeholder="Email"
                        {...register("Email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                      <textarea
                        className="border border-black px-2 py-1 rounded"
                        type="text"
                        placeholder="Message`"
                        {...register("Message`", {})}
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
                    <Dock magnification={100} distance={100}>
                      <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
                        <img src={linked} alt="" />
                      </DockIcon>
                      <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
                        <img src={git} alt="" />
                      </DockIcon>
                      <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
                        <img src={insta} alt="" />
                      </DockIcon>
                      <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
                        <img src={twitter} alt="" />
                      </DockIcon>
                    </Dock>
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

export default ContactUs;
