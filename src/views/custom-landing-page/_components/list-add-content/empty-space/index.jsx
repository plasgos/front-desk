import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import { createUniqueID } from "../../../../../lib/unique-id";

const EmptySpace = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [height, setHeight] = useState(currentSection?.content?.height || 120);
  const [setting, setSetting] = useState({});

  const handleUpdateHeight = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : setting.id;

        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              content: {
                ...item.content,
                [key]: value,
              },
            }
          : item;
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
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    handleSetHeightWhenBlur();
    isShowContent(false);
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

    setPreviewSection((prevSections) => [...prevSections, payload]);
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
          handleUpdateHeight("height", newValue);
        }}
        min={10}
        max={1200}
        onBlur={() => handleSetHeightWhenBlur(height, 10, 1200, "height")}
      />
    </div>
  );
};

export default EmptySpace;
