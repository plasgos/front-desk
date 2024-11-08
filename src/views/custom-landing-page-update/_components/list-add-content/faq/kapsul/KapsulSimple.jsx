import React from "react";
import ColorPicker from "../../../common/ColorPicker";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";
import SelectOptions from "../../../common/SelectOptions";
import { maxColumnFAQOptions, shadowOptions } from "../../../SelectOptions";
import useSectionStyle from "../../../../../../hooks/useStyleFAQ";

const KapsulSimple = ({ currentSection, handleChangeStyle }) => {
  const {
    setColorTitle,
    setColorContent,
    setFontSize,
    setMaxColumn,
    setBgColor,
    setBorderColor,
    setShadow,
    setRounded,
    styleProps,
  } = useSectionStyle(currentSection);
  const {
    colorTitle,
    colorContent,
    fontSize,
    maxColumn,
    bgColor,
    borderColor,
    shadow,
    rounded,
  } = styleProps;

  const handleChangeStyleWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSize") {
      setFontSize(newValue);
    } else if (key === "rounded") {
      setRounded(newValue);
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
        />

        <ColorPicker
          initialColor={colorContent}
          label="Konten"
          onChange={(color) => {
            setColorContent(color);
            handleChangeStyle("colorContent", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={bgColor}
          label="Background"
          onChange={(color) => {
            setBgColor(color);
            handleChangeStyle("bgColor", color);
          }}
          width="w-0"
        />

        <ColorPicker
          initialColor={borderColor}
          label="Garis Luar"
          onChange={(color) => {
            setBorderColor(color);
            handleChangeStyle("borderColor", color);
          }}
          width="w-0"
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
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

        <SelectOptions
          label="Bayangan"
          options={shadowOptions}
          onChange={(selectedOption) => {
            setShadow(selectedOption);
            handleChangeStyle("shadow", selectedOption.value);
          }}
          value={shadow}
          width="50"
        />
      </div>

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

      <InputRangeWithNumber
        label="Rounded"
        value={rounded}
        onChange={(newValue) => {
          setRounded(newValue);
          handleChangeStyle("rounded", newValue);
        }}
        min={0}
        max={30}
        onBlur={() => handleChangeStyleWhenBlur(rounded, 0, 30, "rounded")}
      />
    </div>
  );
};

export default KapsulSimple;
