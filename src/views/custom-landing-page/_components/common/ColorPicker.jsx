import React, { useState } from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({ label, initialColor, onChange, flexEnd }) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const changeColor = (color) => {
    setSelectedColor(color.hex);
    if (onChange) {
      onChange(color.hex); // Call the onChange prop function with the new color
    }
  };

  const closeColorPicker = () => {
    setShowColorPicker(false);
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
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
      className={`d-flex  align-items-center ${
        flexEnd && `${flexEnd} mr-3`
      }  w-50`}
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
          <ChromePicker
            color={selectedColor}
            onChange={(color) => changeColor(color)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
