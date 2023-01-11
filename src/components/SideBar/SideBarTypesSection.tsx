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
          <InboxIcon className="  h-6 w-6 text-primary " />
        </div>
        <span className=" text-sm font-bold  capitalize hover:bg-transparent">
          inbox
        </span>
      </SideBarItem>
      <SideBarItem className="flex-start  !justify-start   ">
        <div className="p-0 hover:bg-transparent">
          <CalendarIcon className="  h-6 w-6 text-secondary " />
        </div>
        <span className=" text-sm font-bold  capitalize hover:bg-transparent">
          today
        </span>
      </SideBarItem>
      <SideBarItem className="flex-start  !justify-start   ">
        <div className="p-0 hover:bg-transparent">
          <HashtagIcon className="  text-cyan-800k h-6 w-6 " />
        </div>
        <span className=" text-sm font-bold  capitalize hover:bg-transparent">
          tags
        </span>
      </SideBarItem>
    </ul>
  );
};

export default SideBarTypesSection;
