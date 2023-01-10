import React from "react";
import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <GridLoader size={12} color={"teal"} />
    </div>
  );
};

export default Loader;
