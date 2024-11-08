import React from "react";
import ColorPicker from "../../../common/ColorPicker";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";
import SelectOptions from "../../../common/SelectOptions";
import { maxColumnFAQOptions } from "../../../SelectOptions";
import useSectionStyle from "../../../../../../hooks/useStyleFAQ";

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
    <div
      style={{
        height: "60vh",
      }}
    >
      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={colorTitle}
          label="Judul"
          onChange={(color) => {
            setColorTitle(color);
            handleChangeStyle("colorTitle", color);
          }}
          width="w-0"
        />

        <ColorPicker
          initialColor={colorContent}
          label="Konten"
          onChange={(color) => {
            setColorContent(color);
            handleChangeStyle("colorContent", color);
          }}
          width="w-0"
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
