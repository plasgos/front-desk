import { useCallback } from "react";

export const useRemoveOption = (setPreviewSection) => {
  const removeOption = useCallback(
    (sectionId, contentIndex, optionIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            const updatedContent = section.content
              .map((contentItem, i) => {
                if (i === contentIndex) {
                  // Jika terdapat optionIndex, hapus item di dalam options
                  if (optionIndex !== undefined) {
                    return {
                      ...contentItem,
                      options: contentItem.options.filter(
                        (_, oIndex) => oIndex !== optionIndex
                      ),
                    };
                  }
                  // Jika tidak ada optionIndex, hapus contentItem itu sendiri
                  return null;
                }
                return contentItem;
              })
              .filter(Boolean); // Filter out null values

            return { ...section, content: updatedContent };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  return removeOption;
};
