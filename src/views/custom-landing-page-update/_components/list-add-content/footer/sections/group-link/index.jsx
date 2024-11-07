import { CButton, CCard, CCardBody } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useFontAwesomeIconPack } from "../../../../../../../hooks/useFontAwesomePack";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import Confirmation from "../../../../common/Confirmation";
import IconPicker from "../../../../common/IconPicker";
import Input from "../../../../common/Input";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";

import { IoAdd } from "react-icons/io5";
import { DraggableSections } from "../../common/DraggbleSections";
import { useMoveSection } from "../../hooks/useMoveSection";
import { useRemoveSection } from "../../hooks/useRemoveSection";
import UpdateContent from "./UpadateContent";

const GroupLink = ({
  previewSection,
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
    currentContent?.wrapperStyle?.title || "Link"
  );

  const [iconSize, setIconSize] = useState(
    currentContent?.wrapperStyle?.iconSize || 20
  );
  const [imageSize, setImageSize] = useState(
    currentContent?.wrapperStyle?.imageSize || 50
  );

  const [setting, setSetting] = useState({});
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

  const [isListIconContentVisible, setIsListIconContentVisible] =
    useState(false);

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

  useEffect(() => {
    if (titleValue) {
      handleChangeContent("title", titleValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue]);

  const handleChangeContent = (key, value) => {
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

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentSection?.content);
    let payload = {
      id: uniqueId,
      name: "group-link",
      title: "Grup Link",
      content: [
        {
          id: createUniqueID([]),
          text: "Home",
          icon: "",
          iconSize: 20,
          image: "",
          imageSize: 50,
          target: {},
        },
        {
          id: createUniqueID([]),
          text: "Blog",
          icon: "",
          iconSize: 20,
          image: "",
          imageSize: 50,
          target: {},
        },
        {
          id: createUniqueID([]),
          text: "Daftar Produk",
          icon: "",
          iconSize: 20,
          image: "",
          imageSize: 50,
          target: {},
        },
        {
          id: createUniqueID([]),
          text: "Konfirmasi Pembayaran",
          icon: "",
          iconSize: 20,
          image: "",
          imageSize: 50,
          target: {},
        },
      ],
      wrapperStyle: {
        title: "Link",
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

  const handleCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === currentSection?.id
            ? {
                ...section,
                content: section.content?.map((content) =>
                  content.id === contentIdToCheck
                    ? {
                        ...content,
                        content: content.content.filter(
                          (_, index) => index !== content.content.length - 1
                        ),
                      }
                    : content
                ),
              }
            : section
        )
      );
    } else if (isEditingContent) {
      setPreviewSection([...currentContentBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isListIconVisible) {
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
    } else if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
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
    handleChangeContent(key, newValue);
  };

  const editSection = useCallback(
    (section) => {
      setCurrentContentBeforeEdit([...previewSection]);
      setSelectedContent(section);
      setIsEditingContent(true);
    },
    [previewSection]
  );

  const removeSection = useRemoveSection(setPreviewSection);

  const moveSection = useMoveSection(setPreviewSection);

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((content) => {
            if (content.id === contentIdToCheck && content.content) {
              return (
                <div key={content.id}>
                  {content.content.map((contentItem, contentIndex) => (
                    <DraggableSections
                      section={contentItem}
                      key={contentItem.id || `contentItem-${contentIndex}`}
                      index={contentIndex}
                      id={contentItem.id}
                      titleContent={"Link"}
                      titleContentItem={`${contentItem?.text}`}
                      moveSection={(dragIndex, hoverIndex) =>
                        moveSection(
                          section.id,
                          content.id,
                          dragIndex,
                          hoverIndex
                        )
                      }
                      editSection={() => editSection(contentItem)}
                      removeSection={() =>
                        removeSection(section.id, content.id, contentItem.id)
                      }
                      hiddenFocus={true}
                    />
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    },
    [contentIdToCheck, editSection, moveSection, removeSection]
  );
  return (
    <div>
      {!isListIconContentVisible && (
        <Confirmation
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}

      {isListIconVisible ? (
        <IconPicker
          value={icon}
          onChange={(value) => handleChangeIcon(value)}
        />
      ) : isAddContent ? (
        <UpdateContent
          currentSection={currentSection}
          currentContent={isEditingSection ? currentContent : setting}
          selectedContent={null}
          setPreviewSection={setPreviewSection}
          isListIconContentVisible={isListIconContentVisible}
          setIsListIconContentVisible={setIsListIconContentVisible}
        />
      ) : isEditingContent ? (
        <UpdateContent
          currentSection={currentSection}
          currentContent={isEditingSection ? currentContent : setting}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
          setPreviewSection={setPreviewSection}
          isEditingContent={true}
          isListIconContentVisible={isListIconContentVisible}
          setIsListIconContentVisible={setIsListIconContentVisible}
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

          <div>
            {previewSection.map((section) => {
              if (section.id === currentSection?.id) {
                return renderSection(section);
              }

              return null;
            })}
          </div>
          <CCard
            style={{ cursor: "pointer" }}
            onClick={() => setIsAddContent(true)}
          >
            <CCardBody className="p-1">
              <div className="d-flex align-items-center ">
                <IoAdd
                  style={{
                    cursor: "pointer",
                    margin: "0px 10px 0px 6px",
                  }}
                  size={18}
                />

                <div>Tambah Konten</div>
              </div>
            </CCardBody>
          </CCard>
        </div>
      )}
    </div>
  );
};

export default GroupLink;
