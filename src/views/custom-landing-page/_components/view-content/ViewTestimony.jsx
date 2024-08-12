import React, { forwardRef } from "react";

const ViewTestimony = forwardRef(
  ({ containerRef, isDragging, content, isResizing, isFocused }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
        }}
      >
        ViewTestimony
      </div>
    );
  }
);

export default ViewTestimony;
