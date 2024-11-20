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
import { createUniqueID } from "../../../../../lib/unique-id";

import ListContent from "..";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import AnimationControl from "../../common/AnimationControl";
import BackgroundTab from "../../common/BackgroundTab";
import Confirmation from "../../common/Confirmation";
import SelectOptions from "../../common/SelectOptions";
import { useRenderEditSection } from "../../hooks/useRenderEditSection";
import { ListSectionContent } from "../../ListSectionContent";
import { shadowOptions } from "../../SelectOptions";

const positionOptions = [
  { value: "top", label: "Atas" },
  { value: "bottom", label: "Bawah" },
];

const newId = () => Math.random().toString(36).substr(2, 9);

const background = {
  bgType: "color",
  bgColor: "#ffffff",
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
};

const initialSection = {
  id: newId(),
  name: "text",
  title: "Teks",
  content: {
    editorHtml: "Text 1",
    style: {
      textAlign: "tw-text-center",
      color: "#face12",
    },
  },
  animation: {
    type: undefined,
    duration: 1,
    isReplay: false,
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

const FloatingContent = ({
  currentSection,
  isShowContent,
  isEditingSection,
  sectionBeforeEdit,
  previewFloatingSection,
  setPreviewFloatingSection,
  handleSectionContentFocus,
  handleColumnFocus,
  isMultiColumn,
}) => {
  const [popUpSections, setPopUpSections] = useState(
    isEditingSection ? [...(currentSection?.content || [])] : [initialSection]
  );
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const [selectedSection, setSelectedSection] = useState({});

  const [currentSectionBeforeEdit, setCurrentSectionBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const [popUpSectionBeforeEdit, setPopUpSectionBeforeEdit] = useState([]);

  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  const [position, setPosition] = useState(positionOptions[1]);

  const [shadow, setShadow] = useState(shadowOptions[3]);

  useEffect(() => {
    if (isEditingSection) {
      const currentPosition = positionOptions.find(
        (opt) => opt.value === currentSection?.wrapperStyle?.position
      );

      if (currentPosition) {
        setPosition(currentPosition);
      }

      const currentShadow = shadowOptions.find(
        (opt) => opt.value === currentSection?.wrapperStyle?.shadow
      );
      if (currentShadow) {
        setShadow(currentShadow);
      }
    }
  }, [currentSection, isEditingSection]);

  const handleChangeWrapperStyle = (key, value) => {
    setPreviewFloatingSection((arr) =>
      arr.map((section) =>
        section.id === contentIdToCheck
          ? {
              ...section,
              wrapperStyle: {
                ...section.wrapperStyle,
                [key]: value,
              },
            }
          : section
      )
    );
  };

  useEffect(() => {
    const section = previewFloatingSection.find(
      (section) => section.id === setting.id
    );

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewFloatingSection, setting.id]);

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  const handleCancel = () => {
    if (isEditingContent) {
      setPreviewFloatingSection([...currentSectionBeforeEdit]);
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
    if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
    } else {
      isShowContent(false);
    }
  };

  useEffect(() => {
    setPreviewFloatingSection((prevSections) =>
      prevSections.map((section) =>
        section.id === contentIdToCheck
          ? { ...section, content: [...popUpSections] } // Update konten jika ada perubahan
          : section
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popUpSections]);

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewFloatingSection);
    const id = isMultiColumn
      ? `multi-column-${uniqueId}`
      : `parent-${uniqueId}`;
    let payload = {
      id,
      name: "floating-content",
      title: "Floating Content",
      content: popUpSections,
      wrapperStyle: {
        position: "bottom",
        shadow: "tw-shadow-md",
      },
      background,
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

  const editSection = useCallback(
    (section) => {
      setCurrentSectionBeforeEdit([...previewFloatingSection]);
      setPopUpSectionBeforeEdit([...popUpSections]);
      setSelectedSection(section);
      setIsEditingContent(true);
    },
    [popUpSections, previewFloatingSection]
  );

  const removeSection = useRemoveSection(setPreviewFloatingSection);

  const removePopUpSection = useCallback(
    (sectionId) => {
      setPopUpSections((prevSections) =>
        prevSections.filter((section) => section.id !== sectionId)
      );
    },
    [setPopUpSections]
  );

  const moveSection = useMoveSection(setPreviewFloatingSection);

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <ListSectionContent
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              section={contentItem}
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => {
                removeSection(section.id, contentIndex);
                removePopUpSection(contentItem.id);
              }}
              focusContent={() => handleSectionContentFocus(contentItem.id)}
            />
          ))}
        </div>
      );
    },
    [
      moveSection,
      editSection,
      removeSection,
      removePopUpSection,
      handleSectionContentFocus,
    ]
  );

  const popUpsection = true;

  const { renderEditSection } = useRenderEditSection({
    previewSection: popUpSections,
    setPreviewSection: setPopUpSections,
    editing: selectedSection,
    setEditing: setIsEditingContent,
    sectionBeforeEdit: popUpSectionBeforeEdit,
    handleSectionContentFocus,
    isPopUpSection: popUpsection,
    handleColumnFocus,
  });

  return (
    <div>
      {!isAddContent && !isEditingContent && (
        <Confirmation
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}

      {isAddContent ? (
        <ListContent
          previewSection={popUpSections}
          setPreviewSection={(value) => setPopUpSections(value)}
          isShowContent={(value) => setIsAddContent(value)}
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={(value) =>
            setPreviewFloatingSection(value)
          }
          handleSectionContentFocus={handleSectionContentFocus}
          handleColumnFocus={handleColumnFocus}
          isPopUpSection={true}
        />
      ) : isEditingContent ? (
        <div>
          {previewFloatingSection
            .filter((section) =>
              isEditingSection
                ? section.id === currentSection.id
                : section.id === setting.id
            )
            .map((section) =>
              section.content.map((content) => renderEditSection(content))
            )}
        </div>
      ) : (
        <CTabs activeTab="content">
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="content">Konten</CNavLink>
            </CNavItem>

            <CNavItem>
              <CNavLink data-tab="animation">Animasi</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="background">Background</CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent
            className="p-3"
            style={{
              overflowY: "auto",
              height: "calc(100vh - 110px)",
            }}
          >
            <CTabPane className="p-1" data-tab="content">
              {!isAddContent && !isEditingContent && (
                <>
                  <div
                    style={{ gap: 10 }}
                    className="d-flex align-items-center"
                  >
                    <SelectOptions
                      label="Posisi"
                      options={positionOptions}
                      value={position}
                      onChange={(selectedOption) => {
                        setPosition(selectedOption);
                        handleChangeWrapperStyle(
                          "position",
                          selectedOption.value
                        );
                      }}
                    />

                    <SelectOptions
                      label="Bayangan"
                      options={shadowOptions}
                      value={shadow}
                      onChange={(selectedOption) => {
                        setShadow(selectedOption);
                        handleChangeWrapperStyle(
                          "shadow",
                          selectedOption.value
                        );
                      }}
                    />
                  </div>

                  <div>
                    {previewFloatingSection
                      .filter((section) =>
                        isEditingSection
                          ? section.id === currentSection.id
                          : section.id === selectedCurrentSection.id
                      )
                      .map((section, i) => renderSection(section, i))}
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
                </>
              )}
            </CTabPane>

            <CTabPane
              style={{ height: "80vh" }}
              className="p-1"
              data-tab="animation"
            >
              <AnimationControl
                label=""
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                setPreviewSection={setPreviewFloatingSection}
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="background">
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

export default FloatingContent;
