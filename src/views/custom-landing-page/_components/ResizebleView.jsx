import React from "react";

const ResizableView = ({
  pageSetting,
  children,
  dimensions,
  isSelectedView,
  isResizing,
  handleMouseDown,
  containerRef,
}) => {
  return (
    <div
      className="mx-auto border"
      style={{
        position: "relative",
        width: dimensions.width,
        maxWidth: 1024,
        height: dimensions.height,
        maxHeight: "98%",
        overflowY: "auto",
        flex: isSelectedView === "laptop" ? "1 1 0%" : "initial",
        transition: "transform 0.4s ease 0s",
        transformOrigin: "center top",
        minHeight: isSelectedView === "phone" ? "100%" : "initial",
        border: "1px solid black",
        backgroundColor: pageSetting.bgColor, //
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: pageSetting.maxWidth, //
          height: "100%",
          margin: "auto",
        }}
      >
        {children}

        {isSelectedView !== "laptop" && (
          <>
            <div
              style={{
                width: 10,
                height: "100%",
                backgroundColor: "transparent",
                position: "absolute",
                left: 0,
                top: 0,
                cursor: isResizing ? "not-allowed" : "w-resize",
              }}
              onMouseDown={(e) => handleMouseDown(e, "left")}
            ></div>
            <div
              style={{
                width: 10,
                height: "100%",
                backgroundColor: "transparent",
                position: "absolute",
                right: 0,
                top: 0,
                cursor: isResizing ? "not-allowed" : "e-resize",
              }}
              onMouseDown={(e) => handleMouseDown(e, "right")}
            ></div>
            <div
              style={{
                width: "100%",
                height: 10,
                backgroundColor: "transparent",
                position: "absolute",
                left: 0,
                top: 0,
                cursor: isResizing ? "not-allowed" : "n-resize",
              }}
              onMouseDown={(e) => handleMouseDown(e, "top")}
            ></div>
            <div
              style={{
                width: "100%",
                height: 10,
                backgroundColor: "transparent",
                position: "absolute",
                left: 0,
                bottom: 0,
                cursor: isResizing ? "not-allowed" : "s-resize",
              }}
              onMouseDown={(e) => handleMouseDown(e, "bottom")}
            ></div>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: "transparent",
                position: "absolute",
                right: 0,
                bottom: 0,
                cursor: isResizing ? "not-allowed" : "se-resize",
              }}
              onMouseDown={(e) => handleMouseDown(e, "bottomRight")}
            ></div>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: "transparent",
                position: "absolute",
                left: 0,
                bottom: 0,
                cursor: isResizing ? "not-allowed" : "sw-resize",
              }}
              onMouseDown={(e) => handleMouseDown(e, "bottomLeft")}
            ></div>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: "transparent",
                position: "absolute",
                left: 0,
                top: 0,
                cursor: isResizing ? "not-allowed" : "nw-resize",
              }}
              onMouseDown={(e) => handleMouseDown(e, "topLeft")}
            ></div>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: "transparent",
                position: "absolute",
                right: 0,
                top: 0,
                cursor: isResizing ? "not-allowed" : "ne-resize",
              }}
              onMouseDown={(e) => handleMouseDown(e, "topRight")}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResizableView;
