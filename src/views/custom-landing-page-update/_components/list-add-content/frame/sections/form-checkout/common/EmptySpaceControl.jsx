import React, { useEffect, useState } from "react";
import Input from "../../../../../common/Input";
import InputRangeWithNumber from "../../../../../common/InputRangeWithNumber";
import { useDebounce } from "use-debounce";

const EmptySpaceControl = ({ currentContent, handleChangeValueContent }) => {
  const [height, setHeight] = useState(currentContent?.height || 24);

  const [label, setLabel] = useState(currentContent?.label || "Nama");
  const [labelValue] = useDebounce(label, 300);
  const [heightValue] = useDebounce(height, 500);

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "height") {
      setHeight(newValue);
    }
    handleChangeValueContent(key, newValue);
  };

  useEffect(() => {
    if (labelValue) {
      handleChangeValueContent("label", labelValue);
    }

    if (heightValue && heightValue <= 100) {
      handleChangeValueContent("height", heightValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelValue, heightValue]);

  return (
    <div>
      <Input
        type="text"
        value={label}
        label="Nama"
        onChange={(e) => {
          const { value } = e.target;
          setLabel(value);
        }}
      />

      <InputRangeWithNumber
        label="Tinggi"
        value={height}
        onChange={(newValue) => {
          setHeight(newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlur(height, 1, 100, "height")}
      />
    </div>
  );
};

export default EmptySpaceControl;
