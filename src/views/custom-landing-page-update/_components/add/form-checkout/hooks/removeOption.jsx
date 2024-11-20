import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteOption } from "../../../../../../modules/custom-landing-page/reducer";

export const useRemoveOption = (setPreviewSection, type) => {
  const dispacth = useDispatch();
  const removeOption = useCallback(
    (sectionId, contentIndex, optionIndex, option, setDefaultValue) => {
      if (type !== "multiSelect") {
        setDefaultValue((prevValue) => {
          const currentDefaultValue = prevValue.value;

          const isOptionUndefined =
            currentDefaultValue === option.value
              ? undefined
              : currentDefaultValue;

          return {
            ...prevValue,
            value: isOptionUndefined,
            label:
              isOptionUndefined === undefined ? "Tidak Ada" : prevValue.label,
          };
        });
      }

      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            const updatedContent = section.content
              .map((contentItem, i) => {
                if (type !== "multiSelect") {
                  const currentDefaultValue = contentItem.defaultValue;

                  if (i === contentIndex) {
                    // Jika terdapat optionIndex, hapus item di dalam options
                    if (optionIndex !== undefined) {
                      return {
                        ...contentItem,
                        options: contentItem.options.filter(
                          (_, oIndex) => oIndex !== optionIndex
                        ),
                        defaultValue:
                          currentDefaultValue === option.value
                            ? undefined
                            : currentDefaultValue,
                      };
                    }
                    // Jika tidak ada optionIndex, hapus contentItem itu sendiri
                    return null;
                  }
                } else {
                  if (i === contentIndex) {
                    // Jika terdapat optionIndex, hapus item di dalam options
                    if (optionIndex !== undefined) {
                      return {
                        ...contentItem,
                        options: contentItem.options.filter(
                          (_, oIndex) => oIndex !== optionIndex
                        ),
                      };
                    }
                    // Jika tidak ada optionIndex, hapus contentItem itu sendiri
                    return null;
                  }
                }

                return contentItem;
              })
              .filter(Boolean); // Filter out null values

            if (type !== "multiSelect") {
              dispacth(deleteOption(option.id));
            }

            return { ...section, content: updatedContent };
          }
          return section;
        })
      );
    },
    [dispacth, setPreviewSection, type]
  );

  return removeOption;
};
