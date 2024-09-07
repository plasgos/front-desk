import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteOptionsGroup } from "../../../../../../redux/modules/custom-landing-page/reducer";

export const useRemoveOption = (setPreviewSection, optionTomaping) => {
  const dispacth = useDispatch();
  const removeOption = useCallback(
    (sectionId, contentIndex, optionIndex, groupId, setDefaultValue) => {
      setDefaultValue({
        value: undefined,
        label: "Tidak Ada",
      });

      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            const updatedContent = section.content
              .map((contentItem, i) => {
                if (i === contentIndex) {
                  // Jika terdapat optionIndex, hapus item di dalam options
                  if (optionIndex !== undefined) {
                    return {
                      ...contentItem,
                      [optionTomaping]: contentItem[optionTomaping].filter(
                        (_, oIndex) => oIndex !== optionIndex
                      ),
                      defaultValue: undefined,
                    };
                  }
                  // Jika tidak ada optionIndex, hapus contentItem itu sendiri
                  return null;
                }
                return contentItem;
              })
              .filter(Boolean); // Filter out null values
            if (optionTomaping === "optionsGroup") {
              dispacth(deleteOptionsGroup(groupId));
            }

            return { ...section, content: updatedContent };
          }
          return section;
        })
      );
    },
    [dispacth, optionTomaping, setPreviewSection]
  );

  return removeOption;
};
