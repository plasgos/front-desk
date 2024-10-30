import { CCard, CCardBody } from "@coreui/react";
import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { useSelector } from "react-redux";
import SelectOptions from "./common/SelectOptions";
import Input from "./common/Input";

const FacebookPixel = () => {
  const { optionsFbPixelId, optionsFbPixelEvent } = useSelector(
    (state) => state.customLandingPage
  );

  const [eventName, setEventName] = useState("");
  const [pixelValue, setPixelValue] = useState("");
  const [contentName, setContentName] = useState("");

  const [selectedOptionPixelEvent, setSelectedOptionPixelEvent] = useState(
    optionsFbPixelEvent[0].options[0]
  );

  const [selectedOptionPixelId, setSelectedOptionPixelId] = useState(
    optionsFbPixelId[0]
  );

  const handleChangeOptionsPixelEvent = (selectedOptionValue) => {
    setSelectedOptionPixelEvent(selectedOptionValue);
  };

  const handleChangeOptionsPixelId = (selectedOptionValue) => {
    setSelectedOptionPixelId(selectedOptionValue);
  };

  const handleChangeContentName = (value) => {
    setContentName(value);
  };

  const handleChangeEventName = (value) => {
    setEventName(value);
  };

  const handleChangePixelValue = (value) => {
    setPixelValue(+value);
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
          {selectedOptionPixelEvent &&
          selectedOptionPixelEvent.value !== undefined &&
          selectedOptionPixelEvent.value !== "custom" ? (
            <>
              <div style={{ gap: 10 }} className="d-flex align-items-center ">
                <SelectOptions
                  label="Pixel Event"
                  options={optionsFbPixelEvent}
                  onChange={handleChangeOptionsPixelEvent}
                  value={selectedOptionPixelEvent}
                  width="50"
                  customStyles={customStyles}
                  positionShown="top"
                />

                <SelectOptions
                  label="Pixel Id"
                  options={optionsFbPixelId}
                  onChange={handleChangeOptionsPixelId}
                  value={selectedOptionPixelId}
                  width="50"
                  customStyles={customStyles}
                  positionShown="top"
                />
              </div>

              <div style={{ gap: 10 }} className="d-flex align-items-center ">
                <Input
                  label="Content Name"
                  value={contentName}
                  placeholder="T-Shirt"
                  type="text"
                  onChange={(e) => handleChangeContentName(e.target.value)}
                />

                <Input
                  label="Pixel Value"
                  value={pixelValue}
                  placeholder="0 (Harga Barang)"
                  type="number"
                  onChange={(e) => handleChangePixelValue(e.target.value)}
                />
              </div>
            </>
          ) : selectedOptionPixelEvent.value === "custom" ? (
            <>
              <div style={{ gap: 10 }} className="d-flex align-items-center ">
                <SelectOptions
                  label="Pixel Event"
                  options={optionsFbPixelEvent}
                  onChange={handleChangeOptionsPixelEvent}
                  value={selectedOptionPixelEvent}
                  width="50"
                  customStyles={customStyles}
                  positionShown="top"
                />
                <Input
                  label="Event Name"
                  value={eventName}
                  placeholder="Custom Event"
                  type="text"
                  onChange={(e) => handleChangeEventName(e.target.value)}
                />
              </div>

              <div style={{ gap: 10 }} className="d-flex align-items-center ">
                <SelectOptions
                  label="Pixel Id"
                  options={optionsFbPixelId}
                  onChange={handleChangeOptionsPixelId}
                  value={selectedOptionPixelId}
                  width="50"
                  customStyles={customStyles}
                  positionShown="top"
                />
                <Input
                  label="Content Name"
                  value={contentName}
                  placeholder="T-Shirt"
                  type="text"
                  onChange={(e) => handleChangeContentName(e.target.value)}
                />
              </div>

              <div
                style={{ gap: 10 }}
                className=" w-50 d-flex align-items-center "
              >
                <Input
                  label="Pixel Value"
                  value={pixelValue}
                  placeholder="0 (Harga Barang)"
                  type="number"
                  onChange={(e) => handleChangePixelValue(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div style={{ gap: 10 }} className="d-flex align-items-center ">
              <SelectOptions
                label="Pixel Event"
                options={optionsFbPixelEvent}
                onChange={handleChangeOptionsPixelEvent}
                value={selectedOptionPixelEvent}
                width="50"
                customStyles={customStyles}
                positionShown="top"
              />
            </div>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default FacebookPixel;
