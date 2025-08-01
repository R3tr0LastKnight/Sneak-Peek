import React, { useEffect, useState } from "react";
import Carousels from "./Carousels";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import PatchNotes from "./PatchNotes";

const Nav = () => {
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
    },
  };

  const [nav, setNav] = useState(false);
  const [drop, setDrop] = useState(false);
  const [login, setLogin] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { isLoggedIn, logIn, logOut, profile, isAdmin } = useAuth();

  useEffect(() => {
    // Only try to show photo if it exists
    if (profile?.photoURL) {
      const timer = setTimeout(() => {
        setShowPhoto(true);
      }, 2000); // Delay of 2 seconds

      return () => clearTimeout(timer); // Cleanup
    }
  }, [profile]);

  const changeNav = () => {
    window.scrollY >= 0 ? setNav(true) : setNav(false);
    window.scrollY <= 200 ? setNav(false) : setNav(true);
  };
  window.addEventListener("scroll", changeNav);
  return (
    <>
      <PatchNotes hidden={hidden} setHidden={setHidden} nav={nav} />
      <div
        className={`flex justify-between py-2 pt-4 fixed  z-50 px-4  w-full transition-all items-center  ${
          nav
            ? "text-black bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
            : "text-white"
        } ${hidden ? " top-0" : ""}`}
      >
        <NavLink
          to={"/"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className=" text-xl lg:text-3xl font-mentra font-extralight relative w-1/3 lg:w-auto flex  mt-1"
        >
          Sneak Peek
        </NavLink>
        <ul
          className={`flex gap-1 border items-center lg:px-2 py-1 rounded-xl relative ${
            nav ? "border-black" : "border-white"
          } ${login ? "" : ""}`}
        >
          {isLoggedIn ? (
            <>
              <li
                className={`border-r  px-2 ${
                  nav ? "border-black" : "border-white"
                }`}
              >
                <NavLink
                  onClick={() =>
                    window.scrollTo({
                      top: 640,
                      behavior: "smooth",
                    })
                  }
                  to={"/kart"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </NavLink>
              </li>
              <li
                className={`border-r  px-2 ${
                  nav ? "border-black" : "border-white"
                }`}
              >
                <NavLink
                  onClick={() =>
                    window.scrollTo({
                      top: 640,
                      behavior: "smooth",
                    })
                  }
                  to={"/wishlist"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </NavLink>
              </li>
              <li
                onClick={() => {
                  setDrop(!drop);
                }}
                className="flex gap-2 mx-2 items-center cursor-pointer"
              >
                <h1 className="text-sm">{profile && profile.name}</h1>
                {showPhoto && profile?.photoURL ? (
                  <div className="flex overflow-hidden rounded-full">
                    <img
                      className="w-6 h-6"
                      src={profile.photoURL}
                      referrerPolicy="no-referrer"
                      alt="profile pic"
                    />
                  </div>
                ) : (
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
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </li>

              <motion.div
                className="p-4 absolute rounded-xl bg-white text-black  right-0 top-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border"
                initial="exit"
                animate={drop ? "enter" : "exit"}
                variants={subMenuAnimate}
              >
                <div
                  onClick={() => {
                    setDrop(!drop);
                  }}
                  className={`flex flex-col gap-1 ${drop ? "" : "hidden"}`}
                >
                  {isAdmin && (
                    <NavLink
                      onClick={() =>
                        window.scrollTo({
                          top: window.innerHeight,
                          behavior: "smooth",
                        })
                      }
                      className="flex items-center gap-1 cursor-pointer"
                      to={"/admindash"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                        />
                      </svg>
                      <h1 className="flex items-center">Admin</h1>
                    </NavLink>
                  )}
                  <div
                    onClick={() => {
                      setDrop(!drop);
                    }}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <NavLink
                      onClick={() =>
                        window.scrollTo({
                          top: window.innerHeight,
                          behavior: "smooth",
                        })
                      }
                      className="flex items-center gap-1 cursor-pointer"
                      to={"/settings"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>

                      <h1 className="flex items-center">Settings</h1>
                    </NavLink>
                  </div>
                  <div
                    onClick={async () => {
                      setDrop(!drop);
                      try {
                        await signOut(auth); // Sign out from Firebase (handles Google too)
                        logOut(); // Your custom function to clear app state
                      } catch (error) {
                        console.error("Error signing out:", error);
                      }
                    }}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>

                    <h1 className="flex items-center">Logout</h1>
                  </div>
                </div>
              </motion.div>
            </>
          ) : (
            <NavLink
              to={"/login"}
              className={`text- w-full text-center py-1 cursor-pointer px-4`}
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              Login / Register
            </NavLink>
          )}
        </ul>
      </div>
      <Carousels />
    </>
  );
};

export default Nav;
