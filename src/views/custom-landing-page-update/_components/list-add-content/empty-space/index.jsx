import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { createUniqueID } from "../../../../../lib/unique-id";
import Confirmation from "../../common/Confirmation";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";

const EmptySpace = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
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
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      <div className="p-3">
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
    </div>
  );
};

export default EmptySpace;
