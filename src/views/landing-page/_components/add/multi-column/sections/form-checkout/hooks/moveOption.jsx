import { useCallback } from "react";

import { useDispatch } from "react-redux";
import {
  sortOption,
  sortOptionsGroups,
} from "../../../../../../../../modules/custom-landing-page/reducer";

export const useMoveOption = (setPreviewSection, key, optionToMapping) => {
  const dispatch = useDispatch();

  const moveOption = useCallback(
    (
      sectionId,
      columnId,
      contentId,
      dragIndex,
      hoverIndex,
      isOption = false,
      contentIndex = null
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
                            const updatedContent = [...content.content]; // Akses konten yang tepat di sini

                            if (isOption && contentIndex !== null) {
                              // Cari contentItem dengan index contentIndex
                              const contentItem = updatedContent[contentIndex];

                              if (contentItem?.type === key) {
                                const updatedOptions = [
                                  ...contentItem[optionToMapping],
                                ];
                                const draggedOption = updatedOptions[dragIndex];
                                updatedOptions.splice(dragIndex, 1);
                                updatedOptions.splice(
                                  hoverIndex,
                                  0,
                                  draggedOption
                                );

                                // Update contentItem dengan opsi yang diubah urutannya
                                updatedContent[contentIndex] = {
                                  ...contentItem,
                                  [optionToMapping]: updatedOptions,
                                };
                              }
                            } else {
                              // Geser contentItem
                              const draggedItem = updatedContent[dragIndex];
                              updatedContent.splice(dragIndex, 1);
                              updatedContent.splice(hoverIndex, 0, draggedItem);
                            }

                            return { ...content, content: updatedContent }; // Pastikan kamu mengembalikan `content` yang benar
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
      if (optionToMapping === "optionsGroup") {
        dispatch(sortOptionsGroups(dragIndex, hoverIndex));
      } else {
        if (key !== "multiSelect") {
          dispatch(sortOption(dragIndex, hoverIndex));
        }

        return;
      }
    },
    [dispatch, key, optionToMapping, setPreviewSection]
  );

  return moveOption;
};
