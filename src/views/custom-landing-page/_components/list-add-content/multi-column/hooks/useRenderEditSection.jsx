import React, { useCallback } from "react";
import Text from "../sections/text";
import ColumnTextAndImages from "../sections/colum-text-and-image";
import EmptySpace from "../sections/empty-space";
import ListImages from "../sections/list-images";
import ScrollTarget from "../sections/scroll-target";

export function useRenderEditSection({
  previewSection,
  setPreviewSection,
  currentSetionBeforeEdit,
  selectedSection,
  selectedColumn,
  columnId,
  isAddColumn,
}) {
  const renderEditSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.column.map((column) => {
            const columIdCheck = isAddColumn ? columnId : selectedColumn.id;

            if (column.id === columIdCheck) {
              const columnContent = column.content.map((content) => {
                if (
                  selectedSection.name === "text" &&
                  content.name === "text" &&
                  selectedSection.id === content.id
                ) {
                  return (
                    <Text
                      key={content.id}
                      currentSection={content}
                      previewSection={previewSection}
                      setPreviewSection={setPreviewSection}
                      sectionBeforeEdit={currentSetionBeforeEdit}
                      sectionId={section.id}
                      columnId={columIdCheck}
                    />
                  );
                }

                if (
                  selectedSection.name === "column-text-and-image" &&
                  content.name === "column-text-and-image" &&
                  selectedSection.id === content.id
                ) {
                  return (
                    <ColumnTextAndImages
                      key={content.id}
                      currentSection={content}
                      previewSection={previewSection}
                      setPreviewSection={setPreviewSection}
                      sectionBeforeEdit={currentSetionBeforeEdit}
                      sectionId={section.id}
                      columnId={columIdCheck}
                    />
                  );
                }

                if (
                  selectedSection.name === "column-text-and-image" &&
                  content.name === "column-text-and-image" &&
                  selectedSection.id === content.id
                ) {
                  return (
                    <ColumnTextAndImages
                      key={content.id}
                      currentSection={content}
                      previewSection={previewSection}
                      setPreviewSection={setPreviewSection}
                      sectionBeforeEdit={currentSetionBeforeEdit}
                      sectionId={section.id}
                      columnId={columIdCheck}
                    />
                  );
                }

                if (
                  selectedSection.name === "empty-space" &&
                  content.name === "empty-space" &&
                  selectedSection.id === content.id
                ) {
                  return (
                    <EmptySpace
                      key={content.id}
                      currentSection={content}
                      previewSection={previewSection}
                      setPreviewSection={setPreviewSection}
                      sectionBeforeEdit={currentSetionBeforeEdit}
                      sectionId={section.id}
                      columnId={columIdCheck}
                    />
                  );
                }

                if (
                  selectedSection.name === "list-images" &&
                  content.name === "list-images" &&
                  selectedSection.id === content.id
                ) {
                  return (
                    <ListImages
                      key={content.id}
                      currentSection={content}
                      previewSection={previewSection}
                      setPreviewSection={setPreviewSection}
                      sectionBeforeEdit={currentSetionBeforeEdit}
                      sectionId={section.id}
                      columnId={columIdCheck}
                    />
                  );
                }

                if (
                  selectedSection.name === "scroll-target" &&
                  content.name === "scroll-target" &&
                  selectedSection.id === content.id
                ) {
                  return (
                    <ScrollTarget
                      key={content.id}
                      currentSection={content}
                      previewSection={previewSection}
                      setPreviewSection={setPreviewSection}
                      sectionBeforeEdit={currentSetionBeforeEdit}
                      sectionId={section.id}
                      columnId={columIdCheck}
                    />
                  );
                }

                return null;
              });

              return <div key={column.id}>{columnContent}</div>;
            }

            return null;
          })}
        </div>
      );
    },
    [
      columnId,
      currentSetionBeforeEdit,
      isAddColumn,
      previewSection,
      selectedColumn.id,
      selectedSection.id,
      selectedSection.name,
      setPreviewSection,
    ]
  );

  return { renderEditSection };
}
