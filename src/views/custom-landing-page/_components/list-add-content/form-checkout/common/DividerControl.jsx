import React, { useEffect, useState } from "react";
import Input from "../../../common/Input";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";
import { useDebounce } from "use-debounce";

const DividerControl = ({ currentContent, handleChangeValueContent }) => {
  const [fontSizeDivider, setFontSizeDivider] = useState(
    currentContent?.fontSize || 12
  );

  const [labelDivider, setLabelDivider] = useState(
    currentContent?.label || "Nama"
  );

  const [labelDividerValue] = useDebounce(labelDivider, 1000);
  const [fontSizeDividerValue] = useDebounce(fontSizeDivider, 500);

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSize") {
      setFontSizeDivider(newValue);
    }
    handleChangeValueContent(key, newValue);
  };

  useEffect(() => {
    if (labelDividerValue) {
      handleChangeValueContent("label", labelDividerValue);
    }

    if (fontSizeDividerValue && fontSizeDividerValue <= 100) {
      handleChangeValueContent("fontSize", fontSizeDividerValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelDividerValue, fontSizeDividerValue]);

  return (
    <div>
      <Input
        type="text"
        value={labelDivider}
        label="Nama"
        onChange={(e) => {
          const { value } = e.target;
          setLabelDivider(value);
        }}
      />
      <h5>Desain</h5>

      <InputRangeWithNumber
        label="Ukuran Font"
        value={fontSizeDivider}
        onChange={(newValue) => {
          setFontSizeDivider(newValue);
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
