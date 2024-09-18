import React, { forwardRef } from "react";
import { useHandleClickTarget } from "../../../../hooks/useHandleClickTarget";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

const ViewImage = forwardRef(
  ({ containerRef, isDragging, isResizing, content, isFocused }, ref) => {
    console.log("🚀 ~ content:", content);
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
        className=" tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center  "
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
              style={{
                width:
                  content.wrapperStyle.variant === "full"
                    ? "100%"
                    : content.wrapperStyle.width,
              }}
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
                className={`tw-w-full   `}
              >
                {section.isDownloadImage ? (
                  <div
                    style={{
                      backgroundImage: `url(${section.image})`,
                      backgroundSize: "cover",
                      transform: `rotate(${content.wrapperStyle.rotation}deg)`,
                      transition: "transform 0.5s ease",
                      width: "100%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      paddingBottom: "100%",
                      border: content.wrapperStyle.borderColor
                        ? `1px solid ${content.wrapperStyle.borderColor}`
                        : "",
                    }}
                  ></div>
                ) : (
                  <img
                    className={`${
                      content.wrapperStyle.shadow
                        ? content.wrapperStyle.shadow
                        : ""
                    }`}
                    src={section.image}
                    alt={section.alt ? section.alt : ""}
                    style={{
                      width: "100%",
                      transform: `rotate(${content.wrapperStyle.rotation}deg)`,
                      transition: "transform 0.5s ease",
                      objectFit: "contain",
                      border: content.wrapperStyle.borderColor
                        ? `1px solid ${content.wrapperStyle.borderColor}`
                        : "",
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewImage;
