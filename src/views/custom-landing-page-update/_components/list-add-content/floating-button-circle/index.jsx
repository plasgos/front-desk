import {
  CButton,
  CCard,
  CCardBody,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { createUniqueID } from "../../../../../lib/unique-id";
import { DraggableList } from "../../common/DraggableList";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import SelectOptions from "../../common/SelectOptions";
import UpdateContent from "./UpdateContent";

export const distanceOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

const FloatingButtonCircle = ({
  currentSection,
  isShowContent,
  isEditingSection,
  sectionBeforeEdit,
  previewFloatingSection,
  setPreviewFloatingSection,
  handleSectionContentFocus,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const [selectedDistance, setSelectedDistance] = useState(
    distanceOptions.find(
      (opt) => opt.value === currentSection?.wrapperStyle?.distance
    ) || distanceOptions[1]
  );

  const [position, setPosition] = useState(
    currentSection?.wrapperStyle?.position || 0
  );

  const [isListIconVisible, setIsListIconVisible] = useState(false);

  //   useEffect(() => {
  //     if (isEditingSection) {
  //       const currentDistance = distanceOptions.find(
  //         (opt) => opt.value === currentSection?.wrapperStyle?.distance
  //       );

  //       if (currentDistance) {
  //         setSelectedDistance(currentDistance);
  //       }
  //     }
  //   }, [currentSection, isEditingSection]);

  const handleChangeWrapperStyle = (key, value) => {
    setPreviewFloatingSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : setting.id;

        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                [key]: value,
              },
            }
          : item;
      })
    );
  };

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "position") {
      setPosition(newValue);
    }
    handleChangeWrapperStyle(key, newValue);
  };

  const handleCancel = () => {
    if (isAddContent && !isListIconVisible) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewFloatingSection((prevSections) =>
        prevSections.map((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id === contentIdToCheck
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section;
        })
      );
    } else if (isEditingContent && !isListIconVisible) {
      setPreviewFloatingSection([...currentContentBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isEditingSection) {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewFloatingSection([...sectionBeforeEdit]);
    } else {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewFloatingSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    if (isListIconVisible) {
      setIsListIconVisible(false);
    } else if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
    } else {
      isShowContent(false);
    }
  };

  const editSection = useCallback(
    (section) => {
      setCurrentContentBeforeEdit([...previewFloatingSection]);
      setSelectedContent(section);
      setIsEditingContent(true);
    },
    [previewFloatingSection]
  );

  const removeSection = useRemoveSection(setPreviewFloatingSection);
  const moveSection = useMoveSection(setPreviewFloatingSection);

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showIcon={contentItem?.icon}
              showThumbnail={contentItem?.image}
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
              handleFocus={() => handleSectionContentFocus(contentItem.id)}
            />
          ))}
        </div>
      );
    },
    [moveSection, editSection, removeSection, handleSectionContentFocus]
  );

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewFloatingSection);
    let payload = {
      id: uniqueId,
      name: "floating-button-circle",
      title: "Floating Button Circle",
      content: [
        {
          id: createUniqueID([]),
          btnColor: "#2196F3",
          buttonSize: "md",
          shadow: "tw-shadow",
          icon: { prefix: "fab", iconName: "whatsapp" },
          iconColor: "#ffffff",
          image: "",
          target: {},
        },
      ],
      wrapperStyle: {
        distance: "2",
        position: 0,
      },
      background: {
        bgType: undefined,
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        paddingY: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingType: "equal",
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
      },
    };

    setPreviewFloatingSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      onAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  return (
    <div>
      {!isListIconVisible && (
        <div className="d-flex justify-content-end align-items-center border-bottom p-2">
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
      )}

      {isAddContent ? (
        <UpdateContent
          idSection={isEditingSection ? currentSection.id : setting.id}
          currentContent={isEditingSection ? currentSection : setting}
          setPreviewSection={setPreviewFloatingSection}
          isListIconVisible={isListIconVisible}
          setIsListIconVisible={setIsListIconVisible}
        />
      ) : isEditingContent ? (
        <UpdateContent
          idSection={isEditingSection ? currentSection.id : setting.id}
          setPreviewSection={setPreviewFloatingSection}
          isListIconVisible={isListIconVisible}
          setIsListIconVisible={setIsListIconVisible}
          currentContent={selectedContent}
          isEditingContent={true}
        />
      ) : (
        <CTabs activeTab="konten">
          <CTabContent style={{ overflowY: "auto" }} className="p-3">
            <CTabPane className="p-1" data-tab="konten">
              {!isAddContent && !isEditingContent && (
                <>
                  <div
                    style={{ gap: 10 }}
                    className="d-flex align-items-center "
                  >
                    <SelectOptions
                      label="Jarak"
                      options={distanceOptions}
                      onChange={(selectedOption) => {
                        setSelectedDistance(selectedOption);
                        handleChangeWrapperStyle(
                          "distance",
                          selectedOption.value
                        );
                      }}
                      value={selectedDistance}
                      width="50"
                    />
                  </div>

                  <InputRangeWithNumber
                    label="Jarak"
                    value={position}
                    onChange={(newValue) => {
                      setPosition(newValue);
                      handleChangeWrapperStyle("position", newValue);
                    }}
                    min={0}
                    max={600}
                    onBlur={() =>
                      handleSetValueWhenBlurWrapperStyle(
                        position,
                        0,
                        600,
                        "position"
                      )
                    }
                  />

                  <div>
                    {previewFloatingSection
                      .filter((section) =>
                        isEditingSection
                          ? section.id === currentSection.id
                          : section.id === setting.id
                      )
                      .map((section, i) => renderSection(section, i))}
                  </div>
                  <CCard
                    style={{ cursor: "pointer", marginBottom: 60 }}
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
                </>
              )}
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default FloatingButtonCircle;
