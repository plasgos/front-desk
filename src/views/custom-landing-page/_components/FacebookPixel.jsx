import { CCard, CCardBody, CCardTitle } from "@coreui/react";
import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Select from "react-select";

const FacebookPixel = () => {
  const [selectedOption, setSelectedOption] = useState(undefined);

  const { optionsFacebookPixel } = useSelector(
    (state) => state.customLandingPage
  );

  const handleChange = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
  };

  const customStyles = {
    groupHeading: (provided) => ({
      ...provided,
      fontWeight: "bold",
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      cursor: "text",
    }),
    option: (provided, state) => ({
      ...provided,
      whiteSpace: "nowrap", // Prevents the text from wrapping
    }),
    menu: (provided, state) => ({
      ...provided,
      width: "auto", // Adjust the menu width to fit the content
      minWidth: "100%", // Ensures it doesn't get smaller than the select input
    }),
    menuList: (provided, state) => ({
      ...provided,
      width: "auto",
      minWidth: "100%",
    }),
  };

  return (
    <div>
      <CCard>
        <div
          style={{
            backgroundColor: "#F8F9FA",
          }}
          className="d-flex align-items-center mb-2 p-2 rounded-left rounded-top "
        >
          <FaFacebookF style={{ marginRight: 4 }} /> Facebook Pixel
        </div>
        <CCardBody className="p-2">
          <div style={{ gap: 10 }} className="d-flex align-items-center ">
            <div className="form-group w-50">
              <label style={{ fontSize: 14 }}>Pixel Event</label>
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
                options={optionsFacebookPixel}
                styles={customStyles}
                onChange={handleChange}
                isSearchable={false}
                value={selectedOption}
                defaultValue={optionsFacebookPixel[0].options[0]}
              />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default FacebookPixel;
