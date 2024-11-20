import React, { useEffect, useState } from "react";
import { createUniqueID } from "../../../../../../../lib/unique-id";

import { useDebounce } from "use-debounce";
import { useFontAwesomeIconPack } from "../../../../../../../hooks/useFontAwesomePack";
import Confirmation from "../../../../common/Confirmation";
import IconPicker from "../../../../common/IconPicker";
import IconUploader from "../../../../common/IconUploader";
import Input from "../../../../common/Input";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import TargetOptionNavbarFooter from "../../common/TargetOptionNavbarFooter";

const UpdateContent = ({
  currentSection,
  currentContent,
  selectedContent,
  setSelectedContent,
  setPreviewSection,
  isEditingContent,
  isListIconContentVisible,
  setIsListIconContentVisible,
}) => {
  const [text, setText] = useState(
    isEditingContent ? selectedContent?.text : "Link"
  );

  const [textValue] = useDebounce(text, 300);

  useEffect(() => {
    if (textValue) {
      handleChangeContent("text", textValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textValue]);

  const [setting, setSetting] = useState({});

  const isIconSizeAndImageSizeVisible = isEditingContent
    ? selectedContent
    : setting;
  useEffect(() => {
    if (!isEditingContent) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingContent]);

  const contentIdToCheck = isEditingContent ? selectedContent.id : setting.id;

  const handleChangeContent = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) =>
        String(section.id) === currentSection?.id
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentIdToCheck)
                          ? {
                              ...contentItem,
                              [key]: value,
                            }
                          : contentItem;
                      }),
                    }
                  : content
              ),
            }
          : section
      )
    );
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentContent?.content);
    let payload = {
      id: uniqueId,
      text: "Link",
      target: {},
      icon: "",
      iconSize: 20,
      image: "",
      imageSize: 50,
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === currentSection?.id
          ? {
              ...section,
              content: section.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: [...content.content, payload],
                    }
                  : content
              ),
            }
          : section
      )
    );

    setSetting(payload);
  };

  const handleCancel = () => {
    setIsListIconContentVisible(false);

    if (imageUrl) {
      setImageUrl(imageUrl);
      setIcon({});
      handleChangeImageUrl(imageUrl);
    } else {
      handleChangeIcon(previousIcon);
    }
  };

  const handleConfirm = () => {
    setIsListIconContentVisible(false);
    if (icon.iconName) {
      setImageUrl("");
    }
  };

  const iconPack = useFontAwesomeIconPack();
  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(
    isEditingContent ? selectedContent?.icon : ""
  );
  const [imageUrl, setImageUrl] = useState(
    isEditingContent ? selectedContent?.image : ""
  );

  const [iconSize, setIconSize] = useState(
    isEditingContent ? selectedContent?.iconSize : 20
  );
  const [imageSize, setImageSize] = useState(
    isEditingContent ? selectedContent?.imageSize : 30
  );

  const handleChangeIcon = (value) => {
    setIcon(value);

    if (!isEditingContent) {
      setSetting((prev) => ({
        ...prev,
        image: "",
        icon: value,
      }));
    } else {
      setSelectedContent((prev) => ({
        ...prev,
        image: "",
        icon: value,
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentIdToCheck)
                          ? {
                              ...contentItem,
                              image: "",
                              icon: value,
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
    setIsListIconContentVisible(true);
  };

  const handleChangeImageUrl = (value) => {
    if (!isEditingContent) {
      setSetting((prev) => ({
        ...prev,
        image: value,
        icon: "",
      }));
    } else {
      setSelectedContent((prev) => ({
        ...prev,
        image: value,
        icon: "",
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentIdToCheck)
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

    if (!isEditingContent) {
      setSetting((prev) => ({
        ...prev,
        ...updateIcon,
      }));
    } else {
      setSelectedContent((prev) => ({
        ...prev,
        ...updateIcon,
      }));
    }

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection?.id
          ? {
              ...item,
              content: item.content.map((content) =>
                content.id === currentContent?.id
                  ? {
                      ...content,
                      content: content.content.map((contentItem) => {
                        return String(contentItem.id) ===
                          String(contentIdToCheck)
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

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "iconSize") {
      setIconSize(newValue);
    } else if (key === "imageSize") {
      setImageSize(newValue);
    }
    handleChangeContent(key, newValue);
  };

  return (
    <>
      {isListIconContentVisible ? (
        <>
          <Confirmation
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
          />

          <IconPicker
            value={icon}
            onChange={(value) => handleChangeIcon(value)}
          />
        </>
      ) : (
        <div
          style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
          className="p-3"
        >
          <Input
            label="Teks"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          <TargetOptionNavbarFooter
            setPreviewSection={setPreviewSection}
            sectionId={currentSection?.id}
            currentContent={currentContent}
            contentIdToCheck={contentIdToCheck}
            isEditingContent={isEditingContent}
            selectedContent={isEditingContent ? selectedContent : setting}
          />

          <IconUploader
            iconPack={iconPack}
            icon={icon}
            imageUrl={imageUrl}
            handleFileUpload={handleFileUpload}
            handleSearchIcon={handleSearchIcon}
            handleRemoveIcon={handleRemoveIcon}
          />

          {isIconSizeAndImageSizeVisible?.icon && (
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

          {isIconSizeAndImageSizeVisible?.image && (
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
    </>
  );
};

export default UpdateContent;
