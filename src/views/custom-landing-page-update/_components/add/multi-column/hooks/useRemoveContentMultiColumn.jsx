import { useCallback } from "react";

export const useRemoveContentMultiColumn = (setPreviewSection) => {
  const removeSection = useCallback(
    (sectionId, columnId, contentId, contentItemId) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === contentId
                          ? {
                              ...content,
                              content: content.content.filter(
                                (contentItem) =>
                                  contentItem.id !== contentItemId
                              ),
                            }
                          : content
                      ),
                    }
                  : column
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
