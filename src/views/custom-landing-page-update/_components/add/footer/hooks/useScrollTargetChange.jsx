import { useState } from "react";

export const useScrollTargetChange = (
  setPreviewSection,
  currentSectionId,
  currentContentId,
  selectedSectionToEdit
) => {
  const [selectedOptionScrollTarget, setSelectedOptionScrollTarget] =
    useState(undefined);
  const handleChangeScrollTarget = (selectedOption) => {
    setSelectedOptionScrollTarget(selectedOption);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSectionId
          ? {
              ...item,
              content: item.content.map((content) =>
                String(content.id) === String(currentContentId)
                  ? {
                      ...content,
                      content: content.content.map((contentItem) =>
                        contentItem.id === selectedSectionToEdit.id
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
                          : contentItem
                      ),
                    }
                  : content
              ),
            }
          : item
      )
    );
  };

  return {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  };
};
