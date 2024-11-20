import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import InputRangeWithNumber from "../../../../../common/InputRangeWithNumber";
import Input from "../../../../../common/Input";

const LineControl = ({ currentContent, handleChangeValueContent }) => {
  const [labelLine, setLabelLine] = useState(currentContent?.label || "Nama");

  const [height, setHeight] = useState(currentContent?.height || 2);

  const [emptySpace, setEmptySpace] = useState(currentContent?.emptySpace || 8);

  const [width, setWidth] = useState(currentContent?.width || 4);

  const [labelLineValue] = useDebounce(labelLine, 300);
  const [heightValue] = useDebounce(height, 500);
  const [emptySpaceValue] = useDebounce(emptySpace, 500);
  const [widthValue] = useDebounce(width, 500);

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

  useEffect(() => {
    if (labelLineValue) {
      handleChangeValueContent("label", labelLineValue);
    }

    if (heightValue && heightValue <= 100) {
      handleChangeValueContent("height", heightValue);
    }

    if (emptySpaceValue && emptySpaceValue <= 100) {
      handleChangeValueContent("emptySpace", emptySpaceValue);
    }

    if (widthValue && widthValue <= 100) {
      handleChangeValueContent("width", widthValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelLineValue, widthValue, emptySpaceValue, heightValue]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Input
        type="text"
        value={labelLine}
        label="Nama"
        onChange={(e) => {
          const { value } = e.target;
          setLabelLine(value);
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

      <InputRangeWithNumber
        label="Ruang Kosong"
        value={emptySpace}
        onChange={(newValue) => {
          setEmptySpace(newValue);
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
        }}
        min={1}
        max={100}
        onBlur={() => handleSetValueWhenBlur(width, 1, 100, "width")}
      />
    </div>
  );
};

export default LineControl;
