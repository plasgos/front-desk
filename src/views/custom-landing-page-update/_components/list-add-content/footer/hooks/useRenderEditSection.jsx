import React, { useCallback } from "react";

import Text from "../sections/Text";
import Newsletter from "../sections/NewsLetter";
import ListLogo from "../sections/list-logo";
import GroupLink from "../sections/group-link";
import Address from "../sections/address";
import SocialLink from "../sections/social-link";

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
        editing.name === "group-link" &&
        content.name === "group-link" &&
        editing.id === content.id
      ) {
        return (
          <GroupLink
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
        editing.name === "address" &&
        content.name === "address" &&
        editing.id === content.id
      ) {
        return (
          <Address
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
        editing.name === "social-link" &&
        content.name === "social-link" &&
        editing.id === content.id
      ) {
        return (
          <SocialLink
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
