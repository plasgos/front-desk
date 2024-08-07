import { useState } from "react";

export const useSCrollTargetChange = (
  setPreviewSection,
  idSection,
  idContent
) => {
  const [selectedOptionScrollTarget, setSelectedOptionScrollTarget] =
    useState(undefined);

  const handleChangeScrollTarget = (selectedOption) => {
    setSelectedOptionScrollTarget(selectedOption);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) =>
                String(contentItem.id) === String(idContent)
                  ? {
                      ...contentItem,
                      target: {
                        ...contentItem.target,
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
