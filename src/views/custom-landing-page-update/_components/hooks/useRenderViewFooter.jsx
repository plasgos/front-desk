import React, { useCallback } from "react";
import ViewText from "../add/footer/view/Text";
import ViewNewsletter from "../add/footer/view/ViewNewsletter";
import ViewListLogo from "../add/footer/view/ViewListLogo";
import ViewGroupLinks from "../add/footer/view/ViewGroupLinks";
import ViewAddress from "../add/footer/view/ViewAddress";
import ViewSocialLink from "../add/footer/view/ViewSocilaLink";

export const useRenderViewFooter = ({
  id,
  isDragging,
  isResizing,
  focusedIndexSectionContent,
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

      if (content.name === "address") {
        return (
          <ViewAddress
            isDragging={isDragging && content.id === id}
            section={section}
            content={content}
            isResizing={isResizing}
            setSectionContentRef={setSectionContentRef}
            focusedIndexSectionContent={focusedIndexSectionContent}
          />
        );
      }

      if (content.name === "social-link") {
        return (
          <ViewSocialLink
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

  return { renderViewFooter };
};
