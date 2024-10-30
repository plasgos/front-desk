export const cancelNewSection = (setPreviewSection, sectionId, contentId) => {
  setPreviewSection((prevSections) =>
    prevSections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            content: section.content.filter(
              (content) => content.id !== contentId
            ),
          }
        : section
    )
  );
};
