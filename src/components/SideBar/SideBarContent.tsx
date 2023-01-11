import React from "react";
import SideBarProjectsSection from "./SideBarProjectsSection";
import SideBarTypesSection from "./SideBarTypesSection";

const SideBarContent = () => {
  return (
    <div className="menu w-80 bg-base-100 p-4  text-gray-300">
      <SideBarTypesSection />
      <SideBarProjectsSection />
    </div>
  );
};

export default SideBarContent;
