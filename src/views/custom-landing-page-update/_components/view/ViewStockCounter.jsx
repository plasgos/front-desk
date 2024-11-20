import React, { forwardRef } from "react";
import useAnimatedVisibility from "../../../../hooks/useAnimatedVisibility";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewStockCounter = forwardRef(
  ({ isDragging, isResizing, content, isFocused }, ref) => {
    const stylesBg = useBackgroundStyles(content);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(content);

    const { currentStock, maxStock } = content?.content?.design;

    const cleanContent = content?.content?.text?.text
      .replace(/<p>/g, "<div>")
      .replace(/<\/p>/g, "</div>")
      .replace(/{{stock}}/g, currentStock);

    const widhtPercentage = (currentStock / maxStock) * 100;
    return (
      <div
        key={content.id}
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && {
            border: "2px solid green",
          }),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "relative",
          zIndex: 1,
        }}
        className={` tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center tw-px-3  ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast tw-bg-green-300/20"
        } `}
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

        <div
          className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-my-2 tw-max-w-full`}
        >
          <div
            style={{
              color: content?.content?.text?.textColor,
              textShadow: content?.content?.text?.textShadow,
              marginBottom: 10,
            }}
            className={`tw-p-2 ${content?.content?.text?.fontSize} ${content.content?.text?.textAlign}`}
            dangerouslySetInnerHTML={{ __html: cleanContent }}
          />

          <div
            className={`${content?.content?.design?.outerShadow} tw-max-w-full `}
            style={{
              width: content?.content?.design?.width,
              height: content?.content?.design?.height,
              outline: `${content?.content?.design?.borderWidth}px solid ${content?.content?.design?.outlineColor}`,
              borderRadius: content?.content?.design?.outerRounded,
              backgroundColor: content?.content?.design?.bgColor,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              ref={elementRef}
              style={{
                width: `${widhtPercentage}%`,
                height: content?.content?.design?.height,
                backgroundImage: `linear-gradient(to right, ${content?.content?.design?.startColor}, 
                ${content?.content?.design?.finishColor})`,
                borderRadius: `0px ${content?.content?.design?.innerRounded}px ${content?.content?.design?.innerRounded}px 0px`,
                position: "absolute",
                top: 0,
                left: 0,
                "--animation-duration": `${duration}s`,
                "--target-width": `${widhtPercentage}%`,
              }}
              className={`${getClassName()} ${
                content?.content?.design?.innerShadow
              }`}
            ></div>
          </div>
        </div>
      </div>
    );
  }
);

export default ViewStockCounter;
