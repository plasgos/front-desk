import React, { useEffect, useState } from "react";
import { CButton } from "@coreui/react";
import {
  optionsFbPixelEvent,
  optionsFbPixelId,
} from "../../../../SelectOptions";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import SelectOptions from "../../../../common/SelectOptions";
import Input from "../../../../common/Input";

const recordTimeOptions = [
  { value: "page-finished-loading", label: "Halaman Selesai Loading" },
  { value: "directly", label: "Langsung" },
];

const FbPixelEvent = ({
  currentSection,
  isShowContent,
  isEditingSection,
  sectionBeforeEdit,
  previewFloatingSection,
  setPreviewFloatingSection,
}) => {
  const [recordTime, setRecordTime] = useState(recordTimeOptions[0]);

  const [pixelEvent, setPixelEvent] = useState(
    optionsFbPixelEvent[1].options[6]
  );

  const [pixelId, setPixelId] = useState(optionsFbPixelId[0]);

  const [contentName, setContentName] = useState(
    currentSection?.contentName || ""
  );

  const [pixelValue, setPxielValue] = useState(
    currentSection?.pixelValue || ""
  );

  const [setting, setSetting] = useState({});

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

  useEffect(() => {
    if (isEditingSection) {
      const currentRecordTime = recordTimeOptions.find(
        (opt) => opt.value === currentSection?.recordTime
      );

      if (currentRecordTime) {
        setRecordTime(currentRecordTime);
      }

      const currentPixelEvent = optionsFbPixelEvent.flatMap((group) =>
        group.options.find((opt) => opt.value === currentSection?.pixelEvent)
      );
      if (currentPixelEvent) {
        setPixelEvent(currentPixelEvent);
      }

      const currentPixelId = optionsFbPixelId.find(
        (opt) => opt.value === currentSection?.pixelId
      );

      if (currentPixelId) {
        setPixelId(currentPixelId);
      }
    }
  }, [currentSection, isEditingSection]);

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewFloatingSection);
    let payload = {
      id: uniqueId,
      name: "fb-pixel-event",
      title: "FB Pixel Event",
      recordTime: "page-finished-loading",
      pixelEvent: "view-content",
      pixelId: "fb-id-1",
      contentName: "",
      pixelValue: "",
    };

    setPreviewFloatingSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
      isShowContent(false);
      setPreviewFloatingSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewFloatingSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    isShowContent(false);
  };

  const handleUpdateValue = (key, value) => {
    setPreviewFloatingSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : setting.id;

        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              [key]: value,
            }
          : item;
      })
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center border-bottom p-2 mb-3">
        <div>
          <CButton
            onClick={handleCancel}
            color="primary"
            variant="outline"
            className="mx-2"
          >
            Batal
          </CButton>

          <CButton onClick={handleConfirm} color="primary">
            Selesai
          </CButton>
        </div>
      </div>

      <SelectOptions
        label="Rekam Saat"
        options={recordTimeOptions}
        onChange={(selectedOption) => {
          setRecordTime(selectedOption);
          handleUpdateValue("recordTime", selectedOption.value);
        }}
        value={recordTime}
        width="100"
        customStyles={customStyles}
      />

      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Pixel Event"
          options={optionsFbPixelEvent}
          onChange={(selectedOption) => {
            setPixelEvent(selectedOption);
            handleUpdateValue("pixelEvent", selectedOption.value);
          }}
          value={pixelEvent}
          width="50"
          customStyles={customStyles}
          positionShown="top"
        />

        <SelectOptions
          label="Pixel Id"
          options={optionsFbPixelId}
          onChange={(selectedOption) => {
            setPixelId(selectedOption);
            handleUpdateValue("pixelId", selectedOption.value);
          }}
          value={pixelId}
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
          onChange={(e) => {
            setContentName(e.target.value);
            handleUpdateValue("contentName", e.target.value);
          }}
        />

        <div style={{ position: "relative" }}>
          <div className="form-group  ">
            <label> Pixel Value</label>
            <input
              value={pixelValue}
              onChange={(e) => {
                setPxielValue(e.target.value);
                handleUpdateValue("pixelValue", e.target.value);
              }}
              type="number"
              className="form-control text-right"
              placeholder="0 (Harga Barang)"
            />
          </div>

          <span
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "55%",
              transform: "translateY(-50%)",
              color: "#4B5563",
            }}
          >
            Rp
          </span>
        </div>
      </div>
    </div>
  );
};

export default FbPixelEvent;
