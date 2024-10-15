import React, { forwardRef } from "react";
import useAnimatedVisibility from "../../../../hooks/useAnimatedVisibility";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";
import ViewText from "./ViewText";
import ViewEmptySpace from "./ViewEmptySpace";
import ViewColumnTextAndImage from "./ViewColumnTextAndImage";

const ViewFrame = forwardRef(
  (
    {
      containerRef,
      isPreview,
      width,
      isDragging,
      isResizing,
      content,
      isFocused,
      setSectionContentRef,
      focusedIndexSectionContent,
    },
    ref
  ) => {
    const stylesBg = useBackgroundStyles(content);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(content);

    const paddingTop = content.wrapperStyle?.paddingTop
      ? `calc(16px + ${content.wrapperStyle.paddingTop}px)`
      : content.wrapperStyle?.paddingY
      ? `calc(16px + ${content.wrapperStyle.paddingY}px)`
      : "16px";

    const paddingBottom = content.wrapperStyle?.paddingBottom
      ? `calc(16px + ${content.wrapperStyle.paddingBottom}px)`
      : content.wrapperStyle?.paddingY
      ? `calc(16px + ${content.wrapperStyle.paddingY}px)`
      : "16px";

    const backgroundImgStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content.wrapperStyle?.bgImage
        ? `url(${content.wrapperStyle.bgImage})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: `blur(${content.wrapperStyle?.blur}px)`,
      zIndex: -1,
      overflow: "hidden",
    };

    const calculateOpacity = content.wrapperStyle?.opacity / 100;

    const gradientStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: -1,
      backgroundImage: `linear-gradient(${content.wrapperStyle?.direction}, ${
        content.wrapperStyle?.isRevert
          ? content.wrapperStyle?.toColor
          : content.wrapperStyle?.fromColor
      }, ${
        content.wrapperStyle?.isRevert
          ? content.wrapperStyle?.fromColor
          : content.wrapperStyle?.toColor
      })`,
    };

    const backgroundPatternStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: content.wrapperStyle?.pattern
        ? `url(${content.wrapperStyle.pattern})`
        : "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: -1,
      overflow: "hidden",
    };

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
        className={` tw-flex tw-flex-row tw-flex-wrap tw-justify-center tw-items-center ${
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

        <div
          ref={elementRef}
          className={`${getClassName()} ${
            content.wrapperStyle?.shadow ? content.wrapperStyle?.shadow : ""
          }`}
          style={{
            width: content.wrapperStyle.width,
            borderRadius: content.wrapperStyle?.rounded,
            transform: `rotate(${content.wrapperStyle?.rotation}deg)`,
            transition: "transform 0.5s ease",
            paddingTop,
            paddingBottom,
            backgroundColor: content?.wrapperStyle.bgColor,
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            "--animation-duration": `${duration}s`,
          }}
        >
          {content?.wrapperStyle?.bgImage ? (
            <div style={backgroundImgStyle}></div>
          ) : content?.wrapperStyle?.bgType === "gradient" ? (
            <div style={gradientStyle}></div>
          ) : content?.wrapperStyle?.bgType === "pattern" ? (
            <div style={backgroundPatternStyle}></div>
          ) : null}

          {content.wrapperStyle?.opacity ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor:
                  content.wrapperStyle?.opacity < 0 ? "black" : "white",
                opacity: Math.abs(calculateOpacity),
              }}
            ></div>
          ) : null}

          {content.content.map((section) => {
            return (
              <div
                style={{
                  ...(focusedIndexSectionContent === section.id && {
                    border: "2px solid green",
                  }),
                }}
                ref={(el) => setSectionContentRef(el, section.id)}
                key={section.id}
                className={`${
                  focusedIndexSectionContent === section.id
                    ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
                    : ""
                }`}
              >
                {section.name === "text" && (
                  <ViewText section={section} isResizing={isResizing} />
                )}

                {section.name === "empty-space" && (
                  <ViewEmptySpace
                    content={section.content}
                    isResizing={isResizing}
                  />
                )}

                {section.name === "column-text-and-image" && (
                  <ViewColumnTextAndImage
                    content={section}
                    isResizing={isResizing}
                    isPreview={isPreview}
                    width={width}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default ViewFrame;
