import { useCallback } from "react";

export const useMoveContentMultiColumn = (setPreviewSection) => {
  const moveSection = useCallback(
    (sectionId, columnId, contentId, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        if (content.id === contentId) {
                          const updatedContent = [...content.content];
                          const draggedItem = updatedContent[dragIndex];
                          updatedContent.splice(dragIndex, 1);
                          updatedContent.splice(hoverIndex, 0, draggedItem);
                          return { ...content, content: updatedContent };
                        }

                        return content;
                      }),
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

  return moveSection;
};
