import React from "react";
import Select from "react-select";

const SelectOptionsCutomForm = ({
  style,
  placeholder,
  options,
  onChange,
  value,
  label,
  positionShown,
  menuIsOpen,
  getOptionLabel,
  getOptionValue,
}) => {
  const {
    labelColor,
    textInputColor,
    bgInputColor,
    outlineInputColor,
    fontSizeLabel,
    fontStyle,
    fontSizeTextInputColor,
    outlineInputColorSize,
    borderRadius,
    distance,
  } = style || {};

  return (
    <div style={{ marginBottom: 16 + distance }} className="tw-w-full">
      {label && (
        <label
          className={`${fontStyle}`}
          style={{ fontSize: fontSizeLabel, color: labelColor }}
        >
          {label}
        </label>
      )}
      <Select
        placeholder={placeholder}
        menuIsOpen={menuIsOpen}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: outlineInputColor, // Warna saat input terfokus
            primary25: bgInputColor,
            // Warna background saat terfokus
          },
        })}
        options={options}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: `${borderRadius}px`, // Mengatur border-radius
            borderColor: outlineInputColor, // Warna border default
            borderWidth: `${outlineInputColorSize}px`, // Ketebalan border
            backgroundColor: state.isFocused ? "tw-bg-sky-500" : bgInputColor,
            boxShadow: state.isFocused
              ? `0 0 0 ${outlineInputColorSize}px ${outlineInputColor}`
              : baseStyles.boxShadow,
            "&:hover": {
              borderColor: outlineInputColor, // Warna border saat dihover
            },
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: textInputColor, // Warna placeholder
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: textInputColor,
            fontSize: `${fontSizeTextInputColor}px`, // Warna teks input
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: textInputColor, // Warna teks terpilih
          }),
        }}
        onChange={onChange}
        isSearchable={false}
        value={value}
        menuPlacement={positionShown ? positionShown : "auto"}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
      />
    </div>
  );
};

export default SelectOptionsCutomForm;
