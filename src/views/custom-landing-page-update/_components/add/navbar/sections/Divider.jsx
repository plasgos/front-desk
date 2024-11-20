import React, { useEffect, useState } from "react";
import Confirmation from "../../../common/Confirmation";
import { createUniqueID } from "../../../../../../lib/unique-id";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";

const Divider = ({
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  currentContent,
}) => {
  const [setting, setSetting] = useState({});
  const [margin, setMargin] = useState(currentContent?.margin || 50);
  const contentIdToCheck = isEditingSection ? currentContent.id : setting.id;

  const handleChangeWrapperStyle = (key, value) => {
    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        [key]: value,
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      [key]: value,
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleSetHeightWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "margin") {
      setMargin(newValue);
    }
    handleChangeWrapperStyle(key, newValue);
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentSection?.content);
    let payload = {
      id: `divider-${uniqueId}}`,
      name: "divider",
      title: "Pemisah",
      margin: 50,
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === currentSection?.id
          ? { ...section, content: [...section.content, payload] }
          : section
      )
    );
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);

      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === currentSection?.id
            ? {
                ...section,
                content: section.content.filter(
                  (contentItem) => contentItem.id !== setting.id
                ),
              }
            : section
        )
      );
    }
  };

  const handleConfirm = () => {
    isShowContent(false);
  };

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      <div className="p-3">
        <InputRangeWithNumber
          label="Jarak"
          value={margin}
          onChange={(newValue) => {
            setMargin(newValue);
            handleChangeWrapperStyle("margin", newValue);
          }}
          min={10}
          max={300}
          onBlur={() => handleSetHeightWhenBlur(margin, 10, 300, "margin")}
        />
      </div>
    </div>
  );
};

export default Divider;
