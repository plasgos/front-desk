export const cancelSectionMultiColumn = (
  setPreviewSection,
  sectionId,
  columnId,
  setting
) => {
  setPreviewSection((prevSections) =>
    prevSections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            column: section.column.map((column) =>
              column.id === columnId
                ? {
                    ...column,
                    content: column.content.filter(
                      (content) => content.id !== setting.id
                    ),
                  }
                : column
            ),
          }
        : section
    )
  );
};
