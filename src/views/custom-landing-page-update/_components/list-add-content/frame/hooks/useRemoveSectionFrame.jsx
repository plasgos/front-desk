import { useCallback } from "react";

export const useRemoveSectionFrame = (setPreviewSection) => {
  const removeSection = useCallback(
    (sectionId, sectionFrameId, contentId) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === sectionFrameId
                  ? {
                      ...sectionFrame,
                      content: sectionFrame.content.filter(
                        (contentItem) => contentItem.id !== contentId
                      ),
                    }
                  : sectionFrame
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
