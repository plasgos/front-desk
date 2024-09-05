import React from "react";
import Select from "react-select";

const basicStyles = {
  groupHeading: (provided) => ({
    ...provided,
    color: "#000000", // Warna hitam
    fontWeight: "bold", // Font tebal
    fontSize: "14px", // Ukuran font lebih besar dari opsi
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    cursor: "text",
  }),
};

const SelectOptions = ({
  options,
  onChange,
  value,
  label,
  width = "50",
  customStyles,
  positionShown,
  menuIsOpen,
  getOptionLabel,
  getOptionValue,
}) => {
  return (
    <div style={{ marginBottom: 16 }} className={`w-${width} `}>
      {label && <label style={{ fontSize: 12 }}>{label}</label>}
      <Select
        menuIsOpen={menuIsOpen}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#FED4C6",
            // Set the color when focused
          },
        })}
        classNames={{
          control: (state) =>
            state.isFocused ? "rounded  border-primary" : "rounded",
        }}
        options={options}
        styles={customStyles ? customStyles : basicStyles}
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

export default SelectOptions;
