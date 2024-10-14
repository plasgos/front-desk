export const addNewSection = (setPreviewSection, sectionId, payload) => {
  return setPreviewSection((prevSections) =>
    prevSections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            content: [...section.content, payload],
          }
        : section
    )
  );
};
