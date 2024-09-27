import React, { useEffect } from "react";
//
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../redux/modules/addresses/actions/actions";
import AsyncSelect from "react-select/async";

export const InputDistrict = ({ onSelectDistrict }) => {
  const dispatch = useDispatch();
  const { subdistricts } = useSelector((state) => state.addresses);
  const getData = () => {
    dispatch(actions.getSubdistrict());
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
    }, 300);
  };

  const handleSelectChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : null;

    onSelectDistrict(selectedValue);
  };

  return (
    <div className="w-100">
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleSelectChange}
        placeholder="Masukan Kecamatan / Kota "
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
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "text",
          }),
        }}
      />
    </div>
  );
};
