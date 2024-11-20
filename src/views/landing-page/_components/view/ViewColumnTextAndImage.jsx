import React, { forwardRef } from "react";
import { useHandleClickTarget } from "../../../../hooks/useHandleClickTarget";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";

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
      setSectionContentRef = null,
      focusedIndexSectionContent = null,
    },
    ref
  ) => {
    const stylesBg = useBackgroundStyles(content);

    return (
      <div
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
        className={`tw-flex tw-flex-row tw-justify-center tw-items-center tw-flex-wrap tw-p-3 tw-gap-y-3 ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
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

        {content.content.map((section) => (
          <div
            ref={(el) => {
              if (setSectionContentRef) {
                setSectionContentRef(el, section.id);
              }
            }}
            style={{
              zIndex: 2,
              ...(focusedIndexSectionContent === section.id && {
                border: "2px solid green",
              }),
            }}
            key={section.id}
            className={
              isPreview
                ? `tw-flex  ${
                    width === "100%" || width >= 640
                      ? `${content?.wrapperStyle?.maxColumn}`
                      : width > 320 && width < 640
                      ? "tw-w-1/3"
                      : "tw-w-full"
                  }   ${
                    focusedIndexSectionContent === section.id
                      ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                      : ""
                  } `
                : `tw-flex tw-w-full sm:tw-w-1/3 md:${
                    content?.wrapperStyle?.maxColumn
                  } ${
                    focusedIndexSectionContent === section.id
                      ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20"
                      : ""
                  }  `
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
