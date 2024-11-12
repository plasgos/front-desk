import React, { forwardRef } from "react";

const ViewDivider = forwardRef(
  (
    {
      isDragging,
      isResizing,
      section,
      content,
      focusedIndexSectionContent,
      setSectionContentRef,
    },
    ref
  ) => {
    return (
      <div key={content.id}>
        <div
          ref={(el) => {
            if (setSectionContentRef) {
              setSectionContentRef(el, content.id);
            }
          }}
          style={{
            ...(focusedIndexSectionContent === content.id && {
              border: "2px solid green",
            }),
            ...(isResizing ? { cursor: "not-allowed" } : {}),
            ...(isDragging ? { border: "2px solid green" } : {}),
            width: content?.wrapperStyle?.maxWidth,
            padding: 10,
          }}
          className={`${
            focusedIndexSectionContent === content.id
              ? "animate__animated  animate__headShake animate__fast  tw-bg-green-300/20  "
              : ""
          }`}
        >
          <div
            style={{
              margin: `0px ${content?.margin}px`,
            }}
            className=""
          ></div>
        </div>
      </div>
    );
  }
);

export default ViewDivider;
