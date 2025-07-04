import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import bg from "../assets/back.jpg";
import { BorderBeam } from "../components/magicui/BorderBeam.tsx";

const LoginPage = () => {
  const [state, setState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useAuth();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const res = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: "application/json",
              },
            }
          );

          const endpoint = state
            ? `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/googleLogin`
            : `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/storeUserData`;

          const response = await axios.post(endpoint, { profile: res.data });

          if (state) {
            const token = response.data.token;
            logIn(response.data, token);
            localStorage.setItem("auth", JSON.stringify(response.data));
          } else {
            console.log("User data stored successfully:", response.data);
          }

          navigate("/");
        } catch (err) {
          console.log(err);
        }
      };

      fetchUserData();
    }
  }, [user, state, logIn, navigate]);

  const handleGoogleRegister = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      toast.success("User registered successfully", {
        autoClose: 1000,
      });
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      toast.success("User login successfully");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`,
        { name, email, password }
      );
      if (res && res.data.success) {
        navigate("/");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const startTime = new Date(); // Record start time

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        const token = res.data.token;
        logIn(res.data, token);
        localStorage.setItem("auth", JSON.stringify(res.data));

        const endTime = new Date(); // Record end time
        const timeTaken = (endTime - startTime) / 1000; // Calculate time taken in seconds

        // Display success toast with time taken
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center lg:py-8 select-none h-[100vh]">
      <div className="flex absolute z-0 max-h-[100vh] shadow-inner">
        <img
          className="hidden lg:flex object-cover"
          style={{ filter: "grayscale(50%)" }}
          src={bg}
          alt=""
        />
      </div>
      <div className="flex flex-col text-center bg-white z-10 p-10 rounded-lg relative">
        {state ? (
          <h1 className="relative z-10 text-3xl font-mentra ">Login</h1>
        ) : (
          <h1 className="relative z-10 text-3xl font-mentra ">Register</h1>
        )}
        <form className=" flex flex-col gap-4 py-4 my-2 bg-[#fff] rounded-lg p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] relative z-10 ">
          {!state && (
            <div className="flex justify-between items-center gap-2 font-semibold ">
              <label htmlFor="">Name</label>
              <input
                className="rounded py-1 px-2 border border-gray-400"
                type="text"
                name=""
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="flex justify-between items-center gap-2 font-semibold ">
            <label htmlFor="">Email</label>
            <input
              className="rounded py-1 px-2 border border-gray-400"
              type="email"
              name=""
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center gap-2 font-semibold ">
            <label htmlFor="">Password</label>
            <input
              className="rounded py-1 px-2 border border-gray-400"
              type="password"
              name=""
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!state ? (
            <button
              onClick={handleRegister}
              className="font-bold px-16 mt-2 py-2 bg-white flex items-center justify-center mx-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] border"
            >
              Forge Thy Pact
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="font-bold px-16 mt-2 py-2 hover:bg-black hover:text-white transition-all flex items-center justify-center mx-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] border"
            >
              Enter the Gate
            </button>
          )}
        </form>
        {!state ? (
          <p className="flex items-center justify-center flex-col">
            Hast thou already sworn the Oath?
            <div
              className="underline hover:dotted cursor-pointer font-semibold"
              onClick={() => setState(!state)}
            >
              login here
            </div>
          </p>
        ) : (
          <p className="flex items-center justify-center flex-col">
            A stranger to these lands, art thou?
            <div
              className="underline hover:dotted cursor-pointer font-semibold"
              onClick={() => setState(!state)}
            >
              create a account
            </div>
          </p>
        )}
        <div className="flex w-full items-center justify-center text-black font-bold gap-2 ">
          <hr className="w-1/3" /> <h1>or</h1> <hr className="w-1/3" />
        </div>
        {state ? (
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={handleGoogleLogin}
              class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-grey-900 hover:border-slate-400 dark:hover:border-slate-500 hover:text-grey-950 font-bold hover:shadow transition duration-150"
            >
              <img
                class="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google logo"
              />
              <span>SignIn with Google</span>
            </button>
          </div>
        ) : (
          <div className="mt-2 flex items-center justify-center">
            <button
              onClick={handleGoogleRegister}
              class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-grey-900 hover:border-slate-400 dark:hover:border-slate-500 hover:text-grey-950 font-bold hover:shadow transition duration-150"
            >
              <img
                class="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>SignUp with Google</span>
            </button>
          </div>
        )}
        <BorderBeam size={100} />
        <BorderBeam reverse size={100} />
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
