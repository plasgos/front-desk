export const cancelSectionContentLastIndex = (
  setPreviewSection,
  sectionId,
  columnId,
  contentId
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
                    content: column.content.map((content) => {
                      if (content.id === contentId) {
                        return {
                          ...content,
                          content: content.content.filter(
                            (_, index) => index !== content.content.length - 1
                          ), // Menghapus elemen terakhir
                        };
                      }
                      return content;
                    }),
                  }
                : column
            ),
          }
        : section
    )
  );
};
