import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";

const shadowOptions = [
  { value: "", label: "Tidak Ada" },
  { value: "tw-shadow", label: "Ringan" },
];

const IconTab = ({ setPreviewSection, currentSection, isEditing }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [colorIcon, setColorIcon] = useState(
    currentSection.iconStyle?.color || "#424242"
  );
  const [shadow, setShadow] = useState(shadowOptions[0]);
  const [iconSize, setIconSize] = useState(
    currentSection.iconStyle?.iconSize || 24
  );
  const [verticalPosition, setVerticalPosition] = useState(
    currentSection.iconStyle?.verticalPosition || 0
  );
  const [horizontalPosition, setHorizontalPosition] = useState(
    currentSection?.iconStyle?.horizontalPosition ||
      currentSection?.iconStyle?.horizontalPosition === 0
      ? currentSection?.iconStyle?.horizontalPosition
      : 14
  );

  useEffect(() => {
    if (isEditing) {
      const currentShadow = shadowOptions.find(
        (opt) => opt.value === currentSection?.iconStyle?.shadow
      );

      if (currentShadow) {
        setShadow(currentShadow);
      }
    }
  }, [currentSection, isEditing]);

  const handleChangeColorIcon = (color) => {
    setColorIcon(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              iconStyle: {
                ...item.iconStyle,
                color,
              },
            }
          : item
      )
    );
  };

  const handleCangeShadow = (selectedOption) => {
    setShadow(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              iconStyle: {
                ...item.iconStyle,
                shadow: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleUpdateValue = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              iconStyle: {
                ...item.iconStyle,
                [key]: value,
              },
            }
          : item
      )
    );
  };

  const handleSetValueWhenBlurValue = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "iconSize") {
      setIconSize(newValue);
    } else if (key === "verticalPosition") {
      setVerticalPosition(newValue);
    } else if (key === "horizontalPosition") {
      setHorizontalPosition(newValue);
    }
    handleUpdateValue(key, newValue);
  };

  useEffect(() => {
    // Memeriksa apakah iconStyle.icon adalah string (URL) atau bukan
    if (typeof currentSection?.iconStyle?.icon === "string") {
      setImageUrl(currentSection.iconStyle?.icon);
    } else {
      setImageUrl(""); // Reset jika bukan string
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (imageUrl !== "") {
      // Update tempSections hanya jika imageUrl bukan string kosong
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                iconStyle: {
                  ...item.iconStyle,
                  icon: imageUrl,
                },
              }
            : item
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };
  return (
    <div>
      <div className="d-flex align-items-center mb-2 ">
        <div className="">
          {imageUrl && (
            <div
              style={{
                backgroundColor: "#F5F5F5",
                width: 146,
                height: 40,
                overflow: "hidden",
              }}
              className="mx-auto mb-2"
            >
              <img
                style={{ objectFit: "contain", width: "100%", height: 100 }}
                src={imageUrl}
                alt="img"
              />
            </div>
          )}

          {!imageUrl && (
            <div
              style={{
                backgroundColor: "#F5F5F5",
                width: "100%",
                overflow: "hidden",
              }}
              className="mx-auto mb-2 p-2"
            >
              <div>{currentSection?.iconStyle?.icon}</div>
            </div>
          )}

          <div style={{ gap: 5 }} className="d-flex align-items-center">
            <ColorPicker
              initialColor={colorIcon}
              onChange={handleChangeColorIcon}
              width="w-0"
              bottom={"-10px"}
            />

            <CButton
              onClick={handleFileUpload}
              color="primary"
              variant="outline"
            >
              Upload
            </CButton>

            <CButton
              onClick={handleFileUpload}
              color="primary"
              variant="outline"
            >
              Cari
            </CButton>
          </div>
        </div>
      </div>

      <SelectOptions
        label="Bayangan"
        options={shadowOptions}
        onChange={handleCangeShadow}
        value={shadow}
        width="50"
      />

      <InputRangeWithNumber
        label="Ukuran Icon"
        value={iconSize}
        onChange={(newValue) => {
          setIconSize(newValue);
          handleUpdateValue("iconSize", newValue);
        }}
        min={10}
        max={60}
        onBlur={() => handleSetValueWhenBlurValue(iconSize, 10, 60, "iconSize")}
      />

      <InputRangeWithNumber
        label="Posisi Vertical"
        value={verticalPosition}
        onChange={(newValue) => {
          setVerticalPosition(newValue);
          handleUpdateValue("verticalPosition", newValue);
        }}
        min={-40}
        max={40}
        onBlur={() =>
          handleSetValueWhenBlurValue(
            verticalPosition,
            -40,
            40,
            "verticalPosition"
          )
        }
      />

      <InputRangeWithNumber
        label="Horizontal Vertical"
        value={horizontalPosition}
        onChange={(newValue) => {
          setHorizontalPosition(newValue);
          handleUpdateValue("horizontalPosition", newValue);
        }}
        min={-40}
        max={40}
        onBlur={() =>
          handleSetValueWhenBlurValue(
            horizontalPosition,
            -40,
            40,
            "horizontalPosition"
          )
        }
      />
    </div>
  );
};

export default IconTab;
