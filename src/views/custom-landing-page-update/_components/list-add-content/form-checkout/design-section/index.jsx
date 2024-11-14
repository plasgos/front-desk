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
import IconUploader from "../../../common/IconUploader";

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
      setIcon({});
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

  const handleChangeFormValue = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              form: {
                ...item.form,
                style: {
                  ...item.form.style,
                  [key]: value,
                },
              },
            }
          : item
      )
    );
  };

  const handleUpdateColorIcon = (value) => {
    setIconColor(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              form: {
                ...item.form,
                style: {
                  ...item.form.style,
                  iconColor: value,
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

  const handleRemoveIcon = () => {
    const hasIcon =
      iconPack && iconPack.length > 0 && Object.keys(icon).length > 0;

    setIcon("");
    setImageUrl("");

    const updateIcon = hasIcon
      ? {
          icon: "",
        }
      : imageUrl
      ? {
          image: "",
        }
      : {};

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              form: {
                ...item.form,
                style: {
                  ...item.form.style,
                  ...updateIcon,
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
        <div className="p-3">
          <h5>Formulir</h5>
          <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
            <ColorPicker
              initialColor={labelColor}
              label="Nama"
              onChange={(color) => {
                setLabelColor(color);
                handleChangeFormValue("labelColor", color);
              }}
            />

            <ColorPicker
              initialColor={bgInputColor}
              label="Konten"
              onChange={(color) => {
                setBgInputColor(color);
                handleChangeFormValue("bgInputColor", color);
              }}
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
            />

            <ColorPicker
              initialColor={outlineInputColor}
              label="Garis Luar"
              onChange={(color) => {
                setOutlineInputColor(color);
                handleChangeFormValue("outlineInputColor", color);
              }}
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
              isCustomPosition={true}
              bottom={40}
              right={0}
            />
          </div>
          <div style={{ paddingBottom: 20 }}>
            <IconUploader
              iconPack={iconPack}
              icon={icon}
              imageUrl={imageUrl}
              handleFileUpload={handleFileUpload}
              handleSearchIcon={handleSearchIcon}
              handleUpdateColorIcon={handleUpdateColorIcon}
              colorIcon={iconColor}
              handleRemoveIcon={handleRemoveIcon}
              isCustomPositionColor={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DesignSection;
