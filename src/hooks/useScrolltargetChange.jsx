import { useState } from "react";

export const useSCrollTargetChange = (
  setPreviewSection,
  idSection,
  selectedSectionToEdit
) => {
  const [selectedOptionScrollTarget, setSelectedOptionScrollTarget] =
    useState(undefined);
  const handleChangeScrollTarget = (selectedOption) => {
    setSelectedOptionScrollTarget(selectedOption);

    console.log("SIAPA YANG SET LAGI");

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(selectedSectionToEdit.id)
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
