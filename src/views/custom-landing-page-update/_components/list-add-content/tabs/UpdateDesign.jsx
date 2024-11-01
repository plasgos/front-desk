import React, { useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";

const UpdateDesign = ({
  currentSection,
  currentColumn,
  handleChangeWrapperStyle,
}) => {
  console.log("🚀 ~ currentColumn:", currentColumn);
  const [bgColor, setBgColor] = useState(
    currentSection?.wrapperStyle?.bgColor || "#F5F5F5"
  );

  const [activeBg, setActiveBg] = useState(
    currentSection?.wrapperStyle?.activeBg || "#ffffff"
  );

  const [textColor, setTextColor] = useState(
    currentSection?.wrapperStyle?.textColor || "#BDBDBD"
  );

  const [textHover, setTextHover] = useState(
    currentSection?.wrapperStyle?.textHover || "#fa541c"
  );

  const [activeText, setActiveText] = useState(
    currentSection?.wrapperStyle?.activeText || "#fa541c"
  );

  const [lineTab, setLineTab] = useState(
    currentSection?.wrapperStyle?.lineTab || "#E0E0E0"
  );

  const [lineContent, setLineContent] = useState(
    currentSection?.wrapperStyle?.lineContent || "#E0E0E0"
  );

  const [fontSize, setFontSize] = useState(
    currentSection?.wrapperStyle?.fontSize || 17
  );

  const [iconSize, setIconSize] = useState(currentColumn?.iconSIze || 24);

  const [imageSize, setImageSize] = useState(currentColumn?.imageSize || 30);

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);

    if (key === "fontSize") {
      setFontSize(newValue);
    } else if (key === "iconSize") {
      setIconSize(newValue);
    } else if (key === "imageSize") {
      setImageSize(newValue);
    }

    handleChangeWrapperStyle(key, newValue);
  };

  return (
    <div>
      <div
        style={{ gap: 20, width: "85%" }}
        className="d-flex align-items-center mb-3  "
      >
        <ColorPicker
          initialColor={bgColor}
          label="Background"
          onChange={(color) => {
            setBgColor(color);
            handleChangeWrapperStyle("bgColor", color);
          }}
          width="w-0"
        />
        <ColorPicker
          initialColor={activeBg}
          label="Background (Aktif)"
          onChange={(color) => {
            setActiveBg(color);
            handleChangeWrapperStyle("activeBg", color);
          }}
          width="w-0"
        />
      </div>

      <div
        style={{ gap: 20, width: "85%" }}
        className="d-flex align-items-center mb-3 "
      >
        <ColorPicker
          initialColor={textColor}
          label="Teks"
          onChange={(color) => {
            setTextColor(color);
            handleChangeWrapperStyle("textColor", color);
          }}
          width="w-0"
        />
        <ColorPicker
          initialColor={textHover}
          label="Teks (Hover)"
          onChange={(color) => {
            setTextHover(color);
            handleChangeWrapperStyle("textHover", color);
          }}
          width="w-0"
        />
      </div>

      <div
        style={{ gap: 20, width: "85%" }}
        className="d-flex align-items-center mb-3 "
      >
        <ColorPicker
          initialColor={activeText}
          label="Teks (Aktif)"
          onChange={(color) => {
            setActiveText(color);
            handleChangeWrapperStyle("activeText", color);
          }}
          width="w-0"
        />
        <ColorPicker
          initialColor={lineTab}
          label="Garis (Tab)"
          onChange={(color) => {
            setLineTab(color);
            handleChangeWrapperStyle("lineTab", color);
          }}
          width="w-0"
        />
      </div>

      <div className="mb-3">
        <ColorPicker
          initialColor={lineContent}
          label="Garis (Konten)"
          onChange={(color) => {
            setLineContent(color);
            handleChangeWrapperStyle("lineContent", color);
          }}
          width="w-0"
        />
      </div>

      <h5>Font</h5>

      {currentColumn?.icon && Object.keys(currentColumn?.icon).length > 0 && (
        <InputRangeWithNumber
          label="Ukuran Icon"
          value={iconSize}
          onChange={(newValue) => {
            setIconSize(newValue);
            handleChangeWrapperStyle("iconSize", newValue);
          }}
          min={14}
          max={50}
          onBlur={() =>
            handleSetValueWhenBlurWrapperStyle(iconSize, 14, 50, "iconSize")
          }
        />
      )}

      {currentColumn?.image && (
        <InputRangeWithNumber
          label="Ukuran Gambar"
          value={imageSize}
          onChange={(newValue) => {
            setImageSize(newValue);
            handleChangeWrapperStyle("imageSize", newValue);
          }}
          min={30}
          max={120}
          onBlur={() =>
            handleSetValueWhenBlurWrapperStyle(imageSize, 30, 120, "imageSize")
          }
        />
      )}

      <InputRangeWithNumber
        label="Ukuran Font"
        value={fontSize}
        onChange={(newValue) => {
          setFontSize(newValue);
          handleChangeWrapperStyle("fontSize", newValue);
        }}
        min={1}
        max={100}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(fontSize, 1, 100, "fontSize")
        }
      />
    </div>
  );
};

export default UpdateDesign;
