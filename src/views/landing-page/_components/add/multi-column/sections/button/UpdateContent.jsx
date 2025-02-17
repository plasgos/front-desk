import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFontAwesomeIconPack } from "../../../../../../../hooks/useFontAwesomePack";
import { shadowOptions } from "../../../../SelectOptions";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import IconPicker from "../../../../common/IconPicker";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";
import Input from "../../../../common/Input";
import UrlInput from "../../../../common/UrlInput";
import WhatsAppInput from "../../../../common/WhatsAppInput";
import ScrollTargetInput from "../../../../common/ScrollTargetSelect";
import FacebookPixel from "../../../../FacebookPixel";
import { useUrlChangeMultiColumn } from "../../hooks/useUrlChangeMulitColumn";
import { useWhatsappsChangeMultiColumn } from "../../hooks/useWhatsappsChangeMultiColumn";
import { useSCrollTargetChangeMultiColumn } from "../../hooks/useScrolltargetChangeMultiColumn";
import { addContentBySectionId } from "../../helper/addContentBySectionId";

export const variantButton = [
  { value: "fill", label: "Fill" },
  { value: "ghost", label: "Ghost" },
];

export const roundedButtonOptions = [
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
  idSection: contentId,
  currentContent,
  setPreviewSection,
  isEditingContent,
  isListIconVisible,
  setIsListIconVisible,
  sectionId,
  columnId,
}) => {
  const iconPack = useFontAwesomeIconPack();

  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(
    isEditingContent ? currentContent?.content?.icon : ""
  );
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? currentContent?.content?.image : ""
  );

  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );
  const [setting, setSetting] = useState({});

  const [iconColor, setIconColor] = useState(
    isEditingContent ? currentContent?.content?.iconColor : ""
  );

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

  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );
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

  const contentIdToCheck = isEditingContent ? currentContent.id : setting.id;

  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChangeMultiColumn(
    sectionId,
    columnId,
    setPreviewSection,
    contentId,
    isEditingContent ? currentContent : setting
  );

  const { whatsapp, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatsappsChangeMultiColumn(
      sectionId,
      columnId,
      setPreviewSection,
      contentId,
      isEditingContent ? currentContent : setting
    );

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useSCrollTargetChangeMultiColumn(
    sectionId,
    columnId,
    setPreviewSection,
    contentId,
    isEditingContent ? currentContent : setting
  );

  useEffect(() => {
    if (titleValue !== currentContent?.content?.title) {
      handleChangeContent("title", titleValue);
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

  useEffect(() => {
    if (isEditingContent) {
      if (
        selectedOption &&
        selectedOption.value === "scroll-target" &&
        selectedOptionScrollTarget &&
        optionsScrollTarget
      ) {
        const updatedOption = optionsScrollTarget.find(
          (option) => option.id === selectedOptionScrollTarget.id
        );

        setPreviewSection((arr) =>
          arr.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  column: section.column.map((column) =>
                    column.id === columnId
                      ? {
                          ...column,
                          content: column.content.map((content) =>
                            content.id === contentId
                              ? {
                                  ...content,
                                  content: content.content.map(
                                    (contentItem) => {
                                      return contentItem.id === contentIdToCheck
                                        ? {
                                            ...contentItem,
                                            target: {
                                              scrollTarget: {
                                                ...contentItem.target
                                                  .scrollTarget,
                                                value: updatedOption.value,
                                                label: updatedOption.label,
                                              },
                                            },
                                          }
                                        : contentItem;
                                    }
                                  ),
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

        setSelectedOptionScrollTarget(updatedOption);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent, optionsScrollTarget, selectedOption]);

  useEffect(() => {
    if (isEditingContent) {
      const currentTargetOption = optionsTarget
        .flatMap((group) => group.options)
        .find((opt) => {
          const targetType = currentContent?.target;
          return (
            (targetType?.scrollTarget && opt.value === "scroll-target") ||
            (targetType?.url && opt.value === "url") ||
            (targetType?.whatsapp && opt.value === "whatsapp")
          );
        });

      if (currentTargetOption) {
        setSelectedOption(currentTargetOption);
      }
    }
  }, [isEditingContent, currentContent, optionsTarget]);

  useEffect(() => {
    if (
      (!isEditingContent &&
        selectedOption &&
        selectedOption.value === "scroll-target") ||
      (isEditingContent &&
        selectedOption &&
        selectedOption.value === "scroll-target" &&
        !currentContent.target?.scrollTarget?.value)
    ) {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.map((content) =>
                          content.id === contentId
                            ? {
                                ...content,
                                content: content.content.map((contentItem) => {
                                  return contentItem.id === contentIdToCheck
                                    ? {
                                        ...contentItem,
                                        target: {
                                          scrollTarget: optionsScrollTarget[0],
                                        },
                                      }
                                    : contentItem;
                                }),
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

      setSelectedOptionScrollTarget(optionsScrollTarget[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (isEditingContent) {
      const currentScrollTarget = optionsScrollTarget.find(
        (opt) => opt.id === currentContent.target?.scrollTarget?.id
      );

      if (currentScrollTarget) {
        setSelectedOptionScrollTarget(currentScrollTarget);
      }
    }
  }, [
    currentContent,
    isEditingContent,
    optionsScrollTarget,
    setSelectedOptionScrollTarget,
  ]);

  const setChangeContentValue = (updateContent) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === contentId
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                return contentItem.id === contentIdToCheck
                                  ? {
                                      ...contentItem,
                                      content: {
                                        ...contentItem.content,
                                        ...updateContent,
                                      },
                                    }
                                  : contentItem;
                              }),
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

  const handleChangeImageUrl = (value) => {
    const updateContent = {
      image: value,
      icon: "",
    };
    setChangeContentValue(updateContent);
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

    const updateContent = {
      icon: value,
      image: "",
    };
    setChangeContentValue(updateContent);
  };

  const handleChangeOptions = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
    if (!selectedOptionValue.value) {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.map((content) =>
                          content.id === contentId
                            ? {
                                ...content,
                                content: content.content.map((contentItem) => {
                                  return contentItem.id === contentIdToCheck
                                    ? {
                                        ...contentItem,
                                        target: {},
                                      }
                                    : contentItem;
                                }),
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

      setSelectedOptionScrollTarget(undefined);
    }

    setWhatApps({});
    setUrl({});
    setSelectedOptionScrollTarget(undefined);
  };

  const handleChangeButtonStyle = (key, selectedOptionValue) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === contentId
                          ? {
                              ...content,
                              content: content.content.map((contentItem) => {
                                return contentItem.id === contentIdToCheck
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

  const handleChangeContent = (key, value) => {
    const updateContent = {
      [key]: value,
    };
    setChangeContentValue(updateContent);
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
      target: {},
    };

    addContentBySectionId(
      setPreviewSection,
      sectionId,
      columnId,
      contentId,
      payload
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

  return (
    <>
      {isListIconVisible ? (
        <div>
          <div className="d-flex justify-content-end align-items-center border-bottom p-2 mb-3">
            <div>
              <CButton
                onClick={handleCancel}
                color="primary"
                variant="outline"
                className="mx-2"
              >
                Batal
              </CButton>

              <CButton onClick={handleConfirm} color="primary">
                Selesai
              </CButton>
            </div>
          </div>

          <IconPicker
            value={icon}
            onChange={(value) => handleChangeIcon(value)}
          />
        </div>
      ) : (
        <div>
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

          <div id="icon">
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
                  <ColorPicker
                    initialColor={iconColor}
                    onChange={(color) => {
                      setIconColor(color);
                      handleChangeContent("iconColor", color);
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

          <h5>Link</h5>

          <form>
            <SelectOptions
              label="Target"
              options={optionsTarget}
              onChange={handleChangeOptions}
              value={selectedOption}
              width="100"
            />

            {selectedOption?.value === "url" && (
              <UrlInput
                id="urlOpenNewTabBtn"
                url={url}
                handleUrlChange={(newValue) => {
                  setUrl((prevValue) => ({
                    ...prevValue,
                    url: newValue,
                  }));
                }}
                handleUrlOpenNewTabChange={handleUrlOpenNewTabChange}
              />
            )}

            {selectedOption?.value === "whatsapp" && (
              <WhatsAppInput
                id="waOpenNewTabBtn"
                whatsapp={whatsapp}
                handlePhoneNumberChange={(newValue) => {
                  setWhatApps((prevValue) => ({
                    ...prevValue,
                    phoneNumber: newValue,
                  }));
                }}
                handleMessageChange={(newValue) => {
                  setWhatApps((prevValue) => ({
                    ...prevValue,
                    message: newValue,
                  }));
                }}
                handleUrlOpenNewTabWaChange={handleUrlOpenNewTabWaChange}
              />
            )}

            {selectedOption?.value === "scroll-target" && (
              <ScrollTargetInput
                optionsScrollTarget={optionsScrollTarget}
                handleChangeScrollTarget={handleChangeScrollTarget}
                selectedOptionScrollTarget={selectedOptionScrollTarget}
              />
            )}
          </form>

          {selectedOption.value !== undefined && <FacebookPixel />}
        </div>
      )}
    </>
  );
};

export default UpdateContent;
