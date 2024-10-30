export const changeContentBySectionId = (
  setPreviewSection,
  sectionId,
  columnId,
  contentId,
  contentIdToCheck,
  updateContent
) => {
  setPreviewSection((arr) =>
    arr.map((section) =>
      section.id === sectionId
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
                            content: content.content.map((contentItem) => {
                              return contentItem.id === contentIdToCheck
                                ? {
                                    ...contentItem,
                                    ...updateContent,
                                  }
                                : contentItem;
                            }),
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
