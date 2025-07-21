import React, { useState } from "react";
import ReleasesModal from "./ReleasesModal";

const PatchNotes = ({ hidden, setHidden, nav }) => {
  const [showModal3, setShowModal3] = useState(false);
  return (
    <>
      <ReleasesModal showModal3={showModal3} setShowModal3={setShowModal3} />
      <div
        className={` lg:w-screen w-[80%] px-4 h-2rem bg-white text-center flex flex-row justify-center  py-2 z-50 transition-all ${
          hidden ? "hidden" : ""
        } ${nav ? "hidden" : "flex"} `}
      >
        <p className="flex flex-wrap text-start text-xs">
          To know more about the development cycle of this website, click{" "}
          <span
            onClick={() => {
              setShowModal3(true);
              setHidden(true);
              window.scrollTo({
                top: 640,
                behavior: "smooth",
              });
            }}
            className="cursor-pointer underline lg:mx-1 mr-1 inline"
          >
            here
          </span>
          or check out the footer.
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 absolute left-[85%] lg:left-[95%] top-1 cursor-pointer"
          onClick={() => {
            setHidden(true);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </>
  );
};

export default PatchNotes;
