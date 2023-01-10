import { NextPage } from "next";
import { signIn } from "next-auth/react";
import React from "react";

const login: NextPage = () => {
  return (
    <div className="h-screen w-full items-center justify-center">
      <button
        className="cursor-pointer rounded-md bg-blue-400 px-4 py-2 text-white"
        onClick={() => {
          signIn();
        }}
      >
        login
      </button>
    </div>
  );
};

export default login;
