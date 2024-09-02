import React, { useState } from "react";
import Input from "../../../common/Input";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";

const DividerControl = ({ currentContent, handleChangeValueContent }) => {
  const [fontSizeDivider, setFontSizeDivider] = useState(
    currentContent?.fontSize || 12
  );

  const [labelDivider, setLabelDivider] = useState(
    currentContent?.label || "Nama"
  );

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSize") {
      setFontSizeDivider(newValue);
    }
    handleChangeValueContent(key, newValue);
  };

  return (
    <div>
      <Input
        type="text"
        value={labelDivider}
        label="Nama"
        onChange={(e) => {
          const { value } = e.target;
          setLabelDivider(value);
          handleChangeValueContent("label", value);
        }}
      />
      <h5>Desain</h5>

      <InputRangeWithNumber
        label="Ukuran Font"
        value={fontSizeDivider}
        onChange={(newValue) => {
          setFontSizeDivider(newValue);
          handleChangeValueContent("fontSize", newValue);
        }}
        min={12}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlur(fontSizeDivider, 12, 100, "fontSize")
        }
      />
    </div>
  );
};

export default DividerControl;
