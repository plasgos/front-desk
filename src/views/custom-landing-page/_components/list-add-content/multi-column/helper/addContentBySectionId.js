export const addContentBySectionId = (
  setPreviewSection,
  sectionId,
  columnId,
  contentId,
  payload
) => {
  setPreviewSection((prevSections) =>
    prevSections.map((section) => {
      if (section.id === sectionId) {
        const updateContent = section.column.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              content: column.content.map((content) => {
                return content.id === contentId
                  ? {
                      ...content,
                      content: [...content.content, payload],
                    }
                  : content;
              }),
            };
          }
          return column;
        });

        return {
          ...section,
          column: updateContent,
        };
      }

      return section;
    })
  );
};
