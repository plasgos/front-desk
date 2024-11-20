import React, { useCallback } from "react";
import Link from "../sections/Link";
import Divider from "../sections/Divider";
import Menu from "../sections/menu";

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
        editing.name === "link" &&
        content.name === "link" &&
        editing.id === content.id
      ) {
        return (
          <Link
            previewSection={previewSection}
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
        editing.name === "divider" &&
        content.name === "divider" &&
        editing.id === content.id
      ) {
        return (
          <Divider
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
        editing.name === "menu" &&
        content.name === "menu" &&
        editing.id === content.id
      ) {
        return (
          <Menu
            previewSection={previewSection}
            currentSection={section}
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
    [
      editing.id,
      editing.name,
      previewSection,
      sectionBeforeEdit,
      setEditing,
      setPreviewSection,
    ]
  );

  return { renderEditSection };
}
