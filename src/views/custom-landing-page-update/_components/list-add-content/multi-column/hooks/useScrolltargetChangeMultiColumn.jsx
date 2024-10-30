import { useState } from "react";

export const useSCrollTargetChangeMultiColumn = (
  sectionId,
  columnId,
  setPreviewSection,
  idSection,
  selectedSectionToEdit
) => {
  const [selectedOptionScrollTarget, setSelectedOptionScrollTarget] =
    useState(undefined);
  const handleChangeScrollTarget = (selectedOption) => {
    setSelectedOptionScrollTarget(selectedOption);

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
                        content.id === idSection
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                return contentItem.id ===
                                  selectedSectionToEdit.id
                                  ? {
                                      ...contentItem,
                                      target: {
                                        scrollTarget: {
                                          ...contentItem.target.scrollTarget,
                                          id: selectedOption.id,
                                          value: selectedOption.value,
                                          label: selectedOption.label,
                                        },
                                      },
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

  return {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  };
};
