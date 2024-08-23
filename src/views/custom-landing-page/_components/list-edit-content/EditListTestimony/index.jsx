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
import { columnTestimonyOptions } from "../../SelectOptions";

import AddTestimony from "../../list-add-content/testimony/AddTestimony";
import EditTestimony from "../../list-add-content/testimony/EditTestimony";
import SelectOptions from "../../common/SelectOptions";
import DesignTabEdit from "./DesignTabEdit";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import EditShape from "../../list-add-content/testimony/EditShape";
import AddShape from "../../list-add-content/testimony/AddShape";

import BackgroundTab from "../../list-add-content/testimony/BackgroundTab";
import { DraggableList } from "../../common/DraggableList";

const EditListTestimony = ({
  currentSection,
  previewSection,
  setPreviewSection,
  isShowContent,
  sectionBeforeEdit,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddShape, setIsAddShape] = useState(false);
  const [isEditingShape, setIsEditingShape] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const [beforeEditPrevSection, setBeforeEditPrevSection] = useState([]);
  const [selectedColumnTestimony, setSelectedColumnTestimony] =
    useState(undefined);
  const [activeTab, setActiveTab] = useState("konten");
  const [selectedSectionShape, setSelectedSectionShape] = useState({});

  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);

  const handleChangeColumnTestimony = (selectedOptionValue) => {
    setSelectedColumnTestimony(selectedOptionValue);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                column: selectedOptionValue.value,
              },
            }
          : item
      )
    );
  };

  useEffect(() => {
    const selectedSectionToEdit = previewSection.find(
      (section) => String(section.id) === currentSection.id
    );
    if (selectedSectionToEdit) {
      const columnOption = columnTestimonyOptions.find(
        (opt) => opt.value === selectedSectionToEdit.wrapperStyle?.column
      );
      if (columnOption) {
        setSelectedColumnTestimony(columnOption);
      }
    }
  }, [currentSection.id, previewSection]);

  const handelCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditing(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === currentSection.id
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section
        )
      );
      setActiveTab("konten");
    } else if (isAddShape) {
      setIsAddShape(false);
      setIsEditingShape(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === currentSection.id
            ? {
                ...section,
                shape: section.shape.slice(0, -1),
              }
            : section
        )
      );
      setActiveTab("tirai");
    } else if (isEditing) {
      setPreviewSection([...beforeEditPrevSection]);
      setIsAddContent(false);
      setIsEditing(false);
      setActiveTab("konten");
    } else if (isEditingShape) {
      setPreviewSection([...beforeEditPrevSection]);
      setIsAddShape(false);
      setIsEditingShape(false);
      setActiveTab("tirai");
    } else {
      setIsAddContent(false);
      setActiveTab("konten");
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    }
  };

  const handelConfirm = () => {
    if (isAddContent || isEditing) {
      setIsAddContent(false);
      setIsEditing(false);
      setActiveTab("konten");
    } else if (isAddShape || isEditingShape) {
      setIsAddShape(false);
      setIsEditingShape(false);
      setActiveTab("tirai");
    } else {
      isShowContent(false);
    }
  };

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const moveSection = useCallback(
    (dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === "testimony") {
            const updatedContent = [...section.content];
            const draggedItem = updatedContent[dragIndex];
            updatedContent.splice(dragIndex, 1);
            updatedContent.splice(hoverIndex, 0, draggedItem);
            return { ...section, content: updatedContent };
          }
          return section;
        });
      });

      return () => {};
    },
    [setPreviewSection]
  );

  const moveSectionShape = useCallback(
    (dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === "testimony") {
            const updatedContent = [...section.shape];
            const draggedItem = updatedContent[dragIndex];
            updatedContent.splice(dragIndex, 1);
            updatedContent.splice(hoverIndex, 0, draggedItem);
            return { ...section, shape: updatedContent };
          }
          return section;
        });
      });

      return () => {};
    },
    [setPreviewSection]
  );

  const editSection = useCallback(
    (section) => {
      setBeforeEditPrevSection([...previewSection]);
      setSelectedSection(section);
      setIsEditing(true);
    },
    [previewSection]
  );

  const editSectionShape = useCallback(
    (section) => {
      setBeforeEditPrevSection([...previewSection]);
      setSelectedSectionShape(section);
      setIsEditingShape(true);
    },
    [previewSection]
  );

  const removeSection = useCallback(
    (sectionId, contentIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.filter((_, i) => i !== contentIndex),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const removeSectionShape = useCallback(
    (sectionId, contentIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              shape: section.shape.filter((_, i) => i !== contentIndex),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={contentItem.name}
              moveSection={moveSection}
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [moveSection, editSection, removeSection]
  );

  const renderSectionShape = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.shape.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={`Tirai ${contentItem.position?.label}`}
              moveSection={moveSectionShape}
              editSection={() => editSectionShape(contentItem)}
              removeSection={() => removeSectionShape(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [editSectionShape, moveSectionShape, removeSectionShape]
  );

  const handleUpdateSectionWrapperStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === currentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                [key]: value,
              },
            }
          : item
      )
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
                  onClick={handelCancel}
                  color="primary"
                  variant="outline"
                  className="mx-2"
                >
                  Batal
                </CButton>

                <CButton onClick={handelConfirm} color="primary">
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
                  <AddTestimony
                    idSection={currentSection.id}
                    sections={previewSection}
                    setPreviewSection={setPreviewSection}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditing ? (
              <CTabs>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <EditTestimony
                    idSection={currentSection.id}
                    selectedSectionToEdit={selectedSection}
                    setPreviewSection={setPreviewSection}
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
                  <AddShape
                    idSection={currentSection.id}
                    exitingShape={[]}
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
                  <EditShape
                    idSection={currentSection.id}
                    selectedSectionToEdit={selectedSectionShape}
                    setPreviewSection={setPreviewSection}
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
                    {!isAddContent && !isEditing && (
                      <>
                        <div
                          style={{ gap: 10 }}
                          className="d-flex align-items-center "
                        >
                          <SelectOptions
                            label="Kolom"
                            options={columnTestimonyOptions}
                            onChange={handleChangeColumnTestimony}
                            value={selectedColumnTestimony}
                            width="50"
                          />
                        </div>
                        <div>
                          {previewSection
                            .filter(
                              (section) => section.id === currentSection.id
                            )
                            .map((section, i) => renderSection(section, i))}
                        </div>
                        <CCard
                          style={{ cursor: "pointer" }}
                          onClick={handleAddContent}
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
                    {Object.keys(currentSection).length > 0 ? (
                      <DesignTabEdit
                        currentSection={currentSection}
                        setPreviewSection={setPreviewSection}
                        selectedColum={selectedColumnTestimony}
                        setSelectedColum={(value) =>
                          setSelectedColumnTestimony(value)
                        }
                        paddingTop={paddingTop}
                        setPaddingTop={(value) => setPaddingTop(value)}
                        paddingBottom={paddingBottom}
                        setPaddingBottom={(value) => setPaddingBottom(value)}
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
                              .filter(
                                (section) => section.id === currentSection.id
                              )
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
                    <BackgroundTab
                      currentSection={currentSection}
                      setPreviewSection={setPreviewSection}
                      type="edit"
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

export default EditListTestimony;
