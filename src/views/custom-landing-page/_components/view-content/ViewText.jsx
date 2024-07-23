import React from "react";

const ViewText = ({ isDragging, width, isResizing, content }) => {
  return (
    <div
      style={
        (isResizing && { cursor: "not-allowed" },
        {
          color: content?.style?.color,
          ...(isDragging && { border: "2px solid green" }),
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
};

export default ViewText;
