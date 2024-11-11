import React, { forwardRef } from "react";
import { useHandleClickTarget } from "../../../../../../hooks/useHandleClickTarget";

const ViewLink = forwardRef(
  (
    {
      isDragging,
      isResizing,
      section,
      content,
      focusedIndexSectionContent,
      setSectionContentRef,
      containerRef,
    },
    ref
  ) => {
    console.log("🚀 ~ content:", content);
    const { titleColor, contentColor, innerOutline } =
      section?.variant?.style || {};

    return (
      <div key={content.id}>
        {content?.content?.map((contentItem) => {
          return (
            <div
              ref={(el) => {
                if (setSectionContentRef) {
                  setSectionContentRef(el, content.id);
                }
              }}
              key={contentItem?.id}
              style={{
                ...(Object.keys(contentItem.target).length > 0
                  ? { cursor: "pointer" }
                  : {}),
                ...(focusedIndexSectionContent === content.id && {
                  border: "2px solid green",
                }),
                ...(isResizing ? { cursor: "not-allowed" } : {}),
                ...(isDragging ? { border: "2px solid green" } : {}),
                width: content?.wrapperStyle?.maxWidth,
                padding: 10,
              }}
              onClick={() =>
                useHandleClickTarget(contentItem.target, containerRef)
              }
              className={`${
                focusedIndexSectionContent === content.id
                  ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
                  : ""
              }`}
            >
              <div className="">{content?.wrapperStyle?.title}</div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default ViewLink;
