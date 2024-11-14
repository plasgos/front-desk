import React from "react";
import useSectionStyle from "../../../../../../hooks/useStyleFAQ";
import { shadowOptions } from "../../../SelectOptions";
import Checkbox from "../../../common/Checkbox";
import ColorPicker from "../../../common/ColorPicker";
import IconUploader from "../../../common/IconUploader";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";
import SelectOptions from "../../../common/SelectOptions";

const Accordion = ({
  currentSection,
  handleChangeStyle,
  handleFileUpload,
  handleSearchIcon,
  icon,
  imageUrl,
  iconPack,
}) => {
  const {
    setColorTitle,
    setColorContent,
    setFontSize,
    setBgColor,
    setBorderColor,
    setShadow,
    setIconSize,
    setIconColor,
    setBgContent,
    setBorderWidth,
    setDistance,
    setDividerColor,
    setIsIconOnRight,
    styleProps,
  } = useSectionStyle(currentSection);
  const {
    colorTitle,
    colorContent,
    fontSize,
    bgColor,
    borderColor,
    shadow,
    bgContent,
    borderWidth,
    distance,
    dividerColor,
    iconColor,
    iconSize,
    isIconOnRight,
  } = styleProps;

  const handleChangeStyleWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSize") {
      setFontSize(newValue);
    } else if (key === "distance") {
      setDistance(newValue);
    } else if (key === "borderWidth") {
      setBorderWidth(newValue);
    } else if (key === "iconSize") {
      setIconSize(newValue);
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
        />

        <ColorPicker
          initialColor={borderColor}
          label="Garis Luar"
          onChange={(color) => {
            setBorderColor(color);
            handleChangeStyle("borderColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={iconColor}
          label="Icon"
          onChange={(color) => {
            setIconColor(color);
            handleChangeStyle("iconColor", color);
          }}
        />

        <ColorPicker
          initialColor={dividerColor}
          label="Garis"
          onChange={(color) => {
            setDividerColor(color);
            handleChangeStyle("dividerColor", color);
          }}
        />
      </div>

      <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
        <ColorPicker
          initialColor={bgContent}
          label="Konten Background"
          onChange={(color) => {
            setBgContent(color);
            handleChangeStyle("bgContent", color);
          }}
        />
      </div>

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

      <InputRangeWithNumber
        label="Font Size"
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
        label="Jarak"
        value={distance}
        onChange={(newValue) => {
          setDistance(newValue);
          handleChangeStyle("distance", newValue);
        }}
        min={0}
        max={100}
        onBlur={() => handleChangeStyleWhenBlur(distance, 0, 100, "distance")}
      />

      <InputRangeWithNumber
        label="Lebar Border"
        value={borderWidth}
        onChange={(newValue) => {
          setBorderWidth(newValue);
          handleChangeStyle("borderWidth", newValue);
        }}
        min={0}
        max={40}
        onBlur={() =>
          handleChangeStyleWhenBlur(borderWidth, 0, 40, "borderWidth")
        }
      />

      <IconUploader
        iconPack={iconPack}
        icon={icon}
        imageUrl={imageUrl}
        handleFileUpload={handleFileUpload}
        handleSearchIcon={handleSearchIcon}
      />

      <div style={{ gap: 10 }} className="d-flex align-items-center my-3">
        <Checkbox
          label="Di Kanan"
          id="isIconOnRight"
          checked={isIconOnRight}
          onChange={(e) => {
            const { checked } = e.target;
            setIsIconOnRight(checked);
            handleChangeStyle("isIconOnRight", checked);
          }}
        />
      </div>

      <InputRangeWithNumber
        label="Ukuran Icon"
        value={iconSize}
        onChange={(newValue) => {
          setIconSize(newValue);
          handleChangeStyle("iconSize", newValue);
        }}
        min={0}
        max={40}
        onBlur={() => handleChangeStyleWhenBlur(iconSize, 0, 40, "iconSize")}
      />
    </div>
  );
};

export default Accordion;
