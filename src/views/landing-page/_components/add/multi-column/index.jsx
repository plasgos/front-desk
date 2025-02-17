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
import { useDispatch, useSelector } from "react-redux";
import { createUniqueID } from "../../../../../lib/unique-id";
import {
  setIsAddColumn,
  setIsAddColumnSection,
  setIsEditingColumn,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../modules/custom-landing-page/reducer";
import BackgroundTab from "../../common/BackgroundTab";
import { DraggableList } from "../../common/DraggableList";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import SelectOptions from "../../common/SelectOptions";
import { ListSectionContent } from "../../ListSectionContent";
import BackgroundTabSpecificColumn from "./common/BackgrounTabSpecificColumn";
import { useRenderEditSection } from "./hooks/useRenderEditSection";
import ListContentMultiColumn from "./ListContentMultiColumn";
import Checkbox from "../../common/Checkbox";

const widthTypeOptions = [
  { value: "equal", label: "Sama Rata" },
  { value: "custom", label: "Custom" },
];

const MultiColumn = ({
  previewSection,
  setPreviewSection,
  isShowMultiColumn,
  isEditingSectionMultiColumn = false,
  sectionMultiColumnBeforeEdit,
  currentSectionMultiColumn,
  handleColumnFocus,
  isMultiColumn,
}) => {
  const {
    isAddColumnSection,
    isEditingColumnSection,
    isEditingSection,
    isAddColumn,
    isEditingColumn,
  } = useSelector((state) => state.customLandingPage.multiColumnSection);

  const dispatch = useDispatch();

  const [isSlidingOutColumn, setIsSlidingOutColumn] = useState(false);
  const [activeTab, setActiveTab] = useState("column");
  const [columnId, setColumnId] = useState("");
  const [setting, setSetting] = useState({});
  const [selectedColumn, setSelectedColumn] = useState({});
  const [selectedSection, setSelectedSection] = useState({});
  const [currentColumnBeforeEdit, setCurrentColumnBeforeEdit] = useState([]);
  const [currentSetionBeforeEdit, setCurrentSetionBeforeEdit] = useState([]);

  const [widthType, setWidthType] = useState(widthTypeOptions[0]);

  const [isCombineMobileView, setIsCombineMobileView] = useState(false);

  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});
  useEffect(() => {
    const section = previewSection.find((section) => section.id === setting.id);

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id, isEditingSectionMultiColumn]);

  useEffect(() => {
    if (isEditingSectionMultiColumn) {
      const currentWidhtType = widthTypeOptions.find(
        (opt) =>
          opt.value === currentSectionMultiColumn?.wrapperStyle?.isWidthCustom
      );

      if (currentWidhtType) {
        setWidthType(currentWidhtType);
      }

      const currentMobileView =
        currentSectionMultiColumn?.wrapperStyle?.combineColumnInMobileView;

      if (currentMobileView) {
        setIsCombineMobileView(currentMobileView);
      }
    }
  }, [currentSectionMultiColumn, isEditingSectionMultiColumn]);

  const sectionIdCheck = isEditingSectionMultiColumn
    ? currentSectionMultiColumn.id
    : setting.id;

  const handleCancel = () => {
    if (isAddColumn) {
      dispatch(setIsAddColumn(false));
      dispatch(setIsEditingColumn(false));
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          return section.id === sectionIdCheck
            ? {
                ...section,
                column: section.column.slice(0, -1),
              }
            : section;
        })
      );
    } else if (isEditingColumn) {
      if (activeTab === "background") {
        setActiveTab("column");
      }
      setPreviewSection([...currentColumnBeforeEdit]);
      dispatch(setIsAddColumn(false));
      dispatch(setIsEditingColumn(false));
    } else if (isAddColumnSection) {
      dispatch(setIsAddColumnSection(false));
    } else if (isEditingSectionMultiColumn) {
      dispatch(setIsAddColumn(false));
      isShowMultiColumn(false);
      setPreviewSection([...sectionMultiColumnBeforeEdit]);
    } else {
      dispatch(setIsAddColumn(false));
      isShowMultiColumn(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    if (isAddColumn || isEditingColumn) {
      if (activeTab === "background") {
        setIsSlidingOutColumn(true);
        setTimeout(() => {
          setActiveTab("column");
          dispatch(setIsAddColumn(false));
          dispatch(setIsEditingColumn(false));
          setIsSlidingOutColumn(false);
        }, 800);
      } else {
        setIsSlidingOutColumn(true);
        setTimeout(() => {
          dispatch(setIsAddColumn(false));
          dispatch(setIsEditingColumn(false));
          setIsSlidingOutColumn(false);
        }, 800);
      }
    } else {
      isShowMultiColumn(false);
    }
  };

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

  const newId = () => Math.random().toString(36).substr(2, 9);

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

  const initialData = () => {
    let uniqueId = createUniqueID(previewSection);
    let uniqueIdColumn1 = newId();
    let uniqueIdColumn2 = newId();

    const id = isMultiColumn
      ? `multi-column-${uniqueId}`
      : `parent-${uniqueId}`;

    let payload = {
      id,
      name: "multi-column",
      title: "Multi Kolom",
      column: [
        {
          id: uniqueIdColumn1,
          name: "Kolom",
          content: [initialSection],
          background,
          width: 50,
        },
        {
          id: uniqueIdColumn2,
          name: "Kolom",
          content: [{ ...initialSection, id: newId() }],
          background,
          width: 50,
        },
      ],
      wrapperStyle: {
        isWidthCustom: "equal",
        combineColumnInMobileView: false,
      },
      background,
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSectionMultiColumn) {
      initialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSectionMultiColumn]);

  const onAddColumnSection = () => {
    let uniqueId = createUniqueID(previewSection);
    const newColumn = {
      id: uniqueId,
      name: "Kolom",
      content: [initialSection],
      background,
      width: 50,
    };

    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionIdCheck) {
          return {
            ...section,
            column: [...section.column, newColumn],
          };
        }

        return section;
      })
    );

    setColumnId(uniqueId);
  };

  const handleChangeWrapperStyle = (key, value) => {
    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionIdCheck
          ? {
              ...section,
              wrapperStyle: {
                ...section.wrapperStyle,
                [key]: value,
              },
            }
          : section;
      })
    );
  };

  const editSection = useCallback(
    (section) => {
      setCurrentSetionBeforeEdit([...previewSection]);
      setSelectedSection(section);
      dispatch(setIsEditingSection(true));
    },
    [dispatch, previewSection]
  );

  const editColumn = useCallback(
    (section) => {
      setCurrentColumnBeforeEdit([...previewSection]);
      setSelectedColumn(section);
      dispatch(setIsEditingColumn(true));
    },
    [dispatch, previewSection]
  );

  const removeColumn = useCallback(
    (sectionId, contentIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              column: section.column.filter((_, i) => i !== contentIndex),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const moveColumn = useCallback(
    (sectionId, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.id === sectionId) {
            const updatedContent = [...section.column];
            const draggedItem = updatedContent[dragIndex];
            updatedContent.splice(dragIndex, 1);
            updatedContent.splice(hoverIndex, 0, draggedItem);
            return { ...section, column: updatedContent };
          }
          return section;
        });
      });

      return () => {};
    },
    [setPreviewSection]
  );

  const renderColumn = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.column.map((sectionColumn, contentIndex) => (
            <DraggableList
              key={sectionColumn.id || contentIndex}
              index={contentIndex}
              id={sectionColumn.id}
              showInfoText={sectionColumn?.name}
              moveSection={(dragIndex, hoverIndex) =>
                moveColumn(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editColumn(sectionColumn)}
              removeSection={() => removeColumn(section.id, contentIndex)}
              handleFocus={() => handleColumnFocus(contentIndex)}
            />
          ))}
        </div>
      );
    },
    [moveColumn, editColumn, removeColumn, handleColumnFocus]
  );

  const moveSection = useCallback(
    (sectionId, columnId, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              column: section.column.map((column) => {
                if (column.id === columnId) {
                  const updatedContent = [...column.content];
                  const draggedItem = updatedContent[dragIndex];
                  updatedContent.splice(dragIndex, 1);
                  updatedContent.splice(hoverIndex, 0, draggedItem);
                  return { ...column, content: updatedContent };
                }
                return column;
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

  const removeSection = useCallback(
    (sectionId, columnId, contentId) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.filter(
                        (content) => content.id !== contentId
                      ),
                    }
                  : column
              ),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const renderSection = useCallback(
    (section, columnId) => {
      return (
        <div key={section.id}>
          {section.column.map((column, columnIndex) => {
            if (column.id === columnId) {
              return (
                <div key={column.id || columnIndex}>
                  {column.content.map((contentItem, contentIndex) => (
                    <ListSectionContent
                      isMultiColumn={true}
                      key={contentItem.id || contentIndex}
                      index={contentIndex}
                      id={contentItem.id}
                      section={contentItem}
                      // showInfoText={contentItem.title}
                      moveSection={(dragIndex, hoverIndex) => {
                        if (contentItem.name.includes("floating")) {
                          return null;
                        } else {
                          moveSection(
                            section.id,
                            columnId,
                            dragIndex,
                            hoverIndex
                          );
                        }
                      }}
                      editSection={() => {
                        if (contentItem.name.includes("floating")) {
                          return null;
                        } else {
                          editSection(contentItem);
                        }
                      }}
                      removeSection={() =>
                        removeSection(section.id, columnId, contentItem.id)
                      }
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
    [moveSection, editSection, removeSection]
  );

  const { renderEditSection } = useRenderEditSection({
    previewSection,
    setPreviewSection,
    currentSetionBeforeEdit,
    selectedSection,
    selectedColumn,
    columnId,
    isAddColumn,
  });

  const handleChangeWidthColumn = useCallback(
    (columnId, value) => {
      setPreviewSection((arr) =>
        arr.map((section) =>
          section.id === sectionIdCheck
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        width: value,
                      }
                    : column
                ),
              }
            : section
        )
      );
    },
    [sectionIdCheck, setPreviewSection]
  );

  const handleSetValueWhenBlurWrapperStyle = useCallback(
    (value, min, max, columnId) => {
      const newValue = Math.min(Math.max(value, min), max);
      handleChangeWidthColumn(columnId, newValue);
    },
    [handleChangeWidthColumn]
  );

  const renderCustomWidthColumn = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.column.map((column, index) => {
            const label = `Lebar ${index + 1}`;
            return (
              <div key={column.id}>
                <InputRangeWithNumber
                  label={label}
                  value={column.width}
                  onChange={(newValue) => {
                    handleChangeWidthColumn(column.id, newValue);
                  }}
                  min={1}
                  max={100}
                  onBlur={() =>
                    handleSetValueWhenBlurWrapperStyle(
                      column.width,
                      1,
                      100,
                      column.id
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      );
    },
    [handleChangeWidthColumn, handleSetValueWhenBlurWrapperStyle]
  );

  return (
    <div>
      <CRow>
        <CCol>
          <div>
            {!isAddColumnSection &&
              !isEditingColumnSection &&
              !isEditingSection && (
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

            <CTabs activeTab={activeTab}>
              {!isAddColumn && !isEditingColumnSection && !isEditingSection && (
                <CNav variant="tabs">
                  <CNavItem onClick={() => setActiveTab("column")}>
                    <CNavLink data-tab="column">Kolom</CNavLink>
                  </CNavItem>
                  <CNavItem onClick={() => setActiveTab("background")}>
                    <CNavLink data-tab="background">Background</CNavLink>
                  </CNavItem>
                </CNav>
              )}
              <CTabContent
                style={{
                  height:
                    !isAddColumnSection &&
                    !isEditingColumnSection &&
                    !isEditingSection &&
                    380,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <CTabPane className="p-1" data-tab="column">
                  {!isEditingSection ? (
                    <>
                      {!isAddColumn && !isEditingColumn && (
                        <div className="my-3 pb-5">
                          <div>
                            <SelectOptions
                              label="Lebar"
                              options={widthTypeOptions}
                              onChange={(selectedOption) => {
                                setWidthType(selectedOption);
                                handleChangeWrapperStyle(
                                  "isWidthCustom",
                                  selectedOption.value
                                );
                              }}
                              value={widthType}
                              width="50"
                            />

                            {widthType.value === "custom" && (
                              <div>
                                {previewSection.map((section) => {
                                  if (section.id === sectionIdCheck) {
                                    return renderCustomWidthColumn(
                                      section,
                                      columnId
                                    );
                                  }
                                  return null;
                                })}
                              </div>
                            )}

                            <Checkbox
                              label="Gabungkan Kolom Di Mobile"
                              id="combineColumnInMobileView"
                              checked={isCombineMobileView}
                              onChange={(e) => {
                                const { checked } = e.target;
                                setIsCombineMobileView(checked);
                                handleChangeWrapperStyle(
                                  "combineColumnInMobileView",
                                  checked
                                );
                              }}
                            />
                          </div>

                          <div className="my-3">
                            {previewSection
                              .filter((section) =>
                                isEditingSectionMultiColumn
                                  ? section.id === currentSectionMultiColumn.id
                                  : section.id === setting.id
                              )
                              .map((section, i) => renderColumn(section, i))}
                          </div>
                          <CCard
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(setIsAddColumn(true));
                              onAddColumnSection();
                            }}
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

                                <div>Tambah Kolom</div>
                              </div>
                            </CCardBody>
                          </CCard>
                        </div>
                      )}

                      {isAddColumn && (
                        <div>
                          {isAddColumnSection ? (
                            <ListContentMultiColumn
                              isMultiColumn={true}
                              previewSection={previewSection}
                              setPreviewSection={(value) =>
                                setPreviewSection(value)
                              }
                              sectionId={
                                isEditingSectionMultiColumn
                                  ? currentSectionMultiColumn.id
                                  : setting.id
                              }
                              columnId={columnId}
                            />
                          ) : (
                            <div className="my-3 pb-5">
                              {previewSection.map((section) => {
                                if (section.id === sectionIdCheck) {
                                  return renderSection(section, columnId); // Render hanya section "multi-column"
                                }
                                return null; // Jika bukan multi-column, jangan render apa pun
                              })}

                              <CCard
                                style={{ cursor: "pointer", marginBottom: 8 }}
                                onClick={() => {
                                  dispatch(setIsAddColumnSection(true));
                                }}
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

                          {/* {previewFloatingSection.map((section, index) =>
                        renderListContent(section, index)
                      )} */}
                        </div>
                      )}

                      {isEditingColumn && (
                        <div>
                          {isEditingColumnSection ? (
                            <ListContentMultiColumn
                              isMultiColumn={true}
                              previewSection={previewSection}
                              setPreviewSection={(value) =>
                                setPreviewSection(value)
                              }
                              sectionId={
                                isEditingSectionMultiColumn
                                  ? currentSectionMultiColumn.id
                                  : setting.id
                              }
                              columnId={selectedColumn.id}
                            />
                          ) : (
                            <div
                              className={`animate__animated my-3 pb-5 ${
                                isSlidingOutColumn
                                  ? "animate__fadeOutRight animate__fast"
                                  : "animate__fadeInRight animate__fast"
                              }`}
                            >
                              {previewSection.map((section) => {
                                if (section.id === sectionIdCheck) {
                                  return renderSection(
                                    section,
                                    selectedColumn.id
                                  );
                                }
                                return null;
                              })}

                              <CCard
                                style={{ cursor: "pointer", marginBottom: 8 }}
                                onClick={() => {
                                  dispatch(setIsEditingColumnSection(true));
                                }}
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

                          {/* {previewFloatingSection.map((section, index) =>
                        renderListContent(section, index)
                      )} */}
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      {previewSection.map((section) => {
                        if (section.id === sectionIdCheck) {
                          return (
                            <div key={section.id}>
                              {renderEditSection(section)}
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  )}
                </CTabPane>

                <CTabPane
                  style={{ overflowX: "hidden", height: 350 }}
                  className="p-1"
                  data-tab="background"
                >
                  {isEditingColumn ? (
                    <BackgroundTabSpecificColumn
                      currentSection={selectedColumn}
                      setPreviewSection={setPreviewSection}
                      sectionId={sectionIdCheck}
                      columnId={selectedColumn.id}
                      isSlidingOutColumn={isSlidingOutColumn}
                    />
                  ) : (
                    <BackgroundTab
                      currentSection={
                        isEditingSectionMultiColumn
                          ? currentSectionMultiColumn
                          : selectedCurrentSection
                      }
                      setPreviewSection={setPreviewSection}
                      type={isEditingSectionMultiColumn ? "edit" : "add"}
                    />
                  )}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default MultiColumn;
