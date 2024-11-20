import React, { useEffect, useState } from "react";
import { roundedButtonOptions } from "../floating-button/UpdateContent";
import Input from "../../common/Input";
import SelectOptions from "../../common/SelectOptions";
import { CButton } from "@coreui/react";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import { useDispatch } from "react-redux";
import { setPopUpClickOption } from "../../../../../modules/custom-landing-page/reducer";

const shownOnWhenOptions = [
  { value: "clickButton", label: "Klik Tombol" },
  { value: "immediately", label: "Langsung" },
  { value: "waitAfter", label: "Tunggu Setelah" },
  { value: "afterInteraction", label: "Setelah Interaksi" },
];

const UpdateContent = ({ setPreviewFloatingSection, currentSection }) => {
  const [popupName, setPopupName] = useState(currentSection?.popupName || "");

  const [shownOnWhen, setShownOnWhen] = useState(shownOnWhenOptions[1]);

  const [rounded, setRounded] = useState(roundedButtonOptions[2]);

  const [width, setWidth] = useState(currentSection?.width || 500);

  useEffect(() => {
    const currentShownOnWhen = shownOnWhenOptions.find(
      (opt) => opt.value === currentSection?.shownOnWhen
    );

    if (currentShownOnWhen) {
      setShownOnWhen(currentShownOnWhen);
    }

    const currentRounded = roundedButtonOptions.find(
      (opt) => opt.value === currentSection?.rounded
    );

    if (currentRounded) {
      setRounded(currentRounded);
    }
  }, [currentSection]);

  const dispatch = useDispatch();
  const newId = () => Math.random().toString(36).substr(2, 9);

  const handleChangeShownOnWhen = (value) => {
    setPreviewFloatingSection((arr) =>
      arr.map((section) =>
        section.id === currentSection.id
          ? {
              ...section,
              shownOnWhen: value,
            }
          : section
      )
    );

    if (value === "clickButton") {
      const payload = {
        label: "Kegiatan",
        options: [
          {
            id: newId(),
            value: `${popupName}`,
            label: `Pop Up (${popupName})`,
          },
        ],
      };

      dispatch(setPopUpClickOption(payload));
    }
  };

  const handleChangeValue = (key, value) => {
    setPreviewFloatingSection((arr) =>
      arr.map((section) =>
        section.id === currentSection.id
          ? {
              ...section,
              [key]: value,
            }
          : section
      )
    );
  };

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "width") {
      setWidth(newValue);
    }
    handleChangeValue(key, newValue);
  };

  return (
    <div>
      <div className="mb-2">
        <Input
          label="Nama Popup"
          placeholder="Newsletter Popup"
          value={popupName}
          onChange={(e) => {
            const { value } = e.target;
            setPopupName(value);
            handleChangeValue("popupName", value);
          }}
        />
      </div>

      <SelectOptions
        label="Perlihatkan Ketika"
        options={shownOnWhenOptions}
        value={shownOnWhen}
        onChange={(selectedOption) => {
          setShownOnWhen(selectedOption);
          handleChangeShownOnWhen(selectedOption.value);
        }}
      />

      <h5>Desain</h5>

      <div style={{ gap: 10 }} className="d-flex align-items-center">
        <SelectOptions
          label="Melingkar"
          options={roundedButtonOptions}
          value={rounded}
          onChange={(selectedOption) => {
            setRounded(selectedOption);
            handleChangeValue("rounded", selectedOption.value);
          }}
        />

        <CButton
          onClick={() => handleChangeValue("isPopupShown", true)}
          color="primary"
          variant="outline"
          size="md"
        >
          Perlihatkan
        </CButton>
      </div>

      <InputRangeWithNumber
        label="Jarak"
        value={width}
        onChange={(newValue) => {
          setWidth(newValue);
          handleChangeValue("width", newValue);
        }}
        min={120}
        max={1024}
        onBlur={() => handleSetValueWhenBlur(width, 120, 10204, "width")}
      />
    </div>
  );
};

export default UpdateContent;
