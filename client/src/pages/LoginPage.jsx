import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-mentra ">Login</h1>
      <form className="flex flex-col gap-4 py-4 my-2 bg-[#EEE1CF] rounded-lg p-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
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
      </form>
    </div>
  );
};

export default LoginPage;
