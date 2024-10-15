import React, { useCallback } from "react";
import Text from "../sections/text";
import EmptySpace from "../sections/empty-space";

export function useRenderEditSectionFrame({
  previewSection,
  setPreviewSection,
  currentSectionBeforeEdit,
  selectedSection,
  setIsEditingContent,
}) {
  const renderEditSectionFrame = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((content) => {
            if (
              selectedSection.name === "text" &&
              selectedSection.id === content.id
            ) {
              return (
                <Text
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            if (
              selectedSection.name === "empty-space" &&
              selectedSection.id === content.id
            ) {
              return (
                <EmptySpace
                  key={content.id}
                  currentSection={content}
                  previewSection={previewSection}
                  setPreviewSection={setPreviewSection}
                  sectionBeforeEdit={currentSectionBeforeEdit}
                  sectionId={section.id}
                  isEditingSection={true}
                  isShowContent={setIsEditingContent}
                />
              );
            }

            return null;
          })}
        </div>
      );
    },
    [
      currentSectionBeforeEdit,
      previewSection,
      selectedSection.id,
      selectedSection.name,
      setIsEditingContent,
      setPreviewSection,
    ]
  );

  return { renderEditSectionFrame };
}
