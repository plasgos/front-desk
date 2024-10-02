import React, { forwardRef } from "react";

const ViewScrollTraget = forwardRef(
  ({ isDragging, content, isResizing, isFocused }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
        }}
        className={`${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }`}
      >
        <div id={content.content.name}></div>
      </div>
    );
  }
);

export default ViewScrollTraget;
