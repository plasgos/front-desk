import React, { forwardRef } from "react";

const ViewText = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    return (
      <div
        ref={ref}
        style={
          (isResizing && { cursor: "not-allowed" },
          {
            color: content?.style?.color,
            ...(isDragging && { border: "2px solid green" }),
            ...(isFocused && { border: "2px solid green" }),
          })
        }
        className={`${content?.style?.textAlign} my-2`}
      >
        {content.editorHtml && (
          <div
            className="p-2"
            dangerouslySetInnerHTML={{ __html: content.editorHtml }}
          />
        )}
      </div>
    );
  }
);

export default ViewText;
