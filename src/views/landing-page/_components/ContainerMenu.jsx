import React from "react";

const ContainerMenu = ({
  children,
  className = "border tw-rounded-sm p-2",
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default ContainerMenu;
