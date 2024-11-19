import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useFontAwesomeIconPack } from "../../../../../../hooks/useFontAwesomePack";
import { createUniqueID } from "../../../../../../lib/unique-id";
import ColorPicker from "../../../common/ColorPicker";
import Confirmation from "../../../common/Confirmation";
import IconPicker from "../../../common/IconPicker";
import IconUploader from "../../../common/IconUploader";
import Input from "../../../common/Input";
import InputRangeWithNumber from "../../../common/InputRangeWithNumber";
import SelectOptions from "../../../common/SelectOptions";
import TargetOptionNavbarFooter from "../../footer/common/TargetOptionNavbarFooter";

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
  }, [contentItemIdToCheck, currentContent]);

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
          target: {
            localPage: { value: "home" },
          },
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

    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        content: prev.content.map((contentItem) =>
          contentItem.id === contentItemIdToCheck?.id
            ? {
                ...contentItem,
                ...updateIcon,
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
                              ...updateIcon,
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

                <IconUploader
                  iconPack={iconPack}
                  icon={icon}
                  imageUrl={imageUrl}
                  handleFileUpload={handleFileUpload}
                  handleSearchIcon={handleSearchIcon}
                  handleRemoveIcon={handleRemoveIcon}
                />

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

            <TargetOptionNavbarFooter
              setPreviewSection={setPreviewSection}
              sectionId={currentSection?.id}
              currentContentId={contentIdToCheck}
              selectedContent={contentItemIdToCheck}
              isEditingContent={isEditingSection}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Link;
