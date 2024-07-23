import React from "react";
import { useDragLayer } from "react-dnd";
import "../styles/ViewTextImage.css";

export const ViewTextAndImage = ({
  isDragging,
  content,
  width,
  isResizing,
}) => {
  return (
    <div
      style={isResizing ? { cursor: "not-allowed" } : {}}
      className="wrapper"
    >
      <div
        className=""
        style={{
          padding: 0,
          width:
            width === "100%" || width >= 600
              ? "32%"
              : width > 320 && width < 600
              ? "45%"
              : "100%",
          ...(isDragging && { border: "2px solid green" }),
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ lineHeight: 1.4, fontSize: 18 }}>{content.title}</div>
          <img
            src={content.image}
            alt="img"
            style={{ width: "100%", marginTop: 14, marginBottom: 14 }}
          />
          <div
            style={{ lineHeight: 1.4 }}
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
        </div>
      </div>
    </div>
  );
};
