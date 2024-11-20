export const addSectionMultiColumn = (
  setPreviewSection,
  sectionId,
  columnId,
  payload
) => {
  setPreviewSection((prevSections) =>
    prevSections.map((section) => {
      if (section.id === sectionId) {
        const updatedColumns = section.column.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              content: [...column.content, payload],
            };
          }
          return column;
        });

        return {
          ...section,
          column: updatedColumns,
        };
      }

      return section;
    })
  );
};
