import React, { useEffect, useState } from "react";
import ColorPicker from "../../common/ColorPicker";
import SelectOptions from "../../common/SelectOptions";
import { maxColumnFAQOptions, shadowOptions } from "../../SelectOptions";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import Checkbox from "../../common/Checkbox";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CButton } from "@coreui/react";
import IconPicker from "../../common/IconPicker";
import PlainSimple from "./plain/Simple";
import KapsulSimple from "./kapsul/KapsulSimple";
import useSectionStyle from "../../../../../hooks/useStyleFAQ";

const DesignTab = ({
  previewSection,
  currentSection,
  setPreviewSection,
  isEditingSection = false,
  setIconBeforeEdit,
  variant,
  isListIconVisible,
  setIsListIconVisible,
  imageUrl,
  setImageUrl,
  icon,
  setIcon,
  setPreviousIcon,
}) => {
  const styleProps = useSectionStyle(
    currentSection,
    shadowOptions,
    maxColumnFAQOptions
  );
  console.log("🚀 ~ styleProps:", styleProps);

  const [colorTitle, setColorTitle] = useState(
    currentSection?.variant?.style?.colorTitle || "#424242"
  );

  const [colorContent, setColorContent] = useState(
    currentSection?.variant?.style?.colorContent || "#424242"
  );

  const [bgColor, setBgColor] = useState(
    currentSection?.variant?.style?.bgColor || "#F5F5F5"
  );

  const [borderColor, setBorderColor] = useState(
    currentSection?.variant?.style?.borderColor || "#757575"
  );

  const [dividerColor, setDividerColor] = useState(
    currentSection?.variant?.style?.dividerColor || "#9E9E9E"
  );

  const [iconColor, setIconColor] = useState(
    currentSection?.variant?.style?.iconColor || "#424242"
  );

  const [bgContent, setBgContent] = useState(
    currentSection?.variant?.style?.bgContent || "#F5F5F5"
  );

  const [shadow, setShadow] = useState(
    shadowOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.shadow
    ) || shadowOptions[2]
  );

  const [fontSize, setFontSize] = useState(
    currentSection?.variant?.style?.fontSize || 18
  );

  const [distance, setDistance] = useState(
    currentSection?.variant?.style?.distance || 18
  );

  const [borderWidth, setBorderWidth] = useState(
    currentSection?.variant?.style?.borderWidth || 2
  );

  const [isIconOnRight, setIsIconOnRight] = useState(
    currentSection?.variant?.style?.isIconOnRight || true
  );

  const [iconSize, setIconSize] = useState(
    currentSection?.variant?.style?.iconSize || 18
  );

  const [maxColumn, setMaxColumn] = useState(
    maxColumnFAQOptions.find(
      (opt) => opt.value === currentSection?.variant?.style?.maxColumn
    ) || maxColumnFAQOptions[1]
  );

  const [rounded, setRounded] = useState(
    currentSection?.variant?.style?.rounded || 12
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
                variant: {
                  ...item.variant,
                  style: {
                    ...item.variant.style,
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

  useEffect(() => {
    if (iconPack) {
      const iconToSet = !isEditingSection
        ? currentSection?.iconStyle?.icon || "plus"
        : currentSection?.iconStyle?.icon;
      const iconExists = iconPack.some((icon) => icon.iconName === iconToSet);

      if (iconExists) {
        setIcon(iconToSet);
      } else {
        console.warn(`Icon ${iconToSet} not found in iconPack`);
        setIcon(null); // Atau set ke ikon default yang pasti ada
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconPack, currentSection, isEditingSection]);

  const handleChangeStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              variant: {
                ...item.variant,
                style: {
                  ...item.variant.style,
                  [key]: value,
                },
              },
            }
          : item
      )
    );
  };

  const handleChangeStyleWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "fontSize") {
      setFontSize(newValue);
    } else if (key === "distance") {
      setDistance(newValue);
    } else if (key === "borderWidth") {
      setBorderWidth(newValue);
    } else if (key === "iconSize") {
      setIconSize(newValue);
    } else if (key === "rounded") {
      setRounded(newValue);
    }
    handleChangeStyle(key, newValue);
  };

  const handleChangeIcon = (value) => {
    setIcon(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              variant: {
                ...item.variant,
                style: {
                  ...item.variant.style,
                  icon: value,
                  image: "",
                },
              },
            }
          : item
      )
    );
  };

  return (
    <div>
      {isListIconVisible ? (
        <IconPicker
          value={icon}
          onChange={(value) => handleChangeIcon(value)}
        />
      ) : (
        <div>
          {variant === "3" || variant === "4" ? (
            <div>
              <div
                style={{ gap: 10 }}
                className="d-flex align-items-center mb-3"
              >
                <ColorPicker
                  initialColor={colorTitle}
                  label="Judul"
                  onChange={(color) => {
                    setColorTitle(color);
                    handleChangeStyle("colorTitle", color);
                  }}
                  bottom={"10px"}
                />

                <ColorPicker
                  initialColor={colorContent}
                  label="Konten"
                  onChange={(color) => {
                    setColorContent(color);
                    handleChangeStyle("colorContent", color);
                  }}
                  bottom={"10px"}
                />
              </div>

              <div
                style={{ gap: 10 }}
                className="d-flex align-items-center mb-3"
              >
                <ColorPicker
                  initialColor={bgColor}
                  label="Background"
                  onChange={(color) => {
                    setBgColor(color);
                    handleChangeStyle("bgColor", color);
                  }}
                  bottom={"10px"}
                />

                <ColorPicker
                  initialColor={borderColor}
                  label="Garis Luar"
                  onChange={(color) => {
                    setBorderColor(color);
                    handleChangeStyle("borderColor", color);
                  }}
                  bottom={"10px"}
                />
              </div>

              <div
                style={{ gap: 10 }}
                className="d-flex align-items-center mb-3"
              >
                <ColorPicker
                  initialColor={iconColor}
                  label="Icon"
                  onChange={(color) => {
                    setIconColor(color);
                    handleChangeStyle("iconColor", color);
                  }}
                  bottom={"10psx"}
                />

                <ColorPicker
                  initialColor={dividerColor}
                  label="Garis"
                  onChange={(color) => {
                    setDividerColor(color);
                    handleChangeStyle("dividerColor", color);
                  }}
                  bottom={"10px"}
                />
              </div>

              <div
                style={{ gap: 10 }}
                className="d-flex align-items-center mb-3"
              >
                <ColorPicker
                  initialColor={bgContent}
                  label="Background"
                  onChange={(color) => {
                    setBgContent(color);
                    handleChangeStyle("bgContent", color);
                  }}
                  bottom={"10psx"}
                />
              </div>

              <SelectOptions
                label="Bayangan"
                options={shadowOptions}
                onChange={(selectedOption) => {
                  setShadow(selectedOption);
                  handleChangeStyle("shadow", selectedOption.value);
                }}
                value={shadow}
                width="50"
              />

              <InputRangeWithNumber
                label="Font Size"
                value={fontSize}
                onChange={(newValue) => {
                  setFontSize(newValue);
                  handleChangeStyle("fontSize", newValue);
                }}
                min={12}
                max={40}
                onBlur={() =>
                  handleChangeStyleWhenBlur(fontSize, 12, 40, "fontSize")
                }
              />

              <InputRangeWithNumber
                label="Jarak"
                value={distance}
                onChange={(newValue) => {
                  setDistance(newValue);
                  handleChangeStyle("distance", newValue);
                }}
                min={0}
                max={100}
                onBlur={() =>
                  handleChangeStyleWhenBlur(distance, 0, 100, "distance")
                }
              />

              <InputRangeWithNumber
                label="Garis Luar"
                value={borderWidth}
                onChange={(newValue) => {
                  setBorderWidth(newValue);
                  handleChangeStyle("borderWidth", newValue);
                }}
                min={0}
                max={40}
                onBlur={() =>
                  handleChangeStyleWhenBlur(borderWidth, 0, 40, "borderWidth")
                }
              />

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
                        <FontAwesomeIcon icon={["fas", icon]} size="xl" />
                      </div>
                    </div>
                  )}

                  <div style={{ gap: 5 }} className="d-flex align-items-center">
                    <ColorPicker
                      initialColor={iconColor}
                      onChange={(color) => {
                        setIconColor(color);
                        handleChangeStyle("iconColor", color);
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

              <div
                style={{ gap: 10 }}
                className="d-flex align-items-center my-3"
              >
                <Checkbox
                  label="Di Kanan"
                  id="isIconOnRight"
                  checked={isIconOnRight}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setIsIconOnRight(checked);
                    handleChangeStyle("isIconOnRight", checked);
                  }}
                />
              </div>

              <InputRangeWithNumber
                label="Ukuran Icon"
                value={iconSize}
                onChange={(newValue) => {
                  setIconSize(newValue);
                  handleChangeStyle("iconSize", newValue);
                }}
                min={0}
                max={40}
                onBlur={() =>
                  handleChangeStyleWhenBlur(iconSize, 0, 40, "iconSize")
                }
              />
            </div>
          ) : variant === "1" ? (
            <PlainSimple
              colorTitle={colorTitle}
              colorContent={colorContent}
              fontSize={fontSize}
              maxColumn={maxColumn}
              setMaxColumn={setMaxColumn}
              setColorTitle={setColorTitle}
              setColorContent={setColorContent}
              setFontSize={setFontSize}
              handleChangeStyle={handleChangeStyle}
              handleChangeStyleWhenBlur={handleChangeStyleWhenBlur}
            />
          ) : variant === "2" ? (
            <KapsulSimple
              colorTitle={colorTitle}
              colorContent={colorContent}
              bgColor={bgColor}
              setBgColor={setBgColor}
              shadow={shadow}
              setShadow={setShadow}
              rounded={rounded}
              setRounded={setRounded}
              fontSize={fontSize}
              maxColumn={maxColumn}
              setMaxColumn={setMaxColumn}
              setColorTitle={setColorTitle}
              setColorContent={setColorContent}
              setFontSize={setFontSize}
              handleChangeStyle={handleChangeStyle}
              handleChangeStyleWhenBlur={handleChangeStyleWhenBlur}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DesignTab;
