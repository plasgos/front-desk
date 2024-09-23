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
import BackgroundTab from "../../common/BackgroundTab";
import { DraggableList } from "../../common/DraggableList";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import SelectOptions from "../../common/SelectOptions";
import ListContentMultiColumn from "./ListContentMultiColumn";
import { ListSectionContent } from "../../ListSectionContent";

const widthTypeOptions = [
  { value: "equal", label: "Sama Rata" },
  { value: "custom", label: "Custom" },
];

const MultiColumn = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  previewFloatingSection,
  setPreviewFloatingSection,
}) => {
  const [columnId, setColumnId] = useState("");
  const [isAddColumn, setIsAddColumn] = useState(false);
  const [isAddColumnSection, setIsAddColumnSection] = useState(false);
  console.log("🚀 ~ isAddColumnSection:", isAddColumnSection);

  console.log("🚀 ~ isAddColumn:", isAddColumn);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [isAddContent, setIsAddContent] = useState(false);
  console.log("🚀 ~ isAddContent:", isAddContent);
  const [setting, setSetting] = useState({});
  const [selectedColumn, setSelectedColumn] = useState({});
  const [currentColumnBeforeEdit, setCurrentColumnBeforeEdit] = useState([]);

  const [widthType, setWidthType] = useState(widthTypeOptions[0]);

  const [width1, setWidth1] = useState(0);

  const handleCancel = () => {
    if (isAddColumn) {
      setIsAddColumn(false);
      setIsEditingColumn(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id === contentIdToCheck
            ? {
                ...section,
                column: section.column.slice(0, -1),
              }
            : section;
        })
      );
    } else if (isEditingColumn) {
      setPreviewSection([...currentColumnBeforeEdit]);
      setIsAddColumn(false);
      setIsEditingColumn(false);
    } else if (isAddColumnSection) {
      setIsAddColumnSection(false);
    } else if (isEditingSection) {
      setIsAddColumn(false);
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      setIsAddColumn(false);
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    if (isAddColumn || isEditingColumn) {
      setIsAddColumn(false);
      setIsEditingColumn(false);
    } else {
      isShowContent(false);
    }
  };

  const initialSection = {
    id: "1",
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
    },
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
  };

  const initialData = () => {
    let uniqueId = createUniqueID(previewSection);
    let uniqueIdColumn = createUniqueID([]);

    let payload = {
      id: uniqueId,
      name: "multi-column",
      title: "Multi Kolom",
      column: [
        {
          id: uniqueIdColumn,
          name: "Kolom 1",
          content: [initialSection],
          background,
        },
        {
          id: "id-colum-2",
          name: "Kolom 2",
          content: [{ ...initialSection, id: "2" }],
          background,
        },
      ],
      wrapperStyle: {
        isWidthCustom: false,
        width1: 50,
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  function generateRandomId() {
    return Math.random().toString(36).substring(2, 8);
  }

  useEffect(() => {
    // Generate ID saat komponen pertama kali dirender
    const id = generateRandomId();
    setColumnId(id);
  }, []);

  const onAddSection = (targetColumnId) => {
    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        // Hanya modifikasi section dengan name "multi-column"
        if (section.name === "multi-column") {
          // Cek apakah kolom dengan id yang dituju sudah ada
          const updatedColumns = section.column.map((column) => {
            if (column.id === targetColumnId) {
              // Jika id kolom cocok, tambahkan content baru ke kolom tersebut
              return {
                ...column,
                content: [...column.content, initialSection],
              };
            }
            return column;
          });

          // Jika kolom dengan id tersebut belum ada, tambahkan kolom baru
          if (!updatedColumns.some((col) => col.id === targetColumnId)) {
            const newColumn = {
              id: targetColumnId,
              name: "Kolom",
              content: [initialSection],
              background,
            };

            updatedColumns.push(newColumn); // Tambahkan kolom baru
          }

          return {
            ...section,
            column: updatedColumns,
          };
        }

        return section; // Kembalikan section lain tanpa perubahan
      })
    );
  };

  const handleChangeWrapperStyle = (key, value) => {
    setPreviewSection((arr) =>
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
    if (key === "width1") {
      setWidth1(newValue);
    }
    handleChangeWrapperStyle(key, newValue);
  };

  useEffect(() => {
    if (!isEditingSection) {
      initialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const editSection = useCallback(
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
    (name, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === name) {
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
          {section.column.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={contentItem?.name}
              moveSection={(dragIndex, hoverIndex) =>
                moveColumn(section.name, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => removeColumn(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [moveColumn, editSection, removeColumn]
  );
  const moveSection = useCallback(
    (name, dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === name) {
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
    [columnId, setPreviewSection]
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
                      // showInfoText={contentItem.title}
                      moveSection={(dragIndex, hoverIndex) => {
                        if (contentItem.name.includes("floating")) {
                          return null;
                        } else {
                          moveSection(section.name, dragIndex, hoverIndex);
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

  return (
    <div>
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
            {!isAddColumnSection && (
              <div className="d-flex justify-content-end align-items-center border-bottom p-2">
                <div>
                  <CButton
                    onClick={handleCancel}
                    color="primary"
                    variant="outline"
                    className="mx-2"
                  >
                    Batal NIH
                  </CButton>

                  <CButton onClick={handleConfirm} color="primary">
                    Selesai
                  </CButton>
                </div>
              </div>
            )}

            <CTabs activeTab="column">
              {!isAddColumn && (
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="column">Kolom</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="background">Background</CNavLink>
                  </CNavItem>
                </CNav>
              )}
              <CTabContent style={{}} className="pt-3">
                <CTabPane className="p-1" data-tab="column">
                  {!isAddColumn && !isEditingColumn && (
                    <div>
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
                          <InputRangeWithNumber
                            label="Width 1"
                            value={width1}
                            onChange={(newValue) => {
                              setWidth1(newValue);
                              handleChangeWrapperStyle("width1", newValue);
                            }}
                            min={1}
                            max={100}
                            onBlur={() =>
                              handleSetValueWhenBlurWrapperStyle(
                                width1,
                                1,
                                100,
                                "width1"
                              )
                            }
                          />
                        )}
                      </div>

                      <div>
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
                          onAddSection(columnId);
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
                          previewSection={previewSection}
                          setPreviewSection={(value) =>
                            setPreviewSection(value)
                          }
                          isShowContent={(value) => setIsAddContent(value)}
                          previewFloatingSection={previewFloatingSection}
                          setPreviewFloatingSection={setPreviewFloatingSection}
                          isAddColumnSectionMultiColumn={isAddColumnSection}
                          setIsAddColumnSectionMultiColumn={
                            setIsAddColumnSection
                          }
                          sectionId={setting.id}
                          columnId={columnId}
                        />
                      ) : (
                        <div>
                          {previewSection.map((section) => {
                            if (section.name === "multi-column") {
                              return renderSection(section, columnId); // Render hanya section "multi-column"
                            }
                            return null; // Jika bukan multi-column, jangan render apa pun
                          })}

                          <CCard
                            style={{ cursor: "pointer", marginBottom: 8 }}
                            onClick={() => {
                              setIsAddColumnSection(true);
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
                </CTabPane>

                <CTabPane
                  style={{ overflowX: "hidden", height: "100%" }}
                  className="p-1"
                  data-tab="background"
                >
                  <BackgroundTab
                    currentSection={isEditingSection ? currentSection : setting}
                    setPreviewSection={setPreviewSection}
                    type={isEditingSection ? "edit" : "add"}
                  />
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
