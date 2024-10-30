export const cancelAddSectionContent = (
  setPreviewSection,
  sectionId,
  contentIdToCheck
) => {
  setPreviewSection((prevSections) =>
    prevSections.map((section) => {
      return section.id === sectionId
        ? {
            ...section,
            content: section.content.map((contentItem) =>
              contentItem.id === contentIdToCheck
                ? {
                    ...contentItem,
                    content: contentItem.content.filter(
                      (_, index) => index !== contentItem.content.length - 1
                    ),
                  }
                : contentItem
            ),
          }
        : section;
    })
  );
};
