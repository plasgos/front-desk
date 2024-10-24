import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { SketchPicker } from "react-color";
const ColorPicker = ({
  label,
  initialColor,
  onChange,
  width = "w-50",
  flexEnd = false,
  bottom,
  left,
  right,
  top,
  type,
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const changeColor = (color, rgbaColor) => {
    const { r, g, b, a } = color.rgb;
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`;

    if (rgbaColor) {
      setSelectedColor(rgba);
      if (onChange) {
        onChange(rgba); // Call the onChange prop function with the new color
      }
    } else {
      setSelectedColor(color.hex);
      if (onChange) {
        onChange(color.hex); // Call the onChange prop function with the new color
      }
    }
  };

  const closeColorPicker = () => {
    setShowColorPicker(false);
  };

  useEffect(() => {
    setSelectedColor(initialColor);
  }, [initialColor, selectedColor]);

  const popover = {
    position: "absolute",
    zIndex: "99999",
    top: 40,
  };

  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <div
      style={{ position: "relative" }}
      className={`${width} d-flex  align-items-center ${
        flexEnd && `${flexEnd} mr-3 `
      }  `}
    >
      <div
        onClick={toggleColorPicker}
        style={{
          width: 35,
          height: 35,
          backgroundColor: selectedColor,
          cursor: "pointer",
        }}
        className="rounded border"
      />
      <div className="mb-1 ml-2" style={{ fontFamily: "Arial" }}>
        {label}
      </div>

      {showColorPicker && (
        <div style={popover}>
          <div style={cover} onClick={closeColorPicker} />

          {type === "rgba" ? (
            <SketchPicker
              color={selectedColor}
              onChange={(color) => changeColor(color, "rgbaColor")}
            />
          ) : (
            <ChromePicker
              color={selectedColor}
              onChange={(color) => changeColor(color)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
