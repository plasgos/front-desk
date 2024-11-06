import React, { useCallback } from "react";
import ViewText from "../list-add-content/footer/view/Text";
import ViewNewsletter from "../list-add-content/footer/view/ViewNewsletter";
import ViewListLogo from "../list-add-content/footer/view/ViewListLogo";
import ViewGroupLinks from "../list-add-content/footer/view/ViewGroupLinks";

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

      if (content.name === "list-logo") {
        return (
          <ViewListLogo
            isDragging={isDragging && content.id === id}
            section={section}
            content={content}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            containerRef={containerRef}
          />
        );
      }

      if (content.name === "group-link") {
        return (
          <ViewGroupLinks
            isDragging={isDragging && content.id === id}
            section={section}
            content={content}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
            containerRef={containerRef}
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

  return { renderViewFooter };
};
