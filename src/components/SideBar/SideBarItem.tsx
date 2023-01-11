import React, { ReactNode } from "react";

const SideBarItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <li
      className={`flex cursor-pointer flex-row items-center justify-between rounded-md px-2 text-sm  font-medium hover:bg-gray-700 ${className} `}
    >
      {children}
    </li>
  );
};

export default SideBarItem;
