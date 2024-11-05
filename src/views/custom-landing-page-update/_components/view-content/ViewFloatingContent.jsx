import React, { forwardRef } from "react";
import useAnimatedVisibility from "../../../../hooks/useAnimatedVisibility";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";
import { ViewMultipleContent } from "./ViewMultipleContent";
const ViewFloatingContent = forwardRef(
  ({
    containerRef,
    isDragging,
    width,
    isResizing,
    content,
    isFocused,
    isPreview,
    setSectionContentRef = null,
    focusedIndexSectionContent = null,
    setPreviewFloatingSection,
    setPreviewSection,
    setColumnRef,
    focusedIndexColumn,
  }) => {
    const stylesBg = useBackgroundStyles(content);

    const { elementRef, getClassName, duration } =
      useAnimatedVisibility(content);

    return (
      <div
        ref={elementRef}
        className={`${content?.wrapperStyle?.shadow} ${getClassName()}`}
        style={{
          ...(isResizing ? { cursor: "not-allowed" } : {}),
          ...(content?.wrapperStyle?.position === "bottom"
            ? { bottom: 0 }
            : {}),
          paddingTop: stylesBg.paddingTop,
          paddingBottom: stylesBg.paddingBottom,
          backgroundColor: content.background.bgColor || "",
          position: "absolute",
          maxWidth: "100%",
          maxHeight: "100%",
          width,
          zIndex: 999,
          "--animation-duration": `${duration}s`,
        }}
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

        {content.content.map((content) => {
          return (
            <ViewMultipleContent
              content={content}
              focusedIndexColumn={focusedIndexColumn}
              setSectionContentRef={setSectionContentRef}
              containerRef={containerRef}
              focusedIndexSectionContent={focusedIndexSectionContent}
              isPreview={isPreview}
              setColumnRef={setColumnRef}
              setPreviewSection={setPreviewSection}
              width={width}
              key={content.id}
            />
          );
        })}
      </div>
    );
  }
);

export default ViewFloatingContent;
