import React, { forwardRef } from "react";

const ResizableView = forwardRef(
  (
    {
      pageSetting,
      children,
      dimensions,
      isSelectedView,
      isResizing,
      handleMouseDown,
    },
    ref
  ) => {
    return (
      <div
        className="mx-auto border"
        style={{
          position: "relative",
          width: dimensions.width,
          height: dimensions.height,
          maxHeight: dimensions.height,
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
          id="scrolly-div"
          ref={ref}
          style={{
            width: "100%",
            height: "100%",
            margin: "auto",
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
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
                  zIndex: 99999,
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
                  zIndex: 99999,
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
                  zIndex: 99999,
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
                  zIndex: 99999,
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
                  zIndex: 99999,
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
                  zIndex: 99999,
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
                  zIndex: 99999,
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
                  zIndex: 99999,
                }}
                onMouseDown={(e) => handleMouseDown(e, "topRight")}
              ></div>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default ResizableView;
