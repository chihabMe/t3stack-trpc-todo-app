import React from "react";
import SideBarItem from "./SideBarItem";
import SideBarTitle from "./SideBarTitle";
import {
  HashtagIcon,
  InboxIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

const SideBarTypesSection = () => {
  return (
    <ul className="flex flex-col ">
      <SideBarItem className="flex-start  !justify-start   ">
        <div className="p-0 hover:bg-transparent">
          <InboxIcon className="  h-6 w-6 text-gray-800 dark:text-gray-200 " />
        </div>
        <span className=" text-sm font-bold capitalize  text-gray-700  hover:bg-transparent dark:text-gray-100">
          inbox
        </span>
      </SideBarItem>
      <SideBarItem className="flex-start  !justify-start   ">
        <div className="p-0 hover:bg-transparent">
          <CalendarIcon className="  h-6 w-6 text-secondary " />
        </div>
        <span className=" text-sm font-bold capitalize  text-gray-700  hover:bg-transparent dark:text-gray-100">
          today
        </span>
      </SideBarItem>
      <SideBarItem className="flex-start  !justify-start   ">
        <div className="p-0 hover:bg-transparent">
          <HashtagIcon className="  h-6 w-6 text-cyan-800 " />
        </div>
        <span className=" text-sm font-bold capitalize  text-gray-700  hover:bg-transparent dark:text-gray-100">
          tags
        </span>
      </SideBarItem>
    </ul>
  );
};

export default SideBarTypesSection;
