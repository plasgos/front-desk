import React, { useCallback, useEffect, useState } from "react";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import { DraggableList } from "../../common/DraggableList";
import { createUniqueID } from "../../../../../lib/unique-id";
import { ListSectionContent } from "../../ListSectionContent";
import { useRenderEditSection } from "../../hooks/useRenderEditSection";
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
import SelectOptions from "../../common/SelectOptions";
import Checkbox from "../../common/Checkbox";
import { IoAdd } from "react-icons/io5";
import BackgroundTab from "../../common/BackgroundTab";
import BackgroundTabSpecificColumn from "../multi-column/common/BackgrounTabSpecificColumn";
import ListContent from "..";

const widthTypeOptions = [
  { value: "equal", label: "Sama Rata" },
  { value: "custom", label: "Custom" },
];

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

const MultiColumnUpdate = ({
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

  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [isAddColumn, setIsAddColumn] = useState(false);

  const [multiColumnSections, setMultiColumnSections] = useState([
    initialSection,
  ]);

  let uniqueIdColumn1 = newId();
  let uniqueIdColumn2 = newId();

  const [columns, setColumns] = useState([
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
      content: [initialSection],
      background,
      width: 50,
    },
  ]);
  // console.log("🚀 ~ columns:", columns);

  // useEffect(() => {
  //   const currentColumnSection = multiColumnSections.find((section) => section.id === sectionIdCheck )
  // },[])

  const [sectionMultiColumnBeforeEdit, setSectionMultiColumnBeforeEdit] =
    useState([]);

  const [isEditingMultiColumnSection, setIsEditingMultiColumnSection] =
    useState(false);

  const [isAddMultiColumnSection, setIsAddMultiColumnSection] = useState(false);

  useEffect(() => {
    const section = previewSection.find((section) => section.id === setting.id);

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id, isEditingSection]);

  useEffect(() => {
    if (isEditingSection) {
      const currentWidhtType = widthTypeOptions.find(
        (opt) => opt.value === currentSection?.wrapperStyle?.isWidthCustom
      );

      if (currentWidhtType) {
        setWidthType(currentWidhtType);
      }

      const currentMobileView =
        currentSection?.wrapperStyle?.combineColumnInMobileView;

      if (currentMobileView) {
        setIsCombineMobileView(currentMobileView);
      }
    }
  }, [currentSection, isEditingSection]);

  const sectionIdCheck = isEditingSection ? currentSection.id : setting.id;

  const columnIdCheck = isEditingColumn ? selectedColumn.id : columnId;

  // const initialData = () => {
  //   let uniqueId = createUniqueID(previewSection);

  //   let payload = {
  //     id: uniqueId,
  //     name: "multi-column",
  //     title: "Multi Kolom",
  //     column: columns,
  //     wrapperStyle: {
  //       isWidthCustom: "equal",
  //       combineColumnInMobileView: false,
  //     },
  //     background,
  //   };

  //   setPreviewSection((prevSections) => [...prevSections, payload]);
  //   setSetting(payload);
  // };

  const initialData = () => {
    let uniqueId = createUniqueID(previewSection);
    let uniqueIdColumn1 = newId();
    let uniqueIdColumn2 = newId();

    let payload = {
      id: uniqueId,
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
    if (!isEditingSection) {
      initialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  // useEffect(() => {
  //   setPreviewSection((prevSections) =>
  //     prevSections.map((section) =>
  //       section.id === sectionIdCheck
  //         ? {
  //             ...section,
  //             column: columns,
  //           }
  //         : section
  //     )
  //   );

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [columns]);

  const onAddColumnSection = () => {
    let uniqueId = createUniqueID(previewSection);
    const newColumn = {
      id: uniqueId,
      name: "Kolom",
      content: [initialSection],
      background,
      width: 50,
    };

    // setColumns((prev) => [...prev, newColumn]);

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

  // const updateSectionContent = (newContent) => {
  //   console.log("🚀 ~ updateSectionContent ~ newContent:", newContent);

  //   if (typeof newContent === "function") {
  //     console.error("Error: Fungsi ikut terkirim!");
  //     return;
  //   }

  //   setPreviewSection((prevSections) =>
  //     prevSections.map((section) => ({
  //       ...section,
  //       column: section.column.map((col) =>
  //         col.id === columnIdCheck
  //           ? { ...col, content: [...col.content, newContent] }
  //           : col
  //       ),
  //     }))
  //   );
  // };

  const addContentToColumn = (newContent) => {
    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.column) {
          return {
            ...section,
            column: section.column.map((col) =>
              col.id === columnIdCheck
                ? { ...col, content: [...col.content, newContent] }
                : col
            ),
          };
        }
        return section;
      })
    );
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
      setIsEditingMultiColumnSection(true);
    },
    [previewSection]
  );

  const editColumn = useCallback(
    (section) => {
      setCurrentColumnBeforeEdit([...previewSection]);
      setSelectedColumn(section);
      setIsEditingColumn(true);
    },
    [previewSection]
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
                      key={contentItem.id || contentIndex}
                      index={contentIndex}
                      id={contentItem.id}
                      section={contentItem}
                      moveSection={(dragIndex, hoverIndex) => {
                        moveSection(
                          section.id,
                          columnId,
                          dragIndex,
                          hoverIndex
                        );
                      }}
                      editSection={() => editSection(contentItem)}
                      removeSection={() => {
                        removeSection(section.id, columnId, contentItem.id);
                        // removeFrameSection(contentItem.id);
                      }}
                      focusContent={() =>
                        handleSectionContentFocus(contentItem.id)
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
    [moveSection, editSection, removeSection, handleSectionContentFocus]
  );

  // useEffect(() => {
  //   setColumns((prevSections) =>
  //     prevSections.map((col) =>
  //       col.id === columnIdCheck
  //         ? {
  //             ...col,
  //             content: multiColumnSections,
  //           }
  //         : col
  //     )
  //   );

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [multiColumnSections]);

  // useEffect(() => {
  //   setPreviewSection((prevSections) =>
  //     prevSections.map((section) =>
  //       section.id === sectionIdCheck
  //         ? {
  //             ...section,
  //             column: columns,
  //           }
  //         : section
  //     )
  //   );

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [columns]);

  const isMultiColumnSection = true;

  const { renderEditSection } = useRenderEditSection({
    previewSection: multiColumnSections,
    setPreviewSection: setMultiColumnSections,
    editing: selectedSection,
    setEditing: setIsEditingMultiColumnSection,
    sectionBeforeEdit: sectionMultiColumnBeforeEdit,
    handleSectionContentFocus,
    isPopUpSection: isMultiColumnSection,
    handleColumnFocus,
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

  const handleCancel = () => {
    if (isAddColumn) {
      setIsAddColumn(false);
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
      setIsEditingColumn(false);
    } else if (isAddMultiColumnSection) {
      setIsAddMultiColumnSection(false);
    } else if (isEditingSection) {
      setIsEditingMultiColumnSection(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
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
          setIsAddColumn(false);
          setIsEditingColumn(false);

          setIsSlidingOutColumn(false);
        }, 800);
      } else {
        setIsSlidingOutColumn(true);
        setTimeout(() => {
          setIsAddColumn(false);
          setIsEditingColumn(false);
          setIsSlidingOutColumn(false);
        }, 800);
      }
    } else {
      isShowContent(false);
    }
  };

  return (
    <div>
      <CRow>
        <CCol>
          <div>
            {!isAddMultiColumnSection && !isEditingMultiColumnSection && (
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
              {!isAddColumn && !isEditingMultiColumnSection && (
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
                    !isAddMultiColumnSection &&
                    !isEditingMultiColumnSection &&
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
                                isEditingSection
                                  ? section.id === currentSection.id
                                  : section.id === setting.id
                              )
                              .map((section, i) => renderColumn(section, i))}
                          </div>
                          <CCard
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setIsAddColumn(true);
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
                          {isAddMultiColumnSection ? (
                            <ListContent
                              previewSection={multiColumnSections}
                              setPreviewSection={addContentToColumn}
                              isShowContent={(value) =>
                                setIsAddMultiColumnSection(value)
                              }
                              handleSectionContentFocus={
                                handleSectionContentFocus
                              }
                              previewFloatingSection={previewFloatingSection}
                              setPreviewFloatingSection={(value) =>
                                setPreviewFloatingSection(value)
                              }
                              handleColumnFocus={handleColumnFocus}
                              isPopUpSection={true}
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
                                  setIsAddMultiColumnSection(true);
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
                        </div>
                      )}

                      {isEditingColumn && (
                        <div>
                          {isEditingMultiColumnSection ? (
                            <ListContent
                              previewSection={multiColumnSections}
                              setPreviewSection={(value) =>
                                setMultiColumnSections(value)
                              }
                              isShowContent={(value) =>
                                setIsEditingMultiColumnSection(value)
                              }
                              handleSectionContentFocus={
                                handleSectionContentFocus
                              }
                              previewFloatingSection={previewFloatingSection}
                              setPreviewFloatingSection={(value) =>
                                setPreviewFloatingSection(value)
                              }
                              handleColumnFocus={handleColumnFocus}
                              isPopUpSection={true}
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
                                  setIsEditingMultiColumnSection(true);
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
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
                      }
                      setPreviewSection={setPreviewSection}
                      type={isEditingSection ? "edit" : "add"}
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

export default MultiColumnUpdate;
