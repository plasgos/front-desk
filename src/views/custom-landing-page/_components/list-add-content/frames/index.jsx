import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";

import { IoAdd } from "react-icons/io5";
import { createUniqueID } from "../../../../../lib/unique-id";

import ListContent from "..";
import AnimationControl from "../../common/AnimationControl";
import BackgroundTab from "../../common/BackgroundTab";
import { useRenderEditSection } from "../../hooks/useRenderEditSection";
import { ListSectionContent } from "../../ListSectionContent";
import FrameControl from "./FrameControl";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { useMoveSection } from "../../../../../hooks/useMoveSection";

const newId = () => Math.random().toString(36).substr(2, 9);

const background = {
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
  background,
};

const Frames = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  handleSectionContentFocus,
  previewFloatingSection,
  setPreviewFloatingSection,
  handleColumnFocus,
}) => {
  const [frameSections, setFrameSections] = useState(
    isEditingSection ? [...(currentSection?.content || [])] : [initialSection]
  );
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const [selectedSection, setSelectedSection] = useState({});

  const [currentSectionBeforeEdit, setCurrentSectionBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  const [frameSectionBeforeEdit, setFrameSectionBeforeEdit] = useState([]);

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  useEffect(() => {
    const section = previewSection.find((section) => section.id === setting.id);

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id]);

  useEffect(() => {
    setPreviewSection((prevSections) =>
      prevSections.map((section) =>
        section.id === contentIdToCheck
          ? { ...section, content: [...frameSections] } // Update konten jika ada perubahan
          : section
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameSections]);

  const handleCancel = () => {
    if (isEditingContent) {
      setPreviewSection([...currentSectionBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isEditingSection) {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection((prevSections) =>
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

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);

    let payload = {
      id: uniqueId,
      name: "frames",
      title: "Bingkai",
      content: frameSections,
      wrapperStyle: {
        bgType: "gradient",
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        paddingY: 120,
        paddingTop: 0,
        paddingBottom: 0,
        paddingType: "equal",
        direction: "to right",
        fromColor: "#FF6F61",
        toColor: "#6B5B95",
        isRevert: false,
        pattern: "",
        width: 400,
        rounded: 40,
        rotation: 0,
        shadow: "tw-shadow-lg",
      },
      background,
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
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
      setCurrentSectionBeforeEdit([...previewSection]);
      setFrameSectionBeforeEdit([...frameSections]);
      setSelectedSection(section);
      setIsEditingContent(true);
    },
    [frameSections, previewSection]
  );

  const removeFrameSection = useCallback(
    (sectionId) => {
      setFrameSections((prevSections) =>
        prevSections.filter((section) => section.id !== sectionId)
      );
    },
    [setFrameSections]
  );

  const removeSection = useRemoveSection(setPreviewSection);
  const moveSection = useMoveSection(setPreviewSection);

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
              moveSection={(dragIndex, hoverIndex) => {
                moveSection(section.id, dragIndex, hoverIndex);
              }}
              editSection={() => editSection(contentItem)}
              removeSection={() => {
                removeSection(section.id, contentIndex);
                removeFrameSection(contentItem.id);
              }}
              focusContent={() => handleSectionContentFocus(contentItem.id)}
            />
          ))}
        </div>
      );
    },
    [
      moveSection,
      removeFrameSection,
      editSection,
      removeSection,
      handleSectionContentFocus,
    ]
  );

  const frameSection = true;

  const { renderEditSection } = useRenderEditSection({
    previewSection: frameSections,
    setPreviewSection: setFrameSections,
    editing: selectedSection,
    setEditing: setIsEditingContent,
    sectionBeforeEdit: frameSectionBeforeEdit,
    handleSectionContentFocus,
    isPopUpSection: frameSection,
    handleColumnFocus,
  });

  return (
    <div>
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
            {!isAddContent && !isEditingContent && (
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
              <CTabs>
                <CTabContent
                  style={{
                    height: !isAddContent && !isEditingContent && 380,
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <ListContent
                    previewSection={frameSections}
                    setPreviewSection={(value) => setFrameSections(value)}
                    isShowContent={(value) => setIsAddContent(value)}
                    handleSectionContentFocus={handleSectionContentFocus}
                    previewFloatingSection={previewFloatingSection}
                    setPreviewFloatingSection={(value) =>
                      setPreviewFloatingSection(value)
                    }
                    handleColumnFocus={handleColumnFocus}
                    isPopUpSection={true}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditingContent ? (
              <CTabs>
                <CTabContent
                  style={{
                    height: !isAddContent && !isEditingContent && 380,
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <div>
                    {previewSection
                      .filter((section) =>
                        isEditingSection
                          ? section.id === currentSection.id
                          : section.id === setting.id
                      )
                      .map((section) =>
                        section.content.map((content) =>
                          renderEditSection(content)
                        )
                      )}
                  </div>
                </CTabContent>
              </CTabs>
            ) : (
              <CTabs activeTab="content">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="content">Konten</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="frame">Bingkai</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="animation">Animasi</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="background">Background</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{
                    height: "340px",
                    paddingRight: 5,
                    overflowY: "auto",
                  }}
                  className="pt-3"
                >
                  <CTabPane className="p-1" data-tab="content">
                    {!isAddContent && !isEditingContent && (
                      <>
                        <div>
                          {previewSection
                            .filter((section) =>
                              isEditingSection
                                ? section.id === currentSection.id
                                : section.id === setting.id
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

                  <CTabPane className="p-1" data-tab="frame">
                    <FrameControl
                      setPreviewSection={setPreviewSection}
                      currentSection={
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
                      }
                    />
                  </CTabPane>

                  <CTabPane className="p-1" data-tab="animation">
                    <AnimationControl
                      label=""
                      currentSection={
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
                      }
                      setPreviewSection={setPreviewSection}
                    />
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden", height: "100%" }}
                    className="p-1"
                    data-tab="background"
                  >
                    <BackgroundTab
                      currentSection={
                        isEditingSection ? currentSection : setting
                      }
                      setPreviewSection={setPreviewSection}
                      type={isEditingSection ? "edit" : "add"}
                    />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            )}
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default Frames;
