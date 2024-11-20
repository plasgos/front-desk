export const changeWrapperStyleMultiColumn = (
  setPreviewSection,
  sectionId,
  columnId,
  contentId,
  updateContent
) => {
  setPreviewSection((arr) =>
    arr.map((section) =>
      String(section.id) === sectionId
        ? {
            ...section,
            column: section.column.map((column) =>
              column.id === columnId
                ? {
                    ...column,
                    content: column.content.map((content) =>
                      content.id === contentId
                        ? {
                            ...content,
                            wrapperStyle: {
                              ...content.wrapperStyle,
                              ...updateContent,
                            },
                          }
                        : content
                    ),
                  }
                : column
            ),
          }
        : section
    )
  );
};
