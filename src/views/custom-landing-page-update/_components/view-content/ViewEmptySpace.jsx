import React, { forwardRef } from "react";

const ViewEmptySpace = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          height: content?.height,
        }}
        className={`${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }`}
      ></div>
    );
  }
);

export default ViewEmptySpace;
