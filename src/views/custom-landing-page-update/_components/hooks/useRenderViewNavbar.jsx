import React, { useCallback } from "react";
import ViewLink from "../list-add-content/navbar/view/ViewLink";
import ViewDivider from "../list-add-content/navbar/view/ViewDivider";
import ViewMenu from "../list-add-content/navbar/view/ViewMenu";

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
            containerRef={containerRef}
          />
        );
      }

      if (content.name === "divider") {
        return (
          <ViewDivider
            isDragging={isDragging && content.id === id}
            section={section}
            content={content}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (content.name === "menu") {
        return (
          <ViewMenu
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

  return { renderViewNavbar };
};
