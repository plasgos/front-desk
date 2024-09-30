import React, { useState } from "react";
import ColorPicker from "../../../../common/ColorPicker";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import { setUpdateValue } from "./StripeLineControl";

const BasicLineControl = ({
  setPreviewSection,
  currentSection,
  sectionId,
  columnId,
}) => {
  const [colorBasicLine, setColorBasicLine] = useState(
    currentSection?.content?.colorBasicLine || "#FFCC80"
  );

  const [heightBasicLine, setHeightBasicLine] = useState(
    currentSection?.content?.heightBasicLine || 20
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
    if (key === "heightBasicLine") {
      setHeightBasicLine(newValue);
    }
    handleUpdateValue(key, newValue);
  };

  return (
    <div>
      <div className="mb-3">
        <ColorPicker
          initialColor={colorBasicLine}
          label="Garis"
          onChange={(color) => {
            setColorBasicLine(color);
            handleUpdateValue("colorBasicLine", color);
          }}
          bottom={"18px"}
          type="rgba"
        />
      </div>

      <InputRangeWithNumber
        label="Tinggi"
        value={heightBasicLine}
        onChange={(newValue) => {
          setHeightBasicLine(newValue);
          handleUpdateValue("heightBasicLine", newValue);
        }}
        min={1}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurValue(
            heightBasicLine,
            1,
            100,
            "heightBasicLine"
          )
        }
      />
    </div>
  );
};

export default BasicLineControl;
