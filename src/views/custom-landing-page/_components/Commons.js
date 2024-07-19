import React from "react";
import { useDragLayer } from "react-dnd";
import "../styles/ViewTextImage.css";

export const ViewTextAndImage = ({ tempSections, width, isResizing }) => {
  const { id, isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    id: monitor.getItem()?.id,
  }));
  return (
    <div
      style={isResizing ? { cursor: "not-allowed" } : {}}
      className="wrapper"
    >
      {tempSections.map((item, i) => (
        <div
          className=""
          key={i}
          style={{
            padding: 0,
            width:
              width === "100%" || width >= 600
                ? "32%"
                : width > 320 && width < 600
                ? "45%"
                : "100%",
            ...(isDragging && item.id === id && { border: "2px solid green" }),
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ lineHeight: 1.4, fontSize: 18 }}>
              {item.content.title}
            </div>
            <img
              src={item.content.image}
              alt="img"
              style={{ width: "100%", marginTop: 14, marginBottom: 14 }}
            />
            <div
              style={{ lineHeight: 1.4 }}
              dangerouslySetInnerHTML={{ __html: item.content.description }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
