import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useFontAwesomeIconPack } from "../../../../../../../hooks/useFontAwesomePack";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import { CButton } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../../../common/Input";
import IconPicker from "../../../../common/IconPicker";
import Confirmation from "../../../../common/Confirmation";

import jnt from "../../../../../../../assets/jnt.png";
import jne from "../../../../../../../assets/jne-logo.png";

const ListLogo = ({
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  currentContent,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);
  const [selectedContent, setSelectedContent] = useState({});

  const [title, setTitle] = useState(
    currentContent?.content?.title || "Misi Kami"
  );

  const [maxWidth, setMaxWidth] = useState(
    currentContent?.content?.maxWidth || 300
  );

  const [iconSize, setIconSize] = useState(currentContent?.iconSize || 20);
  const [imageSize, setImageSize] = useState(currentContent?.imageSize || 50);

  const [setting, setSetting] = useState({});
  const [titleValue] = useDebounce(title, 300);
  console.log("🚀 ~ titleValue:", titleValue);

  const iconPack = useFontAwesomeIconPack();

  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(
    isEditingSection ? currentContent?.icon : ""
  );

  const [imageUrl, setImageUrl] = useState(
    isEditingSection ? currentContent?.image : ""
  );

  const [isListIconVisible, setIsListIconVisible] = useState(false);

  const contentIdToCheck = isEditingSection ? currentContent.id : setting.id;

  useEffect(() => {
    if (imageUrl !== "") {
      setIcon({});
      // handleChangeImageUrl(imageUrl);
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

  // const handleChangeImageUrl = (value) => {
  //   setPreviewSection((arr) =>
  //     arr.map((section) =>
  //       section.id === currentSection?.id
  //         ? {
  //             ...section,
  //             content: section.content.map((contentItem) =>
  //               contentItem.id === contentIdToCheck
  //                 ? {
  //                     ...contentItem,
  //                     content: {
  //                       ...contentItem.content,
  //                       icon: "",
  //                       image: value,
  //                     },
  //                   }
  //                 : contentItem
  //             ),
  //           }
  //         : section
  //     )
  //   );
  // };

  // const handleChangeIcon = (value) => {
  //   setIcon(value);

  //   setPreviewSection((arr) =>
  //     arr.map((section) =>
  //       section.id === currentSection?.id
  //         ? {
  //             ...section,
  //             content: section.content.map((contentItem) =>
  //               contentItem.id === contentIdToCheck
  //                 ? {
  //                     ...contentItem,
  //                     content: {
  //                       ...contentItem.content,
  //                       icon: value,
  //                       image: "",
  //                     },
  //                   }
  //                 : contentItem
  //             ),
  //           }
  //         : section
  //     )
  //   );
  // };

  useEffect(() => {
    if (titleValue) {
      console.log("RUNnnnn");
      handleChangeContent("title", titleValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue]);

  const handleChangeContent = (key, value) => {
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

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentSection?.content);
    let payload = {
      id: uniqueId,
      name: "list-logo",
      title: "Daftar Logo",
      content: [
        { id: createUniqueID([]), image: jnt, target: {} },
        { id: createUniqueID([]), image: jne, target: {} },
      ],
      wrapperStyle: {
        title: "Metode Pengiriman",
        maxWidth: 300,
        icon: "",
        iconSize: 20,
        image: "",
        imageSize: 50,
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);

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
        // handleChangeImageUrl(imageUrl);
      } else {
        // handleChangeIcon(previousIcon);
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
    if (key === "maxWidth") {
      setMaxWidth(newValue);
    } else if (key === "iconSize") {
      setIconSize(newValue);
    } else if (key === "imageSize") {
      setImageSize(newValue);
    }
    handleChangeContent(key, newValue);
  };

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      {isListIconVisible ? (
        <IconPicker
          value={icon}
          // onChange={(value) => handleChangeIcon(value)}
        />
      ) : (
        <div
          style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
          className="p-3"
        >
          <Input
            label="Judul"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <InputRangeWithNumber
            label="Lebar Maksimal"
            value={maxWidth}
            onChange={(newValue) => {
              setMaxWidth(newValue);
              handleChangeContent("maxWidth", newValue);
            }}
            min={80}
            max={600}
            onBlur={() => handleSetValueWhenBlur(maxWidth, 80, 600, "maxWidth")}
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

          {currentContent?.content?.icon && (
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

          {currentContent?.content?.image && (
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
    </div>
  );
};

export default ListLogo;
