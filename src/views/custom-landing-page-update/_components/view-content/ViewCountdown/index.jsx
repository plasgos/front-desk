import React, { forwardRef } from "react";
import DateCountDown from "./DateCountDown";
import { useBackgroundStyles } from "../../../../../hooks/useBackgroundStyles";
import DurationCountdown from "./DurationCountdown";

const ViewCountDown = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    const { textAlign } = content?.finish;

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
        className={` tw-flex tw-flex-row tw-flex-wrap ${textAlign} tw-px-3 tw-items-center ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }  `}
      >
        {content?.background?.bgImage ? (
          <div style={stylesBg.backgroundImgStyle}></div>
        ) : content?.background?.bgType === "gradient" ? (
          <div style={stylesBg.gradientStyle}></div>
        ) : content?.background?.bgType === "pattern" ? (
          <div style={stylesBg.backgroundPatternStyle}></div>
        ) : null}

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

        {content?.content?.typeTarget === "date" && (
          <DateCountDown content={content} />
        )}

        {content?.content?.typeTarget === "duration" && (
          <DurationCountdown content={content} />
        )}
      </div>
    );
  }
);

export default ViewCountDown;
