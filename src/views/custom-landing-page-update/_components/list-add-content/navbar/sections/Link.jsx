import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { createUniqueID } from "../../../../../../lib/unique-id";
import ColorPicker from "../../../common/ColorPicker";
import Confirmation from "../../../common/Confirmation";
import IconPicker from "../../../common/IconPicker";
import Input from "../../../common/Input";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";
import ScrollTargetInput from "../../../common/ScrollTargetSelect";
import SelectOptions from "../../../common/SelectOptions";
import UrlInput from "../../../common/UrlInput";
import WhatsAppInput from "../../../common/WhatAppsInput";
import FacebookPixel from "../../../FacebookPixel";
import { localPageTargetOptions } from "../../../SelectOptions";
import { useScrollTargetChange } from "../../footer/hooks/useScrollTargetChange";
import { useUrlChange } from "../../footer/hooks/useUrlChange";
import { useWhatAppsChange } from "../../footer/hooks/useWhatAppsChange";

export const shownOnWhenOptions = [
  { value: "alwaysShown", label: "Selalu Terlihat" },
  { value: "logged-in", label: "Sudah Login" },
  { value: "not-logged-in", label: "Belum Login" },
];

const typeViewOptions = [
  { value: "link", label: "Link" },
  { value: "button", label: "Tombol" },
  { value: "circle-button", label: "Tombol (Bulat)" },
];

const Link = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  currentContent,
}) => {
  const { optionsScrollTarget, optionsTarget } = useSelector(
    (state) => state.customLandingPage
  );

  const [setting, setSetting] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  const contentIdToCheck = isEditingSection ? currentContent.id : setting.id;

  const contentItemIdToCheck = isEditingSection
    ? currentContent?.content?.length > 0
      ? currentContent.content[0]
      : null
    : selectedCurrentSection?.content?.length > 0
    ? selectedCurrentSection.content[0]
    : null;

  const [selectedOption, setSelectedOption] = useState(
    optionsTarget[0].options[0]
  );

  const [title, setTitle] = useState(
    currentContent?.wrapperStyle?.title || "Keranjang"
  );

  const [btnColor, setBtnColor] = useState(
    contentItemIdToCheck?.btnColor || "#fa541c"
  );

  const [shownOnWhen, setShownOnWhen] = useState(shownOnWhenOptions[0]);

  const [typeView, setTypeView] = useState(typeViewOptions[0]);

  const [titleValue] = useDebounce(title, 300);

  const [iconSize, setIconSize] = useState(
    contentItemIdToCheck?.iconSize || 20
  );
  const [imageSize, setImageSize] = useState(
    contentItemIdToCheck?.imageSize || 50
  );

  const [localPageTarget, setLocalPageTarget] = useState(
    localPageTargetOptions[0]
  );

  const { url, setUrl, handleUrlOpenNewTabChange } = useUrlChange(
    setPreviewSection,
    currentSection?.id,
    contentIdToCheck,
    contentItemIdToCheck
  );

  const { whatApps, setWhatApps, handleUrlOpenNewTabWaChange } =
    useWhatAppsChange(
      setPreviewSection,
      currentSection?.id,
      contentIdToCheck,
      contentItemIdToCheck
    );

  const {
    selectedOptionScrollTarget,
    setSelectedOptionScrollTarget,
    handleChangeScrollTarget,
  } = useScrollTargetChange(
    setPreviewSection,
    currentSection?.id,
    contentIdToCheck,
    contentItemIdToCheck
  );

  const iconPack = useFontAwesomeIconPack();

  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(
    isEditingSection ? contentItemIdToCheck?.icon : ""
  );
  const [imageUrl, setImageUrl] = useState(
    isEditingSection ? contentItemIdToCheck?.image : ""
  );

  const [isListIconVisible, setIsListIconVisible] = useState(false);

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

  const handleChangeImageUrl = (value) => {
    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        content: prev.content.map((contentItem) =>
          contentItem.id === contentItemIdToCheck?.id
            ? {
                ...contentItem,
                image: value,
                icon: "",
              }
            : contentItem
        ),
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                content.id === contentIdToCheck
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentItemIdToCheck?.id)
                          ? {
                              ...contentItem,
                              image: value,
                              icon: "",
                            }
                          : contentItem;
                      }),
                    }
                  : content
              ),
            }
          : item
      )
    );
  };

  const handleChangeIcon = (value) => {
    setIcon(value);

    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        content: prev.content.map((contentItem) =>
          contentItem.id === contentItemIdToCheck?.id
            ? {
                ...contentItem,
                image: "",
                icon: value,
              }
            : contentItem
        ),
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                content.id === contentIdToCheck
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentItemIdToCheck?.id)
                          ? {
                              ...contentItem,
                              icon: value,
                              image: "",
                            }
                          : contentItem;
                      }),
                    }
                  : content
              ),
            }
          : item
      )
    );
  };

  useEffect(() => {
    if (isEditingSection) {
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
            String(item.id) === currentSection?.id
              ? {
                  ...item,
                  content: item.content.map((content) =>
                    content.id === contentIdToCheck
                      ? {
                          ...content,
                          content: content.content.map((contentItem) => {
                            return String(contentItem.id) ===
                              String(contentItemIdToCheck?.id)
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
                              : contentItem;
                          }),
                        }
                      : content
                  ),
                }
              : item
          )
        );

        setSelectedOptionScrollTarget(updatedOption);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection, optionsScrollTarget, selectedOption]);

  useEffect(() => {
    if (isEditingSection) {
      const currentTargetOption = optionsTarget
        .flatMap((group) => group.options)
        .find((opt) => {
          const targetType = contentItemIdToCheck?.target;
          return (
            (targetType?.scrollTarget && opt.value === "scroll-target") ||
            (targetType?.url && opt.value === "url") ||
            (targetType?.whatApps && opt.value === "whatApps") ||
            (targetType?.localPage && opt.value === "local-page")
          );
        });

      if (currentTargetOption) {
        setSelectedOption(currentTargetOption);
      }
    }
  }, [optionsTarget, isEditingSection, contentItemIdToCheck]);

  useEffect(() => {
    if (
      (!isEditingSection &&
        selectedOption &&
        selectedOption.value === "scroll-target") ||
      (isEditingSection &&
        selectedOption &&
        selectedOption.value === "scroll-target" &&
        !contentItemIdToCheck.target?.scrollTarget?.value)
    ) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection?.id
            ? {
                ...item,
                content: item.content.map((content) =>
                  content.id === contentIdToCheck
                    ? {
                        ...content,
                        content: content.content.map((contentItem) => {
                          return String(contentItem.id) ===
                            String(contentItemIdToCheck?.id)
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
            : item
        )
      );

      setSelectedOptionScrollTarget(optionsScrollTarget[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    if (isEditingSection) {
      const currentScrollTarget = optionsScrollTarget.find(
        (opt) => opt.id === contentItemIdToCheck?.target?.scrollTarget?.id
      );

      if (currentScrollTarget) {
        setSelectedOptionScrollTarget(currentScrollTarget);
      }
    }
  }, [
    contentItemIdToCheck,
    isEditingSection,
    optionsScrollTarget,
    setSelectedOptionScrollTarget,
  ]);

  useEffect(() => {
    if (!isEditingSection) {
      let section = previewSection.find(
        (section) => section.id === currentSection?.id
      );
      if (section) {
        let content = section.content.find(
          (content) => content.id === setting?.id
        );

        if (content) {
          setSelectedCurrentSection(content);
        }
      }
    }
  }, [previewSection, isEditingSection, setting.id, currentSection.id]);

  useEffect(() => {
    if (titleValue !== currentContent?.wrapperStyle?.title) {
      handleChangeWrapperStyle("title", titleValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue]);

  useEffect(() => {
    const currentShowOnWhen = shownOnWhenOptions.find(
      (opt) => opt.value === contentItemIdToCheck?.shownOnWhen
    );

    if (currentShowOnWhen) {
      setShownOnWhen(currentShowOnWhen);
    }

    const currentTypeView = typeViewOptions.find(
      (opt) => opt.value === contentItemIdToCheck?.typeView
    );

    if (currentTypeView) {
      setTypeView(currentTypeView);
    }

    const currentlocalPageTarget = localPageTargetOptions
      .flatMap((group) => group.options)
      .find(
        (opt) => opt.value === contentItemIdToCheck?.target?.localPage?.value
      );

    if (currentlocalPageTarget) {
      setLocalPageTarget(currentlocalPageTarget);
    }
  }, [contentItemIdToCheck, currentContent]);

  const handleChangeOptions = (selectedOptionValue) => {
    setSelectedOption(selectedOptionValue);
    if (!selectedOptionValue.value) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection?.id
            ? {
                ...item,
                content: item.content.map((content) =>
                  content.id === contentIdToCheck
                    ? {
                        ...content,
                        content: content.content.map((contentItem) => {
                          return String(contentItem.id) ===
                            String(contentItemIdToCheck?.id)
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
            : item
        )
      );
      setSelectedOptionScrollTarget(undefined);
    }

    setWhatApps({});
    setSelectedOptionScrollTarget(undefined);
    setUrl({});
  };

  const handleChangeContent = (key, value) => {
    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        content: prev.content.map((contentItem) =>
          contentItem.id === contentItemIdToCheck?.id
            ? {
                ...contentItem,
                [key]: value,
              }
            : contentItem
        ),
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) => {
                return String(content.id) === String(contentIdToCheck)
                  ? {
                      ...content,
                      content: content.content.map((contentItem) =>
                        contentItem.id === contentItemIdToCheck?.id
                          ? {
                              ...contentItem,
                              [key]: value,
                            }
                          : contentItem
                      ),
                    }
                  : content;
              }),
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentSection?.content);
    let payload = {
      id: `link-${uniqueId}}`,
      name: "link",
      title: "Link",
      content: [
        {
          id: createUniqueID([]),
          shownOnWhen: "alwaysVisible",
          typeView: "link",
          btnColor: "#fa541c",
          icon: "",
          iconSize: 20,
          image: "",
          imageSize: 50,
          target: {},
        },
      ],
      wrapperStyle: {
        title: "Link",
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

  const handleChangeWrapperStyle = (key, value) => {
    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
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

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "iconSize") {
      setIconSize(newValue);
    } else if (key === "imageSize") {
      setImageSize(newValue);
    }
    handleChangeContent(key, newValue);
  };

  useEffect(() => {
    if (
      (!isEditingSection &&
        selectedOption &&
        selectedOption.value === "local-page") ||
      (isEditingSection &&
        selectedOption &&
        selectedOption.value === "local-page" &&
        !contentItemIdToCheck.target?.localPage?.value)
    ) {
      setPreviewSection((arr) =>
        arr.map((item) =>
          String(item.id) === currentSection?.id
            ? {
                ...item,
                content: item.content.map((content) =>
                  content.id === contentIdToCheck
                    ? {
                        ...content,
                        content: content.content.map((contentItem) => {
                          return String(contentItem.id) ===
                            String(contentItemIdToCheck?.id)
                            ? {
                                ...contentItem,
                                target: {
                                  localPage:
                                    localPageTargetOptions[0].options[0].value,
                                },
                              }
                            : contentItem;
                        }),
                      }
                    : content
                ),
              }
            : item
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const handleChangeLocalPage = (value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                String(content.id) === String(contentIdToCheck)
                  ? {
                      ...content,
                      content: content.content.map((contentItem) =>
                        contentItem.id === contentItemIdToCheck.id
                          ? {
                              ...contentItem,
                              target: {
                                localPage: {
                                  value,
                                },
                              },
                            }
                          : contentItem
                      ),
                    }
                  : content
              ),
            }
          : item
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
          <div
            style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
            className="p-3"
          >
            <Input
              label="Teks"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <div style={{ gap: 10 }} className="d-flex align-items-center">
              <SelectOptions
                label="Perlihatkan Ketika"
                options={shownOnWhenOptions}
                onChange={(selectedOption) => {
                  setShownOnWhen(selectedOption);
                  handleChangeContent("shownOnWhen", selectedOption.value);
                }}
                value={shownOnWhen}
                width="50"
              />
              <SelectOptions
                label="Perlihatkan Sebagai"
                options={typeViewOptions}
                onChange={(selectedOption) => {
                  setTypeView(selectedOption);
                  handleChangeContent("typeView", selectedOption.value);
                }}
                value={typeView}
                width="50"
              />
            </div>

            {typeView.value.includes("button") && (
              <div className="mb-3">
                <div className="mb-2">
                  <ColorPicker
                    initialColor={btnColor}
                    label="Warna Tombol"
                    onChange={(color) => {
                      setBtnColor(color);
                      handleChangeContent("btnColor", color);
                    }}
                    width="w-0"
                  />
                </div>

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

                {contentItemIdToCheck?.icon && (
                  <InputRangeWithNumber
                    label="Ukuran Icon"
                    value={iconSize}
                    onChange={(newValue) => {
                      setIconSize(newValue);
                      handleChangeContent("iconSize", newValue);
                    }}
                    min={10}
                    max={100}
                    onBlur={() =>
                      handleSetValueWhenBlur(iconSize, 10, 100, "iconSize")
                    }
                  />
                )}

                {contentItemIdToCheck?.image && (
                  <InputRangeWithNumber
                    label="Ukuran Gambar"
                    value={imageSize}
                    onChange={(newValue) => {
                      setImageSize(newValue);
                      handleChangeContent("imageSize", newValue);
                    }}
                    min={10}
                    max={100}
                    onBlur={() =>
                      handleSetValueWhenBlur(imageSize, 10, 100, "imageSize")
                    }
                  />
                )}
              </div>
            )}

            <h5>Link</h5>

            <form>
              <div style={{ gap: 10 }} className="d-flex align-items-center">
                <SelectOptions
                  label="Target"
                  options={optionsTarget}
                  onChange={handleChangeOptions}
                  value={selectedOption}
                  width="50"
                />

                {selectedOption?.value === "local-page" && (
                  <SelectOptions
                    label="Link Ke"
                    options={localPageTargetOptions}
                    onChange={(selectedOption) => {
                      setLocalPageTarget(selectedOption);
                      handleChangeLocalPage(selectedOption.value);
                    }}
                    value={localPageTarget}
                    width="50"
                  />
                )}
              </div>

              {selectedOption?.value === "url" && (
                <UrlInput
                  id="urlOpenNewTabText&Img"
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
                  id="waOpenNewTabText&Img"
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
      </div>
    </>
  );
};

export default Link;
