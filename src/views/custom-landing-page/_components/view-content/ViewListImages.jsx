import React, { forwardRef } from "react";
import { useHandleClickTarget } from "../../../../hooks/useHandleClickTarget";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewListImages = forwardRef(
  (
    {
      containerRef,
      isDragging,
      width,
      isResizing,
      content,
      isFocused,
      isPreview,
    },
    ref
  ) => {
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
        className=" tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center tw-p-3 tw-gap-y-3 "
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

        {content.content.map((section) => {
          return (
            <div
              style={{ zIndex: 2 }}
              key={section.id}
              className={
                isPreview
                  ? `tw-flex  ${
                      width === "100%" || width >= 640
                        ? `${content?.wrapperStyle?.maxColumn}`
                        : width > 320 && width < 640
                        ? "tw-w-1/3"
                        : "tw-w-full"
                    }  `
                  : `tw-flex tw-w-full sm:tw-w-1/3 md:${content?.wrapperStyle?.maxColumn} `
              }
            >
              <div
                style={{
                  ...(Object.keys(section.target).length > 0
                    ? { cursor: "pointer" }
                    : {}),
                }}
                onClick={() =>
                  useHandleClickTarget(section.target, containerRef)
                }
                className={`tw-w-full tw-text-center tw-px-${content?.wrapperStyle?.paddingX}  `}
              >
                <img
                  src={section.content?.image}
                  alt={section.content?.alt ? section.content.alt : ""}
                  style={{
                    width: "100%",
                    marginTop: 14,
                    marginBottom: 14,
                    aspectRatio: content?.wrapperStyle?.aspectRatio,
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewListImages;
