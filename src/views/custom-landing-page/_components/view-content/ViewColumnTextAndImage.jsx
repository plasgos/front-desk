import React from "react";

const ViewColumnTextAndImage = ({ isDragging, width, isResizing, content }) => {
  console.log("🚀 ~ ViewColumnTextAndImage ~ content:", content);
  return (
    <div
      style={isResizing ? { cursor: "not-allowed" } : {}}
      className="flex flex-row justify-center flex-wrap py-4 gap-3"
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
        {content.map((section) => (
          <div key={section.id} className="text-center">
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
    </div>
  );
};

export default ViewColumnTextAndImage;
