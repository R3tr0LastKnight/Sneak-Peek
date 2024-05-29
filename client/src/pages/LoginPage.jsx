import React, { useState } from "react";

const LoginPage = () => {
  const [state, setState] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center py-8 select-none">
      {state ? (
        <h1 className="text-3xl font-mentra ">Login</h1>
      ) : (
        <h1 className="text-3xl font-mentra ">Register</h1>
      )}

      <form className="flex flex-col gap-4 py-4 my-2 bg-[#EEE1CF] rounded-lg p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {!state && (
          <div className="flex justify-between items-center gap-2 font-semibold ">
            <label htmlFor="">Name</label>
            <input className="rounded py-1 px-2" type="text" name="" id="" />
          </div>
        )}
        <div className="flex justify-between items-center gap-2 font-semibold ">
          <label htmlFor="">Email</label>
          <input className="rounded py-1 px-2" type="email" name="" id="" />
        </div>

        <div className="flex justify-between items-center gap-2 font-semibold ">
          <label htmlFor="">Password</label>
          <input className="rounded py-1 px-2" type="password" name="" id="" />
        </div>
        <button className="font-bold px-16 mt-2 py-2 bg-white flex items-center justify-center mx-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          Login
        </button>
        {!state ? (
          <p className="flex items-center justify-center flex-col">
            already a member?
            <div
              className="underline hover:dotted cursor-pointer font-semibold"
              onClick={() => setState(!state)}
            >
              login here
            </div>
          </p>
        ) : (
          <p className="flex items-center justify-center flex-col">
            new here?
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

        <div className="flex items-center justify-center">
          google login btn idhar
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
