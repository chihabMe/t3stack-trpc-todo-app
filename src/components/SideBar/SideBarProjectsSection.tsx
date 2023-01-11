import React from "react";
import SideBarItem from "./SideBarItem";
import SideBarTitle from "./SideBarTitle";

const SideBarProjectsSection = () => {
  return (
    <ul className="flex flex-col">
      <SideBarTitle text="projects" />
      <SideBarItem>
        <span className="hover:bg-transparent">social media web app</span>
        <span className="badge-primary badge indicator-item !h-6 !w-6 !rounded-full !p-2 !text-xs">
          2
        </span>
      </SideBarItem>
      <SideBarItem>
        <span className="hover:bg-transparent">social media web app</span>
        <span className="badge-primary badge indicator-item !h-6 !w-6 !rounded-full !p-2 !text-xs">
          2
        </span>
      </SideBarItem>
      <SideBarItem>
        <span className="hover:bg-transparent">social media web app</span>
        <span className="badge-primary badge indicator-item !h-6 !w-6 !rounded-full !p-2 !text-xs">
          2
        </span>
      </SideBarItem>
    </ul>
  );
};

export default SideBarProjectsSection;
