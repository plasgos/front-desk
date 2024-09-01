import React, { useEffect } from "react";
//
import { useSelector, useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";
import { getSubdistrict } from "../../../../redux/modules/addresses/actions/actions";

export const SelectDistrict = ({
  onSelectDistrict,
  label,
  placeholder,
  style,
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

  const dispatch = useDispatch();
  const { subdistricts } = useSelector((state) => state.addresses);
  const getData = () => {
    dispatch(getSubdistrict());
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredSubdistricts = (inputValue) => {
    return (
      subdistricts?.filter(
        (data) =>
          data.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          data.City.name.toLowerCase().includes(inputValue.toLowerCase())
      ) || []
    ).map((data) => ({
      value: data, // or any unique identifier from your data
      label: `${data.name}, ${data.City.type} ${data.City.name}, ${data.City.Province.name}`,
    }));
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filteredSubdistricts(inputValue));
    }, 1000);
  };

  const handleSelectChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : null;

    onSelectDistrict(selectedValue);
  };

  return (
    <div style={{ marginBottom: 16 + distance }} className="w-100">
      <label
        className={`${fontStyle}`}
        style={{ fontSize: fontSizeLabel, color: labelColor }}
      >
        {label}
      </label>

      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleSelectChange}
        placeholder={placeholder}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: outlineInputColor, // Warna saat input terfokus
            primary25: bgInputColor,
            // Warna background saat terfokus
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: `${borderRadius}px`, // Mengatur border-radius
            borderColor: outlineInputColor, // Warna border default
            borderWidth: `${outlineInputColorSize}px`, // Ketebalan border
            backgroundColor: bgInputColor,
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
      />
    </div>
  );
};
