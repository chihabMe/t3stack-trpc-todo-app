import React from "react";
import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <GridLoader size={10} color={"#5014B8"} />
    </div>
  );
};

export default Loader;
