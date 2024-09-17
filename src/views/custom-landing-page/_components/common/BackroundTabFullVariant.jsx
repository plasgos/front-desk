import React, { useEffect, useState } from "react";
import { backgroundType, PaddingYOptions } from "../SelectOptions";
import ColorPicker from "./ColorPicker";
import SelectOptions from "./SelectOptions";

const BackgroundTabFullVariant = ({
  currentSection,
  setPreviewSection,
  type,
}) => {
  const [selectedBackgroundType, setSelectedBackgroundType] = useState(
    type === "edit" ? undefined : backgroundType[0]
  );

  const [selectedBgColor, setSelectedBgColor] = useState(
    currentSection.background?.bgColor || "#EEEEEE"
  );

  useEffect(() => {
    if (type === "edit") {
      const currentBgTypeOption = backgroundType.find(
        (opt) => opt.value === currentSection.background?.bgType
      );
      if (currentBgTypeOption) {
        setSelectedBackgroundType(currentBgTypeOption);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, backgroundType, PaddingYOptions, currentSection.background]);

  const defaultBgValues = {
    bgType: undefined,
    bgColor: "",
    bgImage: "",
    blur: 0,
    opacity: 0,
    paddingY: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingType: "equal",
  };

  const handleChangeValueOptions = (selectedOption, key) => {
    if (!selectedOption.value) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: defaultBgValues,
              }
            : item
        )
      );
    } else if (selectedOption !== "image") {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                background: {
                  ...item.background,
                  bgImage: "",
                },
              }
            : item
        )
      );
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              background: {
                ...item.background,
                [key]: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeBgColor = (color) => {
    setSelectedBgColor(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              background: {
                ...item.background,
                bgColor: color,
              },
            }
          : item
      )
    );
  };

  return (
    <div>
      <div style={{ gap: 10 }} className="d-flex align-items-center ">
        <SelectOptions
          label="Tipe Background"
          options={backgroundType}
          onChange={(selectedOption) => {
            handleChangeValueOptions(selectedOption, "bgType");
            setSelectedBackgroundType(selectedOption);
          }}
          value={selectedBackgroundType}
          width="50"
        />
      </div>

      {selectedBackgroundType?.value === "color" && (
        <div className="mb-2">
          <ColorPicker
            initialColor={selectedBgColor}
            label="Warna"
            onChange={handleChangeBgColor}
            top={"0"}
            right={"34px"}
            type="rgba"
          />
        </div>
      )}
    </div>
  );
};

export default BackgroundTabFullVariant;
