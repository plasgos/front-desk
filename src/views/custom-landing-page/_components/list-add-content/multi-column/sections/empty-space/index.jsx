import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import { createUniqueID } from "../../../../../../../lib/unique-id";

const EmptySpace = ({
  previewSection,
  setPreviewSection,
  sectionBeforeEdit,
  currentSection,
  sectionId,
  columnId,
}) => {
  const { isEditingSection, isAddColumnSection } = useSelector(
    (state) => state.customLandingPage.multiColumnSection
  );

  const dispatch = useDispatch();

  const [height, setHeight] = useState(currentSection?.content?.height || 120);

  const [heightValue] = useDebounce(height, 500);
  const [setting, setSetting] = useState({});

  useEffect(() => {
    if (
      heightValue !== currentSection?.content?.height &&
      heightValue <= 1200
    ) {
      handleUpdateHeight("height", heightValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heightValue]);

  const handleUpdateHeight = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) => {
                        const contentIdToCheck = isEditingSection
                          ? currentSection.id
                          : setting.id;
                        return content.id === contentIdToCheck
                          ? {
                              ...content,
                              content: {
                                ...content.content,
                                [key]: value,
                              },
                            }
                          : content;
                      }),
                    }
                  : column
              ),
            }
          : section;
      })
    );
  };

  const handleSetHeightWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "height") {
      setHeight(newValue);
    }
    handleUpdateHeight(key, newValue);
  };

  const handleCancel = () => {
    if (isEditingSection) {
      setPreviewSection([...sectionBeforeEdit]);
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.filter(
                          (content) => content.id !== setting.id
                        ),
                      }
                    : column
                ),
              }
            : section
        )
      );
    }
  };

  const handleConfirm = () => {
    if (isAddColumnSection) {
      dispatch(setIsAddColumnSection(false));
    } else if (isEditingSection) {
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsEditingColumnSection(false));
    }
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "empty-space",
      title: "Empty Space",
      content: {
        height,
      },
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const updatedColumns = section.column.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                content: [...column.content, payload],
              };
            }
            return column;
          });

          return {
            ...section,
            column: updatedColumns,
          };
        }

        return section;
      })
    );

    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2 mb-3">
        <div>
          <CButton
            onClick={handleCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handleConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      <InputRangeWithNumber
        label="Tinggi"
        value={height}
        onChange={(newValue) => {
          setHeight(newValue);
        }}
        min={10}
        max={1200}
        onBlur={() => handleSetHeightWhenBlur(height, 10, 1200, "height")}
      />
    </div>
  );
};

export default EmptySpace;
