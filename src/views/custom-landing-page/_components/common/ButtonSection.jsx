import React from "react";

const ButtonSection = ({ size, children, onClick }) => {
  let sizeClasses;

  switch (size) {
    case "small":
      sizeClasses = "px-2 py-1 text-xs";
      break;
    case "medium":
      sizeClasses = "px-4 py-2 text-sm";
      break;
    case "large":
      sizeClasses = "px-6 py-3 text-base";
      break;
    case "extra-large":
      sizeClasses = "px-8 py-4 text-lg";
      break;
    default:
      sizeClasses = "px-4 py-2 text-sm";
  }

  return (
    <button
      className={`bg-blue-500 text-white rounded ${sizeClasses} hover:bg-blue-700`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonSection;
