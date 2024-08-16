import React from "react";
import Select from "react-select";

const basicStyles = {
  groupHeading: (provided) => ({
    ...provided,
    fontWeight: "bold",
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
}) => {
  return (
    <div className={`form-group w-${width} `}>
      <label style={{ fontSize: 12 }}>{label}</label>
      <Select
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
      />
    </div>
  );
};

export default SelectOptions;
