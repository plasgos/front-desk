export const addSectionContent = (
  setPreviewSection,
  sectionId,
  sectionFrameId,
  payload
) => {
  setPreviewSection((prevSections) =>
    prevSections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            content: section.content.map((contentItem) => {
              return contentItem.id === sectionFrameId
                ? {
                    ...contentItem,
                    content: [...contentItem.content, payload],
                  }
                : contentItem;
            }),
          }
        : section
    )
  );
};
