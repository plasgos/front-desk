import { useCallback } from "react";

export const useMoveSection = (setPreviewSection) => {
  const moveSection = useCallback(
    (sectionId, contentId, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                content: section.content.map((content) => {
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
            : section
        );
      });

      return () => {};
    },
    [setPreviewSection]
  );

  return moveSection;
};
