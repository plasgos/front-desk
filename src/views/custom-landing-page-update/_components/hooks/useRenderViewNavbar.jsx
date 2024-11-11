import React, { useCallback } from "react";
import ViewLink from "../list-add-content/navbar/view/ViewLink";

export const useRenderViewNavbar = ({
  id,
  isDragging,
  isResizing,
  focusedIndexSectionContent,
  containerRef,
  setSectionContentRef,
}) => {
  const renderViewNavbar = useCallback(
    (section, content) => {
      if (content.name === "link") {
        return (
          <ViewLink
            isDragging={isDragging && content.id === id}
            section={section}
            content={content}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      return null;
    },
    [
      containerRef,
      focusedIndexSectionContent,
      id,
      isDragging,
      isResizing,
      setSectionContentRef,
    ]
  );

  return { renderViewNavbar };
};
