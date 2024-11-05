import React, { useCallback } from "react";

import Text from "../sections/Text";
import Newsletter from "../sections/NewsLetter";
import ListLogo from "../sections/list-logo";

export function useRenderEditSection({
  previewSection,
  setPreviewSection,
  editing,
  setEditing,
  sectionBeforeEdit,
  handleSectionContentFocus,
}) {
  const renderEditSection = useCallback(
    (section, content) => {
      if (
        editing.name === "text" &&
        content.name === "text" &&
        editing.id === content.id
      ) {
        return (
          <Text
            currentSection={section}
            currentContent={content}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "newsletter" &&
        content.name === "newsletter" &&
        editing.id === content.id
      ) {
        return (
          <Newsletter
            currentSection={section}
            currentContent={content}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      if (
        editing.name === "list-logo" &&
        content.name === "list-logo" &&
        editing.id === content.id
      ) {
        return (
          <ListLogo
            currentSection={content}
            currentContent={content}
            setPreviewSection={(value) => setPreviewSection(value)}
            isShowContent={(value) => setEditing(value)}
            sectionBeforeEdit={sectionBeforeEdit}
            isEditingSection={true}
          />
        );
      }

      return null;
    },
    [editing.id, editing.name, sectionBeforeEdit, setEditing, setPreviewSection]
  );

  return { renderEditSection };
}
