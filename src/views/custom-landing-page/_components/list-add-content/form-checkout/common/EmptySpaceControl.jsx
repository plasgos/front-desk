import React, { useState } from "react";
import Input from "../../../common/Input";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";

const EmptySpaceControl = ({ currentContent, handleChangeValueContent }) => {
  const [height, setHeight] = useState(currentContent?.height || 24);

  const [label, setLabel] = useState(currentContent?.label || "Nama");

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "height") {
      setHeight(newValue);
    }
    handleChangeValueContent(key, newValue);
  };

  return (
    <div>
      <Input
        type="text"
        value={label}
        label="Nama"
        onChange={(e) => {
          const { value } = e.target;
          setLabel(value);
          handleChangeValueContent("label", value);
        }}
      />

      <InputRangeWithNumber
        label="Tinggi"
        value={height}
        onChange={(newValue) => {
          setHeight(newValue);
          handleChangeValueContent("height", newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlur(height, 1, 100, "height")}
      />
    </div>
  );
};

export default EmptySpaceControl;
