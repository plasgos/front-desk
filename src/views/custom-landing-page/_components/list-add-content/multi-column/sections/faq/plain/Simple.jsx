import React from "react";
import useSectionStyle from "../../../../../../../../hooks/useStyleFAQ";
import ColorPicker from "../../../../../common/ColorPicker";
import SelectOptions from "../../../../../common/SelectOptions";
import InputRangeWithNumber from "../../../../../common/InputRangeWithNumber";
import { maxColumnFAQOptions } from "../../../../../SelectOptions";

const PlainSimple = ({ currentSection, handleChangeStyle }) => {
  const {
    setColorTitle,
    setColorContent,
    setFontSize,
    setMaxColumn,
    styleProps,
  } = useSectionStyle(currentSection);
  const { colorTitle, colorContent, fontSize, maxColumn } = styleProps;

  const handleChangeStyleWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSize") {
      setFontSize(newValue);
    }

    handleChangeStyle(key, newValue);
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={colorTitle}
          label="Judul"
          onChange={(color) => {
            setColorTitle(color);
            handleChangeStyle("colorTitle", color);
          }}
          bottom={"10px"}
        />

        <ColorPicker
          initialColor={colorContent}
          label="Konten"
          onChange={(color) => {
            setColorContent(color);
            handleChangeStyle("colorContent", color);
          }}
          bottom={"10px"}
        />
      </div>

      <SelectOptions
        label="Kolom Maksimal"
        options={maxColumnFAQOptions}
        onChange={(selectedOption) => {
          setMaxColumn(selectedOption);
          handleChangeStyle("maxColumn", selectedOption.value);
        }}
        value={maxColumn}
        width="50"
      />

      <InputRangeWithNumber
        label="Ukuran Font Judul"
        value={fontSize}
        onChange={(newValue) => {
          setFontSize(newValue);
          handleChangeStyle("fontSize", newValue);
        }}
        min={12}
        max={40}
        onBlur={() => handleChangeStyleWhenBlur(fontSize, 12, 40, "fontSize")}
      />
    </div>
  );
};

export default PlainSimple;
