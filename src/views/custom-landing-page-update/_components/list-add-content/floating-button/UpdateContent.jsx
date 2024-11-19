import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import { createUniqueID } from "../../../../../lib/unique-id";
import ColorPicker from "../../common/ColorPicker";
import Confirmation from "../../common/Confirmation";
import IconPicker from "../../common/IconPicker";
import IconUploader from "../../common/IconUploader";
import Input from "../../common/Input";
import SelectOptions from "../../common/SelectOptions";
import TargetOptions from "../../common/TargetOptions";
import { shadowOptions } from "../../SelectOptions";

export const variantButton = [
  { value: "fill", label: "Fill" },
  { value: "ghost", label: "Ghost" },
];

export const roundedButtonOptions = [
  { value: undefined, label: "Tidak Ada" },
  { value: "tw-rounded", label: "Kecil" },
  { value: "tw-rounded-md", label: "Sedang" },
  { value: "tw-rounded-lg", label: "Besar" },
  { value: "tw-rounded-full", label: "Bulat" },
];

export const ButtonSizeOptions = [
  { value: "sm", label: "Kecil" },
  { value: "md", label: "Sedang" },
  { value: "lg", label: "Besar" },
  { value: "xl", label: "Extra Besar" },
];

const UpdateContent = ({
  idSection,
  currentContent,
  setPreviewSection,
  isEditingContent,
  isListIconVisible,
  setIsListIconVisible,
}) => {
  const iconPack = useFontAwesomeIconPack();

  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(
    isEditingContent ? currentContent?.content?.icon : ""
  );
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? currentContent?.content?.image : ""
  );

  const [setting, setSetting] = useState({});

  const [title, setTitle] = useState(
    isEditingContent ? currentContent?.content?.title : "Click Me"
  );

  const [titleValue] = useDebounce(title, 300);

  const [selectedColorButton, setSelectedColorButton] = useState(
    isEditingContent ? currentContent?.content?.style?.btnColor : "#2196F3"
  );
  const [selectedColorText, setSelectedColorText] = useState(
    isEditingContent ? currentContent?.content?.style?.textColor : "#FFFFFF"
  );

  const [colorButtonValue] = useDebounce(selectedColorButton, 300);
  const [textColorValue] = useDebounce(selectedColorText, 300);

  const [selectedVariantButton, setSelectedVariantButton] = useState(
    variantButton[0]
  );
  const [selectedRoundedButton, setSelectedRoundedButton] = useState(
    roundedButtonOptions[0]
  );
  const [selectedButtonSize, setSelectedButtonSize] = useState(
    ButtonSizeOptions[1]
  );
  const [selectedButtonShadow, setSelectedButtonShadow] = useState(
    shadowOptions[0]
  );

  const selectedSectionToEdit = isEditingContent ? currentContent : setting;

  useEffect(() => {
    if (titleValue !== currentContent?.content?.title) {
      handleContentChange("title", titleValue);
    }

    if (colorButtonValue !== currentContent?.content?.btnColor) {
      handleChangeButtonStyle("btnColor", colorButtonValue);
    }

    if (textColorValue !== currentContent?.content?.textColor) {
      handleChangeButtonStyle("textColor", textColorValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue, colorButtonValue, textColorValue]);

  useEffect(() => {
    if (isEditingContent) {
      const { style: { shadow, buttonSize, rounded, variant } = {} } =
        currentContent.content || {};

      const currentSelectedOptionShadow = shadowOptions.find(
        (opt) => opt.value === shadow
      );
      if (currentSelectedOptionShadow) {
        setSelectedButtonShadow(currentSelectedOptionShadow);
      }

      const currentSelectedOptionBtnSize = ButtonSizeOptions.find(
        (opt) => opt.value === buttonSize
      );
      if (currentSelectedOptionBtnSize) {
        setSelectedButtonSize(currentSelectedOptionBtnSize);
      }

      const currentSelectedOptionRoundedBtn = roundedButtonOptions.find(
        (opt) => opt.value === rounded
      );
      if (currentSelectedOptionRoundedBtn) {
        setSelectedRoundedButton(currentSelectedOptionRoundedBtn);
      }

      const currentSelectedOptionVariantBtn = variantButton.find(
        (opt) => opt.value === variant
      );
      if (currentSelectedOptionVariantBtn) {
        setSelectedVariantButton(currentSelectedOptionVariantBtn);
      }
    }
  }, [currentContent, isEditingContent]);

  const handleChangeImageUrl = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;

                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        image: value,
                        icon: "",
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (imageUrl !== "") {
      setIcon("");
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

  const handleChangeIcon = (value) => {
    setIcon(value);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;

                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        icon: value,
                        image: "",
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleChangeButtonStyle = (key, selectedOptionValue) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;

                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        style: {
                          ...contentItem.content.style,
                          [key]: selectedOptionValue,
                        },
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleContentChange = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;
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
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      content: {
        title,
        style: {
          variant: selectedVariantButton.value,
          btnColor: selectedColorButton,
          textColor: selectedColorText,
          rounded: selectedRoundedButton.value,
          buttonSize: selectedButtonSize.value,
          shadow: selectedButtonShadow.value,
        },
        icon: "",
        iconColor: "",
        image: "",
      },
      target: {
        localPage: {
          value: "home",
        },
      },
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === idSection
          ? { ...section, content: [...section.content, payload] }
          : section
      )
    );

    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingContent) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent]);

  const handleCancel = () => {
    setIsListIconVisible(false);

    if (imageUrl) {
      setImageUrl(imageUrl);
      setIcon({});
      handleChangeImageUrl(imageUrl);
    } else {
      handleChangeIcon(previousIcon);
    }
  };

  const handleConfirm = () => {
    setIsListIconVisible(false);
    if (icon.iconName) {
      setImageUrl("");
    }
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
        String(item.id) === idSection
          ? {
              ...item,
              content: item.content.map((contentItem) => {
                const contentIdToCheck = isEditingContent
                  ? currentContent.id
                  : setting.id;

                return String(contentItem.id) === String(contentIdToCheck)
                  ? {
                      ...contentItem,
                      content: {
                        ...contentItem.content,
                        ...updateIcon,
                      },
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  return (
    <>
      {isListIconVisible ? (
        <div>
          <Confirmation
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
          />

          <IconPicker
            value={icon}
            onChange={(value) => handleChangeIcon(value)}
          />
        </div>
      ) : (
        <div
          style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
          className="p-3"
        >
          <div style={{ gap: 10 }} className="d-flex align-items-center mb-3">
            <ColorPicker
              initialColor={selectedColorButton}
              label="Tombol"
              onChange={(color) => {
                setSelectedColorButton(color);
              }}
            />

            <ColorPicker
              initialColor={selectedColorText}
              label="Teks"
              onChange={(color) => {
                setSelectedColorText(color);
              }}
            />
          </div>

          <div style={{ gap: 10 }} className="d-flex align-items-center ">
            <SelectOptions
              label="Desain"
              options={variantButton}
              onChange={(selectedOption) => {
                setSelectedVariantButton(selectedOption);
                handleChangeButtonStyle("variant", selectedOption.value);
              }}
              value={selectedVariantButton}
              width="50"
            />

            <SelectOptions
              label="Melingkar"
              options={roundedButtonOptions}
              onChange={(selectedOption) => {
                setSelectedRoundedButton(selectedOption);
                handleChangeButtonStyle("rounded", selectedOption.value);
              }}
              value={selectedRoundedButton}
              width="50"
            />
          </div>

          <div style={{ gap: 10 }} className="d-flex align-items-center ">
            <SelectOptions
              label="Ukuran"
              options={ButtonSizeOptions}
              onChange={(selectedOption) => {
                setSelectedButtonSize(selectedOption);
                handleChangeButtonStyle("buttonSize", selectedOption.value);
              }}
              value={selectedButtonSize}
              width="50"
            />

            <SelectOptions
              label="Bayangan"
              options={shadowOptions}
              onChange={(selectedOption) => {
                setSelectedButtonShadow(selectedOption);
                handleChangeButtonStyle("shadow", selectedOption.value);
              }}
              value={selectedButtonShadow}
              width="50"
            />
          </div>

          <Input
            label="Teks"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
          />

          <IconUploader
            iconPack={iconPack}
            icon={icon}
            imageUrl={imageUrl}
            handleFileUpload={handleFileUpload}
            handleSearchIcon={handleSearchIcon}
            handleRemoveIcon={handleRemoveIcon}
          />

          <h5>Link</h5>

          <TargetOptions
            setPreviewSection={setPreviewSection}
            sectionId={idSection}
            selectedSectionToEdit={selectedSectionToEdit}
            currentContent={isEditingContent ? currentContent : setting}
            isEditingContent={isEditingContent}
            isPopUpExist={true}
          />
        </div>
      )}
    </>
  );
};

export default UpdateContent;
