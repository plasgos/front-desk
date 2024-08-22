import React, { forwardRef } from "react";
import { useHandleClickTarget } from "../../../../hooks/useHandleClickTarget";

const ViewColumnTextAndImage = forwardRef(
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
    return (
      <div
        ref={ref}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(isDragging ? { border: "2px solid green" } : {}),
          ...(isFocused && { border: "2px solid green" }),
        }}
        className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-flex-wrap tw-p-3 tw-gap-y-3"
      >
        {content.content.map((section) => (
          <div
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
              onClick={() => useHandleClickTarget(section.target, containerRef)}
              className={`tw-w-full tw-text-center tw-px-${content?.wrapperStyle?.paddingX}  `}
            >
              <div
                style={{ color: content?.wrapperStyle?.colorTitle }}
                className={` ${content?.wrapperStyle?.fontSizeTitle} tw-leading-normal`}
              >
                {section.content?.title}
              </div>

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
              <div
                style={{
                  lineHeight: 1.4,
                  color: content?.wrapperStyle?.colorDescription,
                }}
                dangerouslySetInnerHTML={{
                  __html: section.content?.description,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default ViewColumnTextAndImage;
