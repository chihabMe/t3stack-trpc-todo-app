import { Bars3Icon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import SideBarContent from "./SideBarContent";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState("");

  const clickHandler = () => {
    setIsOpen(!isOpen);

    // I'm still testing this part:
    setTimeout(() => {
      setHide("z-n1");
    }, 1000);
  };

  const fullPage = isOpen ? "fixed h-screen w-full z-20" : hide;

  console.log("OPEN:", isOpen);
  return (
    <>
      <label
        htmlFor="my-drawer"
        className=" btn-ghost drawer-button btn    z-30"
        onClick={clickHandler}
      >
        <Bars3Icon className="h-7 w-7 text-gray-300" />
      </label>

      <div
        className={` ${
          !isOpen && "!-z-10"
        } drawer-start drawer fixed h-screen w-full rounded-lg ${fullPage} `}
      >
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
        />
        <div className={` drawer-side`}>
          <label
            htmlFor="my-drawer"
            className="drawer-overlay"
            onClick={clickHandler}
          ></label>
          <SideBarContent />
        </div>
      </div>
    </>
  );
};

export default SideBar;
