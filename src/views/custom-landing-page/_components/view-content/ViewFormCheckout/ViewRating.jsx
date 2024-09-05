import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
const ViewRating = ({ style, label, name, control, design, required }) => {
  const {
    labelColor,
    fontSizeLabel,
    fontStyle,
    distance,
    fontSizeTextInputColor,
  } = style || {};

  const { setValue } = useFormContext();

  useEffect(() => {
    if (label !== undefined) {
      setValue(`${name}-label`, label);
    }
  }, [label, name, setValue]);

  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const getIconStyle = (index, color) => ({
    transition: "transform 0.3s ease, color 0.3s ease",
    cursor: "pointer",
    transform:
      (hoverIndex !== null && index <= hoverIndex) ||
      (selectedIndex !== null && index <= selectedIndex)
        ? "scale(1.25)"
        : "scale(1)",
    color:
      (hoverIndex !== null && index <= hoverIndex) ||
      (selectedIndex !== null && index <= selectedIndex)
        ? color
        : "#E0E0E0", // Default grey color for unselected and not hovered icons
  });

  const handleIconClick = (index, onChange) => {
    setSelectedIndex(index);
    onChange(index + 1); // Mengirim nilai yang dipilih (1-5)
  };

  return (
    <div style={{ marginBottom: 16 + distance }}>
      <Controller
        name={`${name}-label`}
        control={control}
        defaultValue={label}
        rules={{ required: required ? "Harus Di Isi" : false }}
        render={({ field: { value: labelValue, onChange: onLabelChange } }) => (
          <label
            className={`${fontStyle}`}
            style={{ fontSize: fontSizeLabel, color: labelColor }}
          >
            {labelValue}
          </label>
        )}
      />

      <Controller
        name={name}
        control={control}
        rules={{ required: required ? "Harus Di Isi" : false }}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <div className="tw-flex tw-items-center tw-gap-x-3">
              {design === "star" ? (
                <div className="tw-flex tw-gap-x-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      onClick={() => handleIconClick(index, onChange)}
                      size={16 + fontSizeTextInputColor}
                      style={getIconStyle(index, "#f59e0b")}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                    />
                  ))}
                </div>
              ) : (
                <div className="tw-flex tw-gap-x-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <IoMdHeart
                      key={index}
                      onClick={() => handleIconClick(index, onChange)}
                      size={16 + fontSizeTextInputColor}
                      style={getIconStyle(index, "#ff0000")}
                      onMouseEnter={() => setHoverIndex(index)}
                      onMouseLeave={() => setHoverIndex(null)}
                    />
                  ))}
                </div>
              )}
            </div>
            {error && (
              <span className="tw-text-red-500 tw-text-sm">
                {error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default ViewRating;
