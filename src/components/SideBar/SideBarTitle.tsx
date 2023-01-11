import React from "react";

const SideBarTitle = ({ text }: { text: string }) => {
  return (
    <h1 className="py-2 font-bold capitalize text-gray-800 dark:text-gray-200 ">
      {text}
    </h1>
  );
};

export default SideBarTitle;
