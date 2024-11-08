import {
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { createUniqueID } from "../../../../../lib/unique-id";
import BackgroundTab from "../../common/BackgroundTab";
import Confirmation from "../../common/Confirmation";
import { DraggableList } from "../../common/DraggableList";
import SelectOptions from "../../common/SelectOptions";
import { shadowOptions } from "../../SelectOptions";
import UpdateContent from "./UpdateContent";

export const distanceOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export const flexOptions = [
  { value: "tw-flex-row", label: "Horizontal" },
  { value: "tw-flex-col", label: "Vertical" },
];

const FloatingButton = ({
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

  const [selectedDistance, setSelectedDistance] = useState(distanceOptions[2]);

  const [selectedFlex, setSelectedFlex] = useState(flexOptions[0]);

  const [shadow, setShadow] = useState(shadowOptions[2]);

  const [isListIconVisible, setIsListIconVisible] = useState(false);

  const handleChangeWrapperStyle = (key, selectedOption) => {
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
                [key]: selectedOption.value,
              },
            }
          : item;
      })
    );
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
              showInfoText={contentItem.content?.title}
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
      name: "floating-button",
      title: "Floating Button",
      content: [
        {
          id: createUniqueID([]),
          content: {
            title: "Please Click Me",
            style: {
              btnColor: "#2196F3",
              textColor: "#FFFFFF",
              variant: "fill",
              rounded: "tw-rounded",
              buttonSize: "md",
              shadow: "tw-shadow",
              icon: {},
              image: "",
            },
          },
          target: {},
        },
        {
          id: createUniqueID([{ id: createUniqueID([]) }]),
          content: {
            title: "Dont't Click Me",
            style: {
              btnColor: "#EF5350",
              textColor: "#FFFFFF",
              variant: "fill",
              rounded: "tw-rounded",
              buttonSize: "md",
              shadow: "tw-shadow",
              icon: {},
              image: "",
            },
          },
          target: {},
        },
      ],
      wrapperStyle: {
        flexDirection: "tw-flex-row",
        marginX: "2",
        shadow: "tw-shadow",
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
        <Confirmation
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
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
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="konten">Konten</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="wadah">Wadah</CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent
            style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
            className="p-3"
          >
            <CTabPane className="p-1" data-tab="konten">
              {!isAddContent && !isEditingContent && (
                <>
                  <div
                    style={{ gap: 10 }}
                    className="d-flex align-items-center "
                  >
                    <SelectOptions
                      label="Barisan"
                      options={flexOptions}
                      onChange={(selectedOption) => {
                        setSelectedFlex(selectedOption);
                        handleChangeWrapperStyle(
                          "flexDirection",
                          selectedOption
                        );
                      }}
                      value={selectedFlex}
                      width="50"
                    />

                    <SelectOptions
                      label="Jarak"
                      options={distanceOptions}
                      onChange={(selectedOption) => {
                        setSelectedDistance(selectedOption);
                        handleChangeWrapperStyle("marginX", selectedOption);
                      }}
                      value={selectedDistance}
                      width="50"
                    />
                  </div>

                  <SelectOptions
                    label="Bayangan"
                    options={shadowOptions}
                    onChange={(selectedOption) => {
                      setShadow(selectedOption);
                      handleChangeWrapperStyle("shadow", selectedOption);
                    }}
                    value={shadow}
                    width="50"
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
            <CTabPane className="p-1" data-tab="wadah">
              <BackgroundTab
                currentSection={isEditingSection ? currentSection : setting}
                setPreviewSection={setPreviewFloatingSection}
                type={isEditingSection ? "edit" : "add"}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default FloatingButton;
