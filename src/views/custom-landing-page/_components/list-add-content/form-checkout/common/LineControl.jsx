import React, { useState } from "react";
import Input from "../../../common/Input";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";

const LineControl = ({ currentContent, handleChangeValueContent }) => {
  const [labelLine, setLabelLine] = useState(currentContent?.label || "Nama");

  const [height, setHeight] = useState(currentContent?.height || 2);

  const [emptySpace, setEmptySpace] = useState(currentContent?.emptySpace || 8);

  const [width, setWidth] = useState(currentContent?.width || 4);

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "height") {
      setHeight(newValue);
    } else if (key === "emptySpace") {
      setEmptySpace(newValue);
    } else if (key === "width") {
      setWidth(newValue);
    }
    handleChangeValueContent(key, newValue);
  };

  return (
    <div>
      <Input
        type="text"
        value={labelLine}
        label="Nama"
        onChange={(e) => {
          const { value } = e.target;
          setLabelLine(value);
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

      <InputRangeWithNumber
        label="Ruang Kosong"
        value={emptySpace}
        onChange={(newValue) => {
          setEmptySpace(newValue);
          handleChangeValueContent("emptySpace", newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlur(emptySpace, 1, 100, "emptySpace")}
      />

      <InputRangeWithNumber
        label="Lebar"
        value={width}
        onChange={(newValue) => {
          setWidth(newValue);
          handleChangeValueContent("width", newValue);
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlur(width, 1, 100, "width")}
      />
    </div>
  );
};

export default LineControl;
