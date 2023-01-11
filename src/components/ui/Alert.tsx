import React, { useEffect } from "react";

const Alert = ({
  text,
  setShow,
}: {
  text: string;
  setShow: (value: boolean) => void;
}) => {
  useEffect(() => {
    const time = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(time);
  }, []);
  return (
    <div className="alert fixed  left-2 bottom-2 max-w-xs rounded-md shadow-lg">
      <div className="text-sm text-gray-800">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Alert;
