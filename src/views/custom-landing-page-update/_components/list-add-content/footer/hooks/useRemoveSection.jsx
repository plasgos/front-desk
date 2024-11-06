import { useCallback } from "react";

export const useRemoveSection = (setPreviewSection) => {
  const removeSection = useCallback(
    (sectionId, contentId, contentItemId) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.map((content) =>
                content.id === contentId
                  ? {
                      ...content,
                      content: content.content.filter(
                        (contentItem) => contentItem.id !== contentItemId
                      ),
                    }
                  : content
              ),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  return removeSection;
};
