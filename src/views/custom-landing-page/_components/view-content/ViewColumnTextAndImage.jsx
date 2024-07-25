import React, { forwardRef } from "react";

const ViewColumnTextAndImage = forwardRef(
  ({ isDragging, width, isResizing, content, isFocused }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
        }}
        className="flex flex-row justify-center items-center flex-wrap p-4 gap-3"
      >
        {content.map((section) => (
          <div
            style={{
              padding: 0,
              width:
                width === "100%" || width >= 600
                  ? "32%"
                  : width > 320 && width < 600
                  ? "45%"
                  : "100%",
            }}
            key={section.id}
            className="text-center"
          >
            <div style={{ lineHeight: 1.4, fontSize: 18 }}>
              {section.content?.title}
            </div>
            <img
              src={section.content?.image}
              alt="img"
              style={{ width: "100%", marginTop: 14, marginBottom: 14 }}
            />
            <div
              style={{ lineHeight: 1.4 }}
              dangerouslySetInnerHTML={{ __html: section.content?.description }}
            />
          </div>
        ))}
      </div>
    );
  }
);

export default ViewColumnTextAndImage;
