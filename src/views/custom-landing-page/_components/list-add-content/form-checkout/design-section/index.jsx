import React, { useEffect, useState } from "react";
import ColorPicker from "../../../common/ColorPicker";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";
import SelectOptions from "../../../common/SelectOptions";
import { fontStyleOptions } from "../../../SelectOptions";
import Input from "../../../common/Input";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconPicker from "../../../common/IconPicker";

const DesignSection = ({
  previewSection,
  setPreviewSection,
  isEditingSection,
  currentSection,
  imageUrl,
  setImageUrl,
  icon,
  setIcon,
  isListIconVisible,
  setIsListIconVisible,
  setIconBeforeEdit,
  setPreviousIcon,
}) => {
  const [labelColor, setLabelColor] = useState(
    currentSection?.form?.style?.labelColor || "#000000"
  );
  const [textInputColor, setTextInputColor] = useState(
    currentSection?.form?.style?.textInputColor || "#000000"
  );
  const [bgInputColor, setBgInputColor] = useState(
    currentSection?.form?.style?.bgInputColor || ""
  );
  const [outlineInputColor, setOutlineInputColor] = useState(
    currentSection?.form?.style?.outlineInputColor || "#D8DBE0"
  );
  const [widthForm, setWidthForm] = useState(
    currentSection?.form?.style?.widthForm || 450
  );

  const [fontSizeLabel, setFontSizeLabel] = useState(
    currentSection?.form?.style?.fontSizeLabel || 14
  );
  const [fontStyle, setFontStyle] = useState(
    currentSection?.form?.style?.fontStyle || fontStyleOptions[0]
  );
  const [fontSizeTextInputColor, setFontSizeTextInputColor] = useState(
    currentSection?.form?.style?.fontSizeTextInputColor || 16
  );
  const [outlineInputColorSize, setOutlineInputColorSize] = useState(
    currentSection?.form?.style?.outlineInputColorSize || 1
  );
  const [borderRadius, setBorderRadius] = useState(
    currentSection?.form?.style?.borderRadius || 4
  );
  const [distance, setDistance] = useState(
    currentSection?.form?.style?.distance || 0
  );
  const [btnSubmitText, setBtnSubmitText] = useState(
    currentSection?.form?.style?.btnSubmitText || "Selesaikan Order"
  );
  const [btnSubmitColor, setBtnSubmitColor] = useState(
    currentSection?.form?.style?.btnSubmitColor || "#fa541c"
  );
  const [iconColor, setIconColor] = useState(
    currentSection?.form?.style?.iconColor || ""
  );

  const iconPack = useFontAwesomeIconPack();
  useEffect(() => {
    if (imageUrl !== "") {
      // Update tempSections hanya jika imageUrl bukan string kosong
      setIcon(null);
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection.id
            ? {
                ...item,
                form: {
                  ...item.form,
                  style: {
                    ...item.form.style,
                    image: imageUrl,
                    icon: "",
                  },
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

  const handleSearchIcon = (prevIcon) => {
    setIconBeforeEdit([...previewSection]);
    setPreviousIcon(prevIcon);
    setIsListIconVisible(true);
  };

  const handleChangeFormValue = (key, selectedOption) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              form: {
                ...item.form,
                style: {
                  ...item.form.style,
                  [key]: selectedOption,
                },
              },
            }
          : item
      )
    );
  };

  const handleChangeIcon = (value) => {
    setIcon(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              form: {
                ...item.form,
                style: {
                  ...item.form.style,
                  icon: value,
                  image: "",
                },
              },
            }
          : item
      )
    );
  };

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "widthForm") {
      setWidthForm(newValue);
    } else if (key === "fontSizeLabel") {
      setFontSizeLabel(newValue);
    } else if (key === "fontSizeTextInputColor") {
      setFontSizeTextInputColor(newValue);
    } else if (key === "outlineInputColorSize") {
      setOutlineInputColorSize(newValue);
    } else if (key === "borderRadius") {
      setBorderRadius(newValue);
    } else if (key === "distance") {
      setDistance(newValue);
    }
    handleChangeFormValue(key, newValue);
  };

  return (
    <>
      {isListIconVisible ? (
        <IconPicker
          value={icon}
          onChange={(value) => handleChangeIcon(value)}
        />
      ) : (
        <div>
          <h5>Formulir</h5>
          <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
            <ColorPicker
              initialColor={labelColor}
              label="Nama"
              onChange={(color) => {
                setLabelColor(color);
                handleChangeFormValue("labelColor", color);
              }}
              bottom={"10px"}
            />

            <ColorPicker
              initialColor={bgInputColor}
              label="Konten"
              onChange={(color) => {
                setBgInputColor(color);
                handleChangeFormValue("bgInputColor", color);
              }}
              bottom={"10px"}
            />
          </div>
          <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
            <ColorPicker
              initialColor={textInputColor}
              label="Teks"
              onChange={(color) => {
                setTextInputColor(color);
                handleChangeFormValue("textInputColor", color);
              }}
              bottom={"10px"}
            />

            <ColorPicker
              initialColor={outlineInputColor}
              label="Garis Luar"
              onChange={(color) => {
                setOutlineInputColor(color);
                handleChangeFormValue("outlineInputColor", color);
              }}
              bottom={"10px"}
            />
          </div>

          <InputRangeWithNumber
            label="Lebar Formulir"
            value={widthForm}
            onChange={(newValue) => {
              setWidthForm(newValue);
              handleChangeFormValue("widthForm", newValue);
            }}
            min={200}
            max={1240}
            onBlur={() =>
              handleSetValueWhenBlur(widthForm, 200, 1240, "widthForm")
            }
          />
          <InputRangeWithNumber
            label="Ukuran Nama"
            value={fontSizeLabel}
            onChange={(newValue) => {
              setFontSizeLabel(newValue);
              handleChangeFormValue("fontSizeLabel", newValue);
            }}
            min={12}
            max={30}
            onBlur={() =>
              handleSetValueWhenBlur(fontSizeLabel, 12, 30, "fontSizeLabel")
            }
          />

          <SelectOptions
            label="Font Nama"
            options={fontStyleOptions}
            onChange={(selectedOption) => {
              setFontStyle(selectedOption);
              handleChangeFormValue("fontStyle", selectedOption.value);
            }}
            value={fontStyle}
            width="50"
          />

          <InputRangeWithNumber
            label="Ukuran Teks"
            value={fontSizeTextInputColor}
            onChange={(newValue) => {
              setFontSizeTextInputColor(newValue);
              handleChangeFormValue("fontSizeTextInputColor", newValue);
            }}
            min={12}
            max={60}
            onBlur={() =>
              handleSetValueWhenBlur(
                fontSizeTextInputColor,
                12,
                60,
                "fontSizeTextInputColor"
              )
            }
          />
          <InputRangeWithNumber
            label="Garis Luar"
            value={outlineInputColorSize}
            onChange={(newValue) => {
              setOutlineInputColorSize(newValue);
              handleChangeFormValue("outlineInputColorSize", newValue);
            }}
            min={0}
            max={6}
            onBlur={() =>
              handleSetValueWhenBlur(
                outlineInputColorSize,
                0,
                6,
                "outlineInputColorSize"
              )
            }
          />
          <InputRangeWithNumber
            label="Radius"
            value={borderRadius}
            onChange={(newValue) => {
              setBorderRadius(newValue);
              handleChangeFormValue("borderRadius", newValue);
            }}
            min={0}
            max={30}
            onBlur={() =>
              handleSetValueWhenBlur(borderRadius, 0, 30, "borderRadius")
            }
          />
          <InputRangeWithNumber
            label="Jarak"
            value={distance}
            onChange={(newValue) => {
              setDistance(newValue);
              handleChangeFormValue("distance", newValue);
            }}
            min={0}
            max={30}
            onBlur={() => handleSetValueWhenBlur(distance, 0, 30, "distance")}
          />

          <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
            <Input
              label="Teks"
              value={btnSubmitText}
              placeholder={btnSubmitText}
              type="text"
              onChange={(e) => {
                const { value } = e.target;
                setBtnSubmitText(value);
                handleChangeFormValue("btnSubmitText", value);
              }}
            />
            <ColorPicker
              initialColor={btnSubmitColor}
              label="Warna"
              onChange={(color) => {
                setBtnSubmitColor(color);
                handleChangeFormValue("btnSubmitColor", color);
              }}
              bottom={"10px"}
            />
          </div>

          <div className="mb-2">Icon</div>

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
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: 100,
                    }}
                    src={imageUrl}
                    alt="img"
                  />
                </div>
              )}

              {icon && iconPack && (
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
                      icon={[`${icon.prefix}`, icon.iconName]}
                      size="xl"
                    />
                  </div>
                </div>
              )}

              <div style={{ gap: 5 }} className="d-flex align-items-center">
                <ColorPicker
                  initialColor={iconColor}
                  onChange={(color) => {
                    setIconColor(color);
                    handleChangeFormValue("iconColor", color);
                  }}
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
                  onClick={() => handleSearchIcon(icon)}
                  color="primary"
                  variant="outline"
                >
                  Cari
                </CButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignSection;
