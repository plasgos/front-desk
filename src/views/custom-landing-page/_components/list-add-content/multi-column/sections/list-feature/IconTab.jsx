import { CButton } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useFontAwesomeIconPack } from "../../../../../../../hooks/useFontAwesomePack";
import IconPicker from "../../../../common/IconPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";

const shadowOptions = [
  { value: "", label: "Tidak Ada" },
  { value: "tw-shadow", label: "Ringan" },
];

const IconTab = ({
  previewSection,
  setPreviewSection,
  currentSection,
  isEditing,
  visible,
  setVisible,
  setIconBeforeEdit,
  iconName,
  setIconName,
  imageUrl,
  setImageUrl,
  setPreviousIcon,
  sectionId,
  columnId,
}) => {
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

  const iconPack = useFontAwesomeIconPack();

  useEffect(() => {
    if (iconPack && iconPack.length > 0) {
      const iconToSet = currentSection?.iconStyle?.icon;

      if (iconToSet && Object.keys(iconToSet).length > 0) {
        const iconExists = iconPack.some(
          (icon) => icon.iconName === iconToSet.iconName
        );

        setIconName(iconExists ? iconToSet : {});
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconPack, currentSection]);

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

  const setIconStyleValue = (newData) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === currentSection?.id
                          ? {
                              ...content,
                              iconStyle: {
                                ...content.iconStyle,
                                ...newData,
                              },
                            }
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
      )
    );
  };

  const handleChangeIcon = (value) => {
    setIconName(value);

    const newData = {
      icon: value,
      image: "",
    };

    setIconStyleValue(newData);
  };

  const handleUpdateValue = (key, value) => {
    const newData = {
      [key]: value,
    };

    setIconStyleValue(newData);
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
    if (imageUrl !== "") {
      // Update tempSections hanya jika imageUrl bukan string kosong
      setIconName({});

      const newData = {
        image: imageUrl,
        icon: "",
      };

      setIconStyleValue(newData);
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

  const handleSearchIcon = (prevIcon) => {
    setIconBeforeEdit([...previewSection]);
    setPreviousIcon(prevIcon);
    setVisible(true);
  };

  return (
    <div>
      {visible ? (
        <IconPicker
          value={iconName}
          onChange={(value) => handleChangeIcon(value)}
        />
      ) : (
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

              {iconPack &&
                iconPack.length > 0 &&
                Object.keys(iconName).length > 0 && (
                  <div
                    style={{
                      backgroundColor: "#F5F5F5",
                      width: "100%",
                      overflow: "hidden",
                    }}
                    className="mx-auto mb-2 p-2"
                  >
                    <div>
                      <FontAwesomeIcon
                        icon={[`${iconName.prefix}`, iconName.iconName]}
                        size="xl"
                      />
                    </div>
                  </div>
                )}

              <div style={{ gap: 5 }} className="d-flex align-items-center">
                <ColorPicker
                  initialColor={colorIcon}
                  onChange={(color) => {
                    setColorIcon(color);
                    handleUpdateValue("color", color);
                  }}
                  width="w-0"
                />

                <CButton
                  onClick={handleFileUpload}
                  color="primary"
                  variant="outline"
                >
                  Upload
                </CButton>

                <CButton
                  onClick={() => handleSearchIcon(iconName)}
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
            onChange={(selectedOption) => {
              setShadow(selectedOption);
              handleUpdateValue("shadow", selectedOption.value);
            }}
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
            onBlur={() =>
              handleSetValueWhenBlurValue(iconSize, 10, 60, "iconSize")
            }
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
      )}
    </div>
  );
};

export default IconTab;
