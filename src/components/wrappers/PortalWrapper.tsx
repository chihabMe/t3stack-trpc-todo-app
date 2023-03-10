import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

const PortalWrapper = ({
  children,
  id,
}: {
  id: string;
  children: ReactNode;
}) => {
  if (typeof window == "undefined") return <>{children}</>;
  const element = document?.getElementById(id);
  if (!element) return <>{children}</>;
  return createPortal(children, element);
};

export default PortalWrapper;
