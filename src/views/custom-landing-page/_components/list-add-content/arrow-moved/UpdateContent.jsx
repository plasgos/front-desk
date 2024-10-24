import React, { useEffect, useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import { CButton } from "@coreui/react";
import handPointing from "../../../../../assets/pointing-down.png";

const positionOptions = [
  { value: "top", label: "Atas" },
  { value: "bottom", label: "Bawah" },
];

const UpdateContent = ({ setPreviewSection, currentSection }) => {
  const [outlineColor, setOutlineColor] = useState(
    currentSection?.wrapperStyle?.outlineColor || "#000000"
  );

  const [fillColor, setFillColor] = useState(
    currentSection?.wrapperStyle?.fillColor || "#FF0000"
  );

  const [position, setPosition] = useState(positionOptions[1]);

  const [ammount, setAmmount] = useState(
    currentSection?.wrapperStyle?.ammount || 3
  );

  const [rotation, setRotation] = useState(
    currentSection?.wrapperStyle?.rotation || 20
  );

  const [borderWidth, setBorderWidth] = useState(
    currentSection?.wrapperStyle?.borderWidth || 4
  );

  const [distanceX, setDistanceX] = useState(
    currentSection?.wrapperStyle?.distanceX || 10
  );

  const [distanceY, setDistanceY] = useState(
    currentSection?.wrapperStyle?.distanceY || -25
  );

  const [size, setSize] = useState(currentSection?.wrapperStyle?.size || 80);

  const [image, setImage] = useState(
    currentSection?.wrapperStyle?.image || handPointing
  );

  useEffect(() => {
    if (currentSection?.wrapperStyle) {
      const {
        ammount,
        position,
        rotation,
        borderWidth,
        distanceX,
        distanceY,
        size,
        image,
      } = currentSection.wrapperStyle;

      const currentPostion = positionOptions.find(
        (opt) => opt.value === position
      );

      if (currentPostion) {
        setPosition(currentPostion);
      }

      // setAmmount(ammount);
      // setRotation(rotation);
      // setBorderWidth(borderWidth);
      // setDistanceX(distanceX);
      // setDistanceY(distanceY);
      // setSize(size);
      // setImage(image);
    }
  }, [currentSection]);

  const handleChangeWrapperStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              wrapperStyle: {
                ...section.wrapperStyle,
                [key]: value,
              },
            }
          : section
      )
    );
  };

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "ammount") {
      setAmmount(newValue);
    } else if (key === "rotation") {
      setRotation(newValue);
    } else if (key === "borderWidth") {
      setBorderWidth(newValue);
    } else if (key === "distanceX") {
      setDistanceX(newValue);
    } else if (key === "distanceY") {
      setDistanceY(newValue);
    } else if (key === "size") {
      setSize(newValue);
    }
    handleChangeWrapperStyle(key, newValue);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImage(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  useEffect(() => {
    if (currentSection?.variant === "image") {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === currentSection?.id
            ? {
                ...section,
                wrapperStyle: {
                  ...section.wrapperStyle,
                  image,
                },
              }
            : section
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <div style={{ overflowX: "hidden" }}>
      {currentSection?.variant === "arrow" ? (
        <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
          <ColorPicker
            initialColor={outlineColor}
            label="Garis Luar"
            onChange={(color) => {
              setOutlineColor(color);
              handleChangeWrapperStyle("outlineColor", color);
            }}
          />

          <ColorPicker
            initialColor={fillColor}
            label="Isi"
            onChange={(color) => {
              setFillColor(color);
              handleChangeWrapperStyle("fillColor", color);
            }}
          />
        </div>
      ) : (
        <div className="mb-2">
          <div
            style={{
              backgroundColor: "#F5F5F5",
              width: "100%",
              overflow: "hidden",
            }}
            className="mx-auto mb-2"
          >
            <img
              style={{ objectFit: "contain", width: "100%", height: 100 }}
              src={image}
              alt="img"
            />
          </div>

          <CButton
            onClick={handleFileUpload}
            color="primary"
            variant="outline"
            className="btn-block"
          >
            Upload
          </CButton>
        </div>
      )}

      <SelectOptions
        label="Arah"
        options={positionOptions}
        onChange={(selectedOption) => {
          setPosition(selectedOption);
          handleChangeWrapperStyle("position", selectedOption.value);
        }}
        value={position}
        width="50"
      />

      <InputRangeWithNumber
        label="Jumlah"
        value={ammount}
        onChange={(newValue) => {
          setAmmount(newValue);
          handleChangeWrapperStyle("ammount", newValue);
        }}
        min={1}
        max={10}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(ammount, 1, 10, "ammount")
        }
      />

      <InputRangeWithNumber
        label="Rotasi"
        value={rotation}
        onChange={(newValue) => {
          setRotation(newValue);
          handleChangeWrapperStyle("rotation", newValue);
        }}
        min={1}
        max={90}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(rotation, 1, 90, "rotation")
        }
      />

      <InputRangeWithNumber
        label="Border"
        value={borderWidth}
        onChange={(newValue) => {
          setBorderWidth(newValue);
          handleChangeWrapperStyle("borderWidth", newValue);
        }}
        min={0}
        max={20}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(borderWidth, 0, 20, "borderWidth")
        }
      />

      <InputRangeWithNumber
        label="Jarak Horizontal"
        value={distanceX}
        onChange={(newValue) => {
          setDistanceX(newValue);
          handleChangeWrapperStyle("distanceX", newValue);
        }}
        min={0}
        max={300}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(distanceX, 0, 300, "distanceX")
        }
      />

      <InputRangeWithNumber
        label="Jarak Vertikal"
        value={distanceY}
        onChange={(newValue) => {
          setDistanceY(newValue);
          handleChangeWrapperStyle("distanceY", newValue);
        }}
        min={-300}
        max={300}
        onBlur={() =>
          handleSetValueWhenBlurWrapperStyle(distanceY, -300, 300, "distanceY")
        }
      />

      <h5>Badan</h5>

      <InputRangeWithNumber
        label="Ukuran"
        value={size}
        onChange={(newValue) => {
          setSize(newValue);
          handleChangeWrapperStyle("size", newValue);
        }}
        min={6}
        max={300}
        onBlur={() => handleSetValueWhenBlurWrapperStyle(size, 6, 300, "size")}
      />
    </div>
  );
};

export default UpdateContent;
