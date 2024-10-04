import React, { forwardRef } from "react";
import { useBackgroundStyles } from "../../../../hooks/useBackgroundStyles";
import { useHandleClickTarget } from "../../../../hooks/useHandleClickTarget";

const ViewCallToAction = forwardRef(
  (
    {
      containerRef,
      isDragging,
      content,
      isResizing,
      isFocused,
      setSectionContentRef,
      focusedIndexSectionContent,
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
        className={` tw-p-3    ${
          isFocused &&
          "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20 "
        }`}
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
          const cleanContent = section.text
            .replace(/<p>/g, "<div>")
            .replace(/<\/p>/g, "</div>");

          return (
            <div
              style={{ gap: 14 }}
              className={`tw-flex tw-items-center ${section.align}`}
              key={section.id}
            >
              <div
                style={{
                  color: section.textColor,
                }}
                className={`${section.fontSize}`}
                dangerouslySetInnerHTML={{ __html: cleanContent }}
              />

              <div
                className={`tw-rounded-md tw-py-3 tw-px-4 tw-cursor-pointer`}
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
                  backgroundColor: section.isGhostVariant
                    ? ""
                    : section.buttonColor,
                  border: section.isGhostVariant
                    ? `1px solid ${section.buttonColor}`
                    : "",
                }}
                key={section.id}
              >
                <div
                  onClick={() =>
                    useHandleClickTarget(section.target, containerRef)
                  }
                  style={{
                    color: section.textColorButton,
                  }}
                  className={`hover:tw-bg-opacity-80  tw-inline-block tw-cursor-pointer`}
                >
                  {section.textButton}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewCallToAction;
