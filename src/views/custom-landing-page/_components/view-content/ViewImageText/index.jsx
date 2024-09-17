import React, { forwardRef } from "react";
import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";
import ViewPage from "./ViewPage";

const ViewImageText = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    return (
      <div
        key={content.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className=" tw-flex tw-flex-row tw-flex-wrap  tw-items-center "
      >
        <div style={stylesBg.backgroundImgStyle}></div>

        {content.background?.opacity ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor:
                content.background?.opacity < 0 ? "black" : "white",
              opacity: Math.abs(stylesBg.calculateOpacity),
            }}
          ></div>
        ) : null}

        {content?.variant?.group === "Page" && <ViewPage content={content} />}
      </div>
    );
  }
);

export default ViewImageText;
