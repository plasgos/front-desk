import { useState } from "react";

export const useScrollTargetChangeFrames = (
  setPreviewSection,
  sectionId,
  sectionFrameId,
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
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === sectionFrameId
                  ? {
                      ...sectionFrame,
                      content: sectionFrame.content.map((contentItem) =>
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
                  : sectionFrame
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
