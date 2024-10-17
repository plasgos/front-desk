import React, { useCallback, useEffect, useState } from "react";
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

import { IoAdd } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import profilePicture from "../../../../../../../assets/profile.jpg";
import DesignTab from "./DesignTab";
import { UpdateContents } from "./UpdateContents";
import { UpdateShapes } from "./UpdateShapes";
import { columnTestimonyOptions } from "../../../../SelectOptions";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import { useRemoveSectionFrame } from "../../hooks/useRemoveSectionFrame";
import { useMoveSectionFrame } from "../../hooks/useMoveSectionFrame";
import { DraggableList } from "../../../../common/DraggableList";
import SelectOptions from "../../../../common/SelectOptions";
import InputRangeWithNumber from "../../../../common/InputRangeWithNumber";
import BackgroundTabFrame from "../../common/BackgroundTabFrame";
import { addNewSection } from "../../helper/addNewSection";
import { cancelNewSection } from "../../helper/cancelNewSection";
import { cancelAddSectionContent } from "../../helper/cancelAddSectionContent";
import { changeWrapperStyleFrame } from "../../helper/changeWrapperStyle";

const Testimony = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  handleSectionContentFocus,
  sectionId,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isAddShape, setIsAddShape] = useState(false);
  const [isEditingShape, setIsEditingShape] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [selectedSectionShape, setSelectedSectionShape] = useState({});
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);
  const [activeTab, setActiveTab] = useState("konten");

  const [selectedColumnTestimony, setSelectedColumnTestimony] = useState(
    columnTestimonyOptions[2]
  );

  const [setting, setSetting] = useState({});

  const [paddingTop, setPaddingTop] = useState(
    currentSection?.wrapperStyle?.paddingTop || 0
  );
  const [paddingBottom, setPaddingBottom] = useState(
    currentSection?.wrapperStyle?.paddingBottom || 0
  );

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  useEffect(() => {
    if (isEditingSection) {
      const columnOption = columnTestimonyOptions.find(
        (opt) => opt.value === currentSection?.wrapperStyle?.column
      );
      if (columnOption) {
        setSelectedColumnTestimony(columnOption);
      }
    }
  }, [currentSection, isEditingSection, previewSection]);

  const handleCancel = () => {
    const resetSectionContent = (key) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          return section.id === sectionId
            ? {
                ...section,
                content: section.content.map((contentItem) =>
                  contentItem.id === contentIdToCheck
                    ? {
                        ...contentItem,
                        [key]: contentItem[key].filter(
                          (_, index) => index !== contentItem[key].length - 1
                        ),
                      }
                    : contentItem
                ),
              }
            : section;
        })
      );
    };

    const resetEditingState = () => {
      setPreviewSection([...currentContentBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
      setIsAddShape(false);
      setIsEditingShape(false);
    };

    if (isAddContent) {
      resetSectionContent("content");
      setIsAddContent(false);
      setIsEditingContent(false);
      setActiveTab("konten");
    } else if (isAddShape) {
      resetSectionContent("shape");
      setIsAddShape(false);
      setIsEditingShape(false);
      setActiveTab("tirai");
    } else if (isEditingContent || isEditingShape) {
      resetEditingState();
      setActiveTab(isEditingContent ? "konten" : "tirai");
    } else if (isEditingSection) {
      resetEditingState();
      setPreviewSection([...sectionBeforeEdit]);
      isShowContent(false);
    } else {
      setIsAddContent(false);
      isShowContent(false);
      cancelNewSection(setPreviewSection, sectionId, setting.id);
      setActiveTab("konten");
    }
  };

  const handleConfirm = () => {
    if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setActiveTab("konten");
    } else if (isAddShape || isEditingShape) {
      setIsAddShape(false);
      setIsEditingShape(false);
      setActiveTab("tirai");
    } else {
      isShowContent(false);
    }
  };

  const moveSectionShape = useCallback(
    (sectionId, sectionFrameId, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.map((sectionFrame) => {
                if (sectionFrame.id === sectionFrameId) {
                  const updatedContent = [...sectionFrame.shape];
                  const draggedItem = updatedContent[dragIndex];
                  updatedContent.splice(dragIndex, 1);
                  updatedContent.splice(hoverIndex, 0, draggedItem);

                  return { ...sectionFrame, shape: updatedContent };
                }

                return sectionFrame;
              }),
            };
          }
          return section;
        });
      });

      return () => {};
    },
    [setPreviewSection]
  );

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);

    let payload = {
      id: uniqueId,
      name: "testimony",
      title: "Testimoni / Review",
      content: [
        {
          id: createUniqueID([]),
          name: "John Smith",
          image: profilePicture,
          content: "Super bagus sekali barangnya",
        },
        {
          id: createUniqueID([{ id: createUniqueID([]) }]),
          name: "Mozart",
          image: profilePicture,
          content: "Senang sekali memakai produk ini",
        },
        {
          id: createUniqueID([{ id: createUniqueID([]) }]),
          name: "Alexander the Great",
          image: profilePicture,
          content: "Pasti akan beli lagi",
        },
      ],
      shape: [],
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
      cardStyle: {
        bgColor: "#FFFFFF",
        starColor: "#FDD835",
        borderColor: "#EEEEEE",
        shadowCard: "tw-shadow",
      },
      profileStyle: {
        colorName: "#000000",
        fontSizeName: 18,
        fontStyle: "tw-font-semibold tw-italic",
        distanceName: 8,
        shadowImageName: "tw-shadow",
        borderPictColor: "#BDBDBD",
        imageSize: 40,
        borderRadiusImage: 70,
        borderWidthImage: 1,
      },
      contentStyle: {
        textAlign: "tw-text-left",
        fontSize: "tw-text-sm",
        distanceContent: 16,
      },
      starStyle: {
        icon: <FaStar />,
        amount: 5,
        size: 18,
        marginX: 4,
        margin: 6,
        position: "bottom-name",
      },
      wrapperStyle: {
        jusctifyContent: "tw-justify-center",
        flexDirection: "tw-flex-row",
        layout: "1",
        column: "tw-w-1/3",
        paddingX: 8,
        paddingTop: 0,
        paddingBottom: 0,
        borderRadius: 12,
        borderWidth: 2,
      },
    };

    addNewSection(setPreviewSection, sectionId, payload);

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
      setCurrentContentBeforeEdit([...previewSection]);
      setSelectedContent(section);
      setIsEditingContent(true);
    },
    [previewSection]
  );

  const editSectionShape = useCallback(
    (section) => {
      setCurrentContentBeforeEdit([...previewSection]);
      setSelectedSectionShape(section);
      setIsEditingShape(true);
    },
    [previewSection]
  );

  const removeSectionShape = useCallback(
    (sectionId, sectionFrameId, contentId) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.map((sectionFrame) =>
                sectionFrame.id === sectionFrameId
                  ? {
                      ...sectionFrame,
                      shape: sectionFrame.shape.filter(
                        (contentItem) => contentItem.id !== contentId
                      ),
                    }
                  : sectionFrame
              ),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const removeSection = useRemoveSectionFrame(setPreviewSection);
  const moveSection = useMoveSectionFrame(setPreviewSection);

  const renderSection = useCallback(
    (section) => {
      if (section.id !== sectionId) return null;

      const selectedSectionFrame = section.content.find(
        (content) => content.id === contentIdToCheck
      );
      if (!selectedSectionFrame) return null;

      return selectedSectionFrame?.content.map((contentItem, contentIndex) => (
        <div key={contentItem.id}>
          <DraggableList
            key={contentItem.id || contentIndex}
            index={contentIndex}
            id={contentItem.id}
            showInfoText={contentItem.name}
            moveSection={(dragIndex, hoverIndex) =>
              moveSection(section.id, contentIdToCheck, dragIndex, hoverIndex)
            }
            editSection={() => editSection(contentItem)}
            removeSection={() =>
              removeSection(
                section.id,
                contentIdToCheck,
                contentItem.id,
                contentIndex
              )
            }
            hiddenFocus={true}
          />
        </div>
      ));
    },
    [sectionId, contentIdToCheck, moveSection, editSection, removeSection]
  );

  const renderSectionShape = useCallback(
    (section) => {
      if (section.id !== sectionId) return null;

      const selectedSectionFrame = section.content.find(
        (content) => content.id === contentIdToCheck
      );
      if (!selectedSectionFrame) return null;

      return selectedSectionFrame?.shape.map((contentItem, contentIndex) => (
        <div key={contentItem.id}>
          <DraggableList
            key={contentItem.id || contentIndex}
            index={contentIndex}
            id={contentItem.id}
            showInfoText={`Tirai ${contentItem.position?.label}`}
            moveSection={(dragIndex, hoverIndex) =>
              moveSectionShape(
                section.id,
                contentIdToCheck,
                dragIndex,
                hoverIndex
              )
            }
            editSection={() => editSectionShape(contentItem)}
            removeSection={() =>
              removeSectionShape(
                section.id,
                contentIdToCheck,
                contentItem.id,
                contentIndex
              )
            }
            hiddenFocus={true}
          />
        </div>
      ));
    },
    [
      sectionId,
      contentIdToCheck,
      moveSectionShape,
      editSectionShape,
      removeSectionShape,
    ]
  );

  const handleUpdateSectionWrapperStyle = (key, value) => {
    const newValue = {
      [key]: value,
    };
    changeWrapperStyleFrame(
      setPreviewSection,
      sectionId,
      currentSection.id,
      newValue
    );
  };

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, key) => {
    const newValue = Math.min(Math.max(value, min), max);
    if (key === "paddingTop") {
      setPaddingTop(newValue);
    } else if (key === "paddingBottom") {
      setPaddingBottom(newValue);
    }
    handleUpdateSectionWrapperStyle(key, newValue);
  };

  return (
    <div>
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
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

            {isAddContent ? (
              <CTabs>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <UpdateContents
                    sectionId={sectionId}
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={isEditingSection ? currentSection : setting}
                    setPreviewSection={setPreviewSection}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditingContent ? (
              <CTabs>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <UpdateContents
                    sectionId={sectionId}
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={selectedContent}
                    setPreviewSection={setPreviewSection}
                    isEditingContent={true}
                  />
                </CTabContent>
              </CTabs>
            ) : isAddShape ? (
              <CTabs>
                <CTabContent
                  style={{
                    height: 340,
                    paddingRight: 5,
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                  className="pt-3"
                >
                  <UpdateShapes
                    sectionId={sectionId}
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentShape={[]}
                    setPreviewSection={setPreviewSection}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditingShape ? (
              <CTabs>
                <CTabContent
                  style={{
                    height: 340,
                    paddingRight: 5,
                    overflowY: "auto",
                  }}
                  className="pt-3"
                >
                  <UpdateShapes
                    sectionId={sectionId}
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentShape={selectedSectionShape}
                    setPreviewSection={setPreviewSection}
                    isEditingShape={true}
                  />
                </CTabContent>
              </CTabs>
            ) : (
              <CTabs activeTab={activeTab}>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="konten">Konten</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="desain">Desain</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="tirai">Tirai</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="wadah">Wadah</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <CTabPane className="p-1" data-tab="konten">
                    {!isAddContent && !isEditingContent && (
                      <>
                        <div
                          style={{ gap: 10 }}
                          className="d-flex align-items-center "
                        >
                          <SelectOptions
                            label="Kolom"
                            options={columnTestimonyOptions}
                            onChange={(selectedOption) => {
                              setSelectedColumnTestimony(selectedOption);
                              handleUpdateSectionWrapperStyle(
                                "column",
                                selectedOption.value
                              );
                            }}
                            value={selectedColumnTestimony}
                            width="50"
                          />
                        </div>
                        <div>
                          {previewSection
                            .filter((section) => section.id === sectionId)
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
                    style={{ overflowX: "hidden" }}
                    className="p-1"
                    data-tab="desain"
                  >
                    {Object.keys(isEditingSection ? currentSection : setting)
                      .length > 0 ? (
                      <DesignTab
                        sectionId={sectionId}
                        currentSection={
                          isEditingSection ? currentSection : setting
                        }
                        setPreviewSection={setPreviewSection}
                        selectedColum={selectedColumnTestimony}
                        setSelectedColum={(value) =>
                          setSelectedColumnTestimony(value)
                        }
                        paddingTop={paddingTop}
                        setPaddingTop={(value) => setPaddingTop(value)}
                        paddingBottom={paddingBottom}
                        setPaddingBottom={(value) => setPaddingBottom(value)}
                        isEditingDesignTab={isEditingSection ? true : false}
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden" }}
                    className="p-1"
                    data-tab="tirai"
                  >
                    <div>
                      <InputRangeWithNumber
                        label="Ruang Pengisi Atas"
                        value={paddingTop}
                        onChange={(newValue) => {
                          setPaddingTop(newValue);
                          handleUpdateSectionWrapperStyle(
                            "paddingTop",
                            newValue
                          );
                        }}
                        min={0}
                        max={120}
                        onBlur={() =>
                          handleSetValueWhenBlurWrapperStyle(
                            paddingTop,
                            0,
                            120,
                            "paddingTop"
                          )
                        }
                      />
                      <InputRangeWithNumber
                        label="Ruang Pengisi Bawah"
                        value={paddingBottom}
                        onChange={(newValue) => {
                          setPaddingBottom(newValue);
                          handleUpdateSectionWrapperStyle(
                            "paddingBottom",
                            newValue
                          );
                        }}
                        min={0}
                        max={120}
                        onBlur={() =>
                          handleSetValueWhenBlurWrapperStyle(
                            paddingBottom,
                            0,
                            120,
                            "paddingBottom"
                          )
                        }
                      />
                    </div>

                    <div>
                      {!isAddShape && !isEditingShape && (
                        <>
                          <div>
                            {previewSection
                              .filter((section) => section.id === sectionId)
                              .map((section, i) =>
                                renderSectionShape(section, i)
                              )}
                          </div>

                          <CCard
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsAddShape(true)}
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
                    </div>
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden", height: "100%" }}
                    className="p-1"
                    data-tab="wadah"
                  >
                    <BackgroundTabFrame
                      sectionId={sectionId}
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

export default Testimony;
