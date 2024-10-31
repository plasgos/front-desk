import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import { useSCrollTargetChange } from "../../../../../hooks/useScrolltargetChange";
import { useUrlChange } from "../../../../../hooks/useUrlChange";
import { useWhatAppsChange } from "../../../../../hooks/useWhatAppsChange";
import { createUniqueID } from "../../../../../lib/unique-id";
import ColorPicker from "../../common/ColorPicker";
import IconPicker from "../../common/IconPicker";
import ScrollTargetInput from "../../common/ScrollTargetSelect";
import SelectOptions from "../../common/SelectOptions";
import UrlInput from "../../common/UrlInput";
import WhatsAppInput from "../../common/WhatAppsInput";
import FacebookPixel from "../../FacebookPixel";
import { shadowOptions } from "../../SelectOptions";
import { setIsOpenPopup } from "../../../../../redux/modules/custom-landing-page/reducer";

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
    isEditingContent
      ? currentContent?.icon
      : { prefix: "fab", iconName: "whatsapp" }
  );
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? currentContent?.image : ""
  );

  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );
  const [setting, setSetting] = useState({});

  const [iconColor, setIconColor] = useState(
    isEditingContent ? currentContent?.iconColor : "#ffffff"
  );

  const [selectedColorButton, setSelectedColorButton] = useState(
    isEditingContent ? currentContent?.btnColor : "#2196F3"
  );

  const [colorButtonValue] = useDebounce(selectedColorButton, 300);

  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );

  const [selectedButtonSize, setSelectedButtonSize] = useState(
    ButtonSizeOptions[1]
  );
  const [selectedButtonShadow, setSelectedButtonShadow] = useState(
    shadowOptions[2]
  );

  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChange(
    setPreviewSection,
    idSection,
    isEditingContent ? currentContent : setting
  );

  const { whatApps, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatAppsChange(
      setPreviewSection,
      idSection,
      isEditingContent ? currentContent : setting
    );

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useSCrollTargetChange(
    setPreviewSection,
    idSection,
    isEditingContent ? currentContent : setting
  );

  useEffect(() => {
    if (colorButtonValue !== currentContent?.content?.btnColor) {
      handleChangeButtonStyle("btnColor", colorButtonValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorButtonValue]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      selectedOption &&
      selectedOption.value &&
      selectedOption?.value.includes("Pop Up")
    ) {
      const contentIdToCheck = isEditingContent
        ? currentContent.id
        : setting.id;

      const payload = {
        ...selectedOption,
        isShowPopup: false,
      };

      dispatch(setIsOpenPopup(payload));

      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === idSection
            ? {
                ...item,
                content: item.content.map((contentItem) =>
                  String(contentItem.id) === contentIdToCheck
                    ? {
                        ...contentItem,
                        target: {
                          popup: payload,
                        },
                      }
                    : contentItem
                ),
              }
            : item
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (isEditingContent) {
      const existingGroup = optionsTarget.find(
        (group) => group.label === "Kegiatan"
      );

      if (existingGroup) {
        const currentTargetOption = existingGroup.options.find(
          (opt) => opt.id === currentContent.target?.popup?.id
        );

        if (currentTargetOption) {
          setSelectedOption(currentTargetOption);
        }
      }
    }
  }, [isEditingContent, optionsTarget, currentContent]);

  useEffect(() => {
    if (isEditingContent) {
      const { shadow, buttonSize } = currentContent || {};

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
          arr.map((item) =>
            String(item.id) === idSection
              ? {
                  ...item,
                  content: item.content.map((contentItem) =>
                    String(contentItem.id) === String(currentContent.id)
                      ? {
                          ...contentItem,
                          target: {
                            scrollTarget: {
                              ...contentItem.target.scrollTarget,
                              value: updatedOption.value,
                              label: updatedOption.label,
                            },
                          },
                        }
                      : contentItem
                  ),
                }
              : item
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
            (targetType?.whatApps && opt.value === "whatApps")
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
                        target: {
                          scrollTarget: optionsScrollTarget[0],
                        },
                      }
                    : contentItem;
                }),
              }
            : item
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
                      image: value,
                      icon: "",
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
    // setImageUrl("");
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
                      icon: value,
                      image: "",
                    }
                  : contentItem;
              }),
            }
          : item
      )
    );
  };

  const handleChangeOptions = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
    if (!selectedOptionValue.value) {
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
                        target: {},
                      }
                    : contentItem;
                }),
              }
            : item
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
                      [key]: selectedOptionValue,
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
      btnColor: selectedColorButton,
      buttonSize: selectedButtonSize.value,
      shadow: selectedButtonShadow.value,
      icon,
      iconColor,
      image: "",
      target: {},
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
                      handleChangeButtonStyle("iconColor", color);
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
              positionShown="top"
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

            {selectedOption?.value === "whatApps" && (
              <WhatsAppInput
                id="waOpenNewTabBtn"
                whatApps={whatApps}
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
