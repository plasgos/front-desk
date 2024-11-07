import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { createUniqueID } from "../../../../../../lib/unique-id";
import Confirmation from "../../../common/Confirmation";
import IconPicker from "../../../common/IconPicker";
import Input from "../../../common/Input";
import ColorPicker from "../../../common/ColorPicker";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";

const Newsletter = ({
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  currentContent,
}) => {
  const [title, setTitle] = useState(
    currentContent?.content?.title || "Berlangganan Newsletter"
  );
  const [textBtn, setTextBtn] = useState(
    currentContent?.content?.textBtn || "Berlangganan"
  );

  const [btnColor, setBtnColor] = useState(
    currentContent?.content?.btnColor || "#fa541c"
  );

  const [placeholder, setPlaceholder] = useState(
    currentContent?.content?.placeholder || "Masukan email di sini"
  );
  const [iconSize, setIconSize] = useState(
    currentContent?.wrapperStyle?.iconSize || 20
  );
  const [imageSize, setImageSize] = useState(
    currentContent?.wrapperStyle?.imageSize || 50
  );
  const [setting, setSetting] = useState({});

  const [textBtnValue] = useDebounce(textBtn, 300);
  const [placeholderValue] = useDebounce(placeholder, 300);
  const [titleValue] = useDebounce(title, 300);

  const iconPack = useFontAwesomeIconPack();

  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(
    isEditingSection ? currentContent?.wrapperStyle?.icon : ""
  );

  const [imageUrl, setImageUrl] = useState(
    isEditingSection ? currentContent?.wrapperStyle?.image : ""
  );
  const [isListIconVisible, setIsListIconVisible] = useState(false);

  const contentIdToCheck = isEditingSection ? currentContent.id : setting.id;

  const isIconSizeAndImageSizeVisible = isEditingSection
    ? currentContent?.wrapperStyle
    : setting?.wrapperStyle;

  useEffect(() => {
    if (imageUrl !== "") {
      setIcon({});
      handleChangeImageUrl(imageUrl);
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
    setPreviousIcon(prevIcon);
    setIsListIconVisible(true);
  };

  useEffect(() => {
    if (textBtnValue !== currentContent?.content?.textBtn) {
      handleChangeContent("textBtn", textBtnValue);
    }

    if (titleValue !== currentContent?.content?.title) {
      handleChangeWrapperStyle("title", titleValue);
    }

    if (placeholderValue !== currentContent?.content?.placeholder) {
      handleChangeContent("placeholder", placeholderValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textBtnValue, titleValue, placeholderValue]);

  const handleChangeContent = (key, value) => {
    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [key]: value,
        },
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        [key]: value,
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentSection?.content);
    let payload = {
      id: uniqueId,
      name: "newsletter",
      title: "Berlangganan Newsletter",
      content: {
        textBtn: "Berlangganan",
        placeholder: "Masukan email di sini",
        btnColor: "#fa541c",
      },
      wrapperStyle: {
        title: "Berita Newsletter",
        icon: "",
        iconSize: 20,
        image: "",
        imageSize: 50,
      },
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === currentSection?.id
          ? { ...section, content: [...section.content, payload] }
          : section
      )
    );
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleChangeWrapperStyle = (key, value) => {
    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        wrapperStyle: {
          ...prev.wrapperStyle,
          [key]: value,
        },
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      wrapperStyle: {
                        ...contentItem.wrapperStyle,
                        [key]: value,
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleCancel = () => {
    if (isListIconVisible) {
      setIsListIconVisible(false);
      if (imageUrl) {
        setImageUrl(imageUrl);
        setIcon({});
        handleChangeImageUrl(imageUrl);
      } else {
        handleChangeIcon(previousIcon);
      }
    } else if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);

      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === currentSection?.id
            ? {
                ...section,
                content: section.content.filter(
                  (contentItem) => contentItem.id !== setting.id
                ),
              }
            : section
        )
      );
    }
  };

  const handleConfirm = () => {
    if (isListIconVisible) {
      setIsListIconVisible(false);
      if (icon.iconName) {
        setImageUrl("");
      }
    } else {
      isShowContent(false);
    }
  };

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "iconSize") {
      setIconSize(newValue);
    } else if (key === "imageSize") {
      setImageSize(newValue);
    }
    handleChangeWrapperStyle(key, newValue);
  };

  const handleChangeImageUrl = (value) => {
    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        wrapperStyle: {
          ...prev.wrapperStyle,
          image: value,
          icon: "",
        },
      }));
    }

    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: section.content.map((contentItem) =>
                contentItem.id === contentIdToCheck
                  ? {
                      ...contentItem,
                      wrapperStyle: {
                        ...contentItem.wrapperStyle,
                        image: value,
                        icon: "",
                      },
                    }
                  : contentItem
              ),
            }
          : section
      )
    );
  };

  const handleChangeIcon = (value) => {
    setIcon(value);

    if (!isEditingSection) {
      setSetting((prev) => ({
        ...prev,
        wrapperStyle: {
          ...prev.wrapperStyle,
          image: "",
          icon: value,
        },
      }));
    }

    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: section.content.map((contentItem) =>
                contentItem.id === contentIdToCheck
                  ? {
                      ...contentItem,
                      wrapperStyle: {
                        ...contentItem.wrapperStyle,
                        image: "",
                        icon: value,
                      },
                    }
                  : contentItem
              ),
            }
          : section
      )
    );
  };

  return (
    <>
      <div>
        <Confirmation
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />

        {isListIconVisible ? (
          <IconPicker
            value={icon}
            onChange={(value) => handleChangeIcon(value)}
          />
        ) : (
          <div>
            <div className="p-3">
              <div className="mb-3">
                <ColorPicker
                  initialColor={btnColor}
                  label="Tombol"
                  onChange={(color) => {
                    setBtnColor(color);
                    handleChangeContent("btnColor", color);
                  }}
                  width="w-0"
                />
              </div>
              <Input
                label="Judul"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <div className="mb-3">
                <label>Icon</label>
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

                {iconPack &&
                  iconPack.length > 0 &&
                  Object.keys(icon).length > 0 && (
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

              {isIconSizeAndImageSizeVisible?.icon && (
                <InputRangeWithNumber
                  label="Ukuran Icon"
                  value={iconSize}
                  onChange={(newValue) => {
                    setIconSize(newValue);
                    handleChangeWrapperStyle("iconSize", newValue);
                  }}
                  min={10}
                  max={100}
                  onBlur={() =>
                    handleSetValueWhenBlur(iconSize, 10, 100, "iconSize")
                  }
                />
              )}

              {isIconSizeAndImageSizeVisible?.image && (
                <InputRangeWithNumber
                  label="Ukuran Gambar"
                  value={imageSize}
                  onChange={(newValue) => {
                    setImageSize(newValue);
                    handleChangeWrapperStyle("imageSize", newValue);
                  }}
                  min={10}
                  max={100}
                  onBlur={() =>
                    handleSetValueWhenBlur(imageSize, 10, 100, "imageSize")
                  }
                />
              )}

              <Input
                label="Teks Aksi"
                value={textBtn}
                onChange={(e) => {
                  setTextBtn(e.target.value);
                  handleChangeContent("textBtn", e.target.value);
                }}
              />

              <Input
                label="Placeholder"
                value={placeholder}
                onChange={(e) => {
                  setPlaceholder(e.target.value);
                  handleChangeContent("placeholder", e.target.value);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Newsletter;
