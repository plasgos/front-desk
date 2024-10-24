import React, { useState } from "react";
import ColorPicker from "../../../../common/ColorPicker";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import Checkbox from "../../../../common/Checkbox";

export const setUpdateValue = (
  setPreviewSection,
  sectionId,
  columnId,
  contentId,
  key,
  value
) => {
  setPreviewSection((arr) =>
    arr.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            column: section.column.map((column) =>
              column.id === columnId
                ? {
                    ...column,
                    content: column.content.map((content) =>
                      content.id === contentId
                        ? {
                            ...content,
                            content: {
                              ...content.content,
                              [key]: value,
                            },
                          }
                        : content
                    ),
                  }
                : column
            ),
          }
        : section
    )
  );
};

const StripeLineControl = ({
  setPreviewSection,
  currentSection,
  sectionId,
  columnId,
}) => {
  const [height, setHeight] = useState(currentSection?.content?.height || 10);
  const [width1, setWidth1] = useState(currentSection?.content?.width1 || 40);
  const [width2, setWidth2] = useState(currentSection?.content?.width2 || 20);
  const [distance, setDistance] = useState(
    currentSection?.content?.distance || 10
  );
  const [isFlip, setIsFlip] = useState(
    currentSection?.content?.isFlip || false
  );
  const [isFloating, setIsFloating] = useState(
    currentSection?.content?.isFloating || false
  );
  const [color1, setColor1] = useState(
    currentSection?.content?.color1 || "#F44336"
  );
  const [color2, setColor2] = useState(
    currentSection?.content?.color2 || "#2196F3"
  );

  const handleUpdateValue = (key, value) => {
    setUpdateValue(
      setPreviewSection,
      sectionId,
      columnId,
      currentSection.id,
      key,
      value
    );
  };

  const handleSetValueWhenBlurValue = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "height") {
      setHeight(newValue);
    } else if (key === "width1") {
      setWidth1(newValue);
    } else if (key === "width2") {
      setWidth2(newValue);
    } else if (key === "distance") {
      setDistance(newValue);
    }
    handleUpdateValue(key, newValue);
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center my-3">
        <ColorPicker
          initialColor={color1}
          label="Garis"
          onChange={(color) => {
            setColor1(color);
            handleUpdateValue("color1", color);
          }}
          type="rgba"
        />

        <ColorPicker
          initialColor={color2}
          label="Garis B"
          onChange={(color) => {
            setColor2(color);
            handleUpdateValue("color2", color);
          }}
          type="rgba"
        />
      </div>

      <InputRangeWithNumber
        label="Tinggi"
        value={height}
        onChange={(newValue) => {
          setHeight(newValue);
          handleUpdateValue("height", newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlurValue(height, 1, 100, "height")}
      />

      <InputRangeWithNumber
        label="Lebar 1"
        value={width1}
        onChange={(newValue) => {
          setWidth1(newValue);
          handleUpdateValue("width1", newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlurValue(width1, 1, 100, "width1")}
      />

      <InputRangeWithNumber
        label="Lebar 2"
        value={width2}
        onChange={(newValue) => {
          setWidth2(newValue);
          handleUpdateValue("width2", newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlurValue(width2, 1, 100, "width2")}
      />

      <InputRangeWithNumber
        label="Jarak"
        value={distance}
        onChange={(newValue) => {
          setDistance(newValue);
          handleUpdateValue("distance", newValue);
        }}
        min={0}
        max={100}
        onBlur={() => handleSetValueWhenBlurValue(distance, 0, 100, "distance")}
      />

      <div style={{ gap: 10 }} className="d-flex align-items-center my-3">
        <Checkbox
          label="Terbalik"
          id="isFlip"
          checked={isFlip}
          onChange={(e) => {
            const { checked } = e.target;
            setIsFlip(checked);
            handleUpdateValue("isFlip", checked);
          }}
        />

        <Checkbox
          label="Floating"
          id="isFloating"
          checked={isFloating}
          onChange={(e) => {
            const { checked } = e.target;
            setIsFloating(checked);
            handleUpdateValue("isFloating", checked);
          }}
        />
      </div>
    </div>
  );
};

export default StripeLineControl;
