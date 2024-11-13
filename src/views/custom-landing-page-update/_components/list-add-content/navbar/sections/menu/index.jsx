import { CCard, CCardBody } from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import Confirmation from "../../../../common/Confirmation";
import Input from "../../../../common/Input";

import { IoAdd } from "react-icons/io5";

import { DraggableSections } from "../../../footer/common/DraggbleSections";
import { useMoveSection } from "../../../footer/hooks/useMoveSection";
import { useRemoveSection } from "../../../footer/hooks/useRemoveSection";
import UpdateContent from "./UpadateContent";
import { shownOnWhenOptions } from "../Link";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import ColorPicker from "../../../../common/ColorPicker";
import SelectOptions from "../../../../common/SelectOptions";
import Checkbox from "../../../../common/Checkbox";

const Menu = ({
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

  const [isPreviewContent, setIsPreviewContent] = useState(
    currentContent?.wrapperStyle?.isPreviewContent || false
  );

  const [title, setTitle] = useState(
    currentContent?.wrapperStyle?.title || "Popover"
  );

  const [shownOnWhen, setShownOnWhen] = useState(shownOnWhenOptions[0]);

  const [column, setColumn] = useState(
    currentContent?.wrapperStyle?.column || 1
  );

  const [bgColor, setBgColor] = useState(
    currentContent?.wrapperStyle?.bgColor || "#ffffff"
  );

  const [bgHoverColor, setBgHoverColor] = useState(
    currentContent?.wrapperStyle?.bgHoverColor || "#fa541c"
  );

  const [textColor, setTextColor] = useState(
    currentContent?.wrapperStyle?.textColor || "#000000"
  );

  const [textColorHover, setTextColorHover] = useState(
    currentContent?.wrapperStyle?.textColorHover || "#ffffff"
  );

  const [setting, setSetting] = useState({});
  const [titleValue] = useDebounce(title, 300);

  const [isListIconContentVisible, setIsListIconContentVisible] =
    useState(false);

  const contentIdToCheck = isEditingSection ? currentContent.id : setting.id;

  useEffect(() => {
    if (titleValue) {
      handleChangeWrapperStyle("title", titleValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleValue]);

  useEffect(() => {
    const currentShowOnWhen = shownOnWhenOptions.find(
      (opt) => opt.value === currentContent?.wrapperStyle?.shownOnWhen
    );

    if (currentShowOnWhen) {
      setShownOnWhen(currentShowOnWhen);
    }
  }, [currentContent]);

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

  const handleAddContent = () => {
    let uniqueId = createUniqueID(currentSection?.content);
    let payload = {
      id: uniqueId,
      name: "menu",
      title: "Menu",
      content: [
        {
          id: createUniqueID([]),
          text: "Link 1",
          icon: "",
          iconSize: 20,
          image: "",
          imageSize: 50,
          target: {},
          shownOnWhen: "alwaysVisible",
        },
        {
          id: createUniqueID([]),
          text: "Link 2",
          icon: "",
          iconSize: 20,
          image: "",
          imageSize: 50,
          target: {},
          shownOnWhen: "alwaysVisible",
        },
        {
          id: createUniqueID([]),
          text: "Link 3",
          icon: "",
          iconSize: 20,
          image: "",
          imageSize: 50,
          target: {},
          shownOnWhen: "alwaysVisible",
        },
      ],
      wrapperStyle: {
        title: "Popover",
        shownOnWhen: "alwaysVisible",
        column: 1,
        bgColor: "#ffffff",
        bgHoverColor: "#fa541c",
        textColor: "#000000",
        textColorHover: "#ffffff",
        isPreviewContent: false,
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
    if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
    } else {
      isShowContent(false);
    }
  };

  const handleSetValueWhenBlur = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "column") {
      setColumn(newValue);
    }
    handleChangeWrapperStyle(key, newValue);
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

      {isAddContent ? (
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

          <InputRangeWithNumber
            label="Kolom"
            value={column}
            onChange={(newValue) => {
              setColumn(newValue);
              handleChangeWrapperStyle("column", newValue);
            }}
            min={1}
            max={10}
            onBlur={() => handleSetValueWhenBlur(column, 1, 10, "column")}
          />

          <div
            style={{ gap: 20, width: "85%" }}
            className="d-flex align-items-center mb-3  "
          >
            <ColorPicker
              initialColor={bgColor}
              label="Background"
              onChange={(color) => {
                setBgColor(color);
                handleChangeWrapperStyle("bgColor", color);
              }}
              width="w-0"
            />
            <ColorPicker
              initialColor={textColor}
              label="Teks"
              onChange={(color) => {
                setTextColor(color);
                handleChangeWrapperStyle("textColor", color);
              }}
              width="w-0"
            />
          </div>

          <div
            style={{ gap: 20, width: "85%" }}
            className="d-flex align-items-center mb-3  "
          >
            <ColorPicker
              initialColor={bgHoverColor}
              label="Background (Hover)"
              onChange={(color) => {
                setBgHoverColor(color);
                handleChangeWrapperStyle("bgHoverColor", color);
              }}
              width="w-0"
            />
            <ColorPicker
              initialColor={textColorHover}
              label="Teks (Hover)"
              onChange={(color) => {
                setTextColorHover(color);
                handleChangeWrapperStyle("textColorHover", color);
              }}
              width="w-0"
            />
          </div>

          <SelectOptions
            label="Perlihatkan Ketika"
            options={shownOnWhenOptions}
            onChange={(selectedOption) => {
              setShownOnWhen(selectedOption);
              handleChangeWrapperStyle("shownOnWhen", selectedOption.value);
            }}
            value={shownOnWhen}
            width="50"
          />

          <div className="mb-3">
            <Checkbox
              label="Pratinjau Konten"
              id="isPreviewContentMenuNavbar"
              checked={isPreviewContent}
              onChange={(e) => {
                const { checked } = e.target;

                setIsPreviewContent(checked);
                handleChangeWrapperStyle("isPreviewContent", checked);
              }}
            />
          </div>

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

export default Menu;
