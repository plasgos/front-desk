import React, { useCallback } from "react";
import ViewText from "../list-add-content/footer/view/Text";
import ViewNewsletter from "../list-add-content/footer/view/ViewNewsletter";

export const useRenderViewFooter = ({
  id,
  setPreviewSection,
  isDragging,
  isResizing,
  focusedIndexSectionContent,
  isPreview,
  dimensions,
  containerRef,
  setSectionContentRef,
}) => {
  const renderViewFooter = useCallback(
    (section, content) => {
      if (content.name === "text") {
        return (
          <ViewText
            isDragging={isDragging && content.id === id}
            section={section}
            content={content}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (content.name === "newsletter") {
        return (
          <ViewNewsletter
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
      focusedIndexSectionContent,
      id,
      isDragging,
      isResizing,
      setSectionContentRef,
    ]
  );

  return { renderViewFooter };
};
