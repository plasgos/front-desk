import { useCallback } from "react";

export const useMoveSectionFrame = (setPreviewSection) => {
  const moveSection = useCallback(
    (sectionId, sectionFrameId, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.map((sectionFrame) => {
                if (sectionFrame.id === sectionFrameId) {
                  const updatedContent = [...sectionFrame.content];
                  const draggedItem = updatedContent[dragIndex];
                  updatedContent.splice(dragIndex, 1);
                  updatedContent.splice(hoverIndex, 0, draggedItem);

                  return { ...sectionFrame, content: updatedContent };
                }

                return sectionFrame;
              }),
            };
          }
          return section;
        });
      });

      return () => {};
    },
    [setPreviewSection]
  );

  return moveSection;
};
