import {
  CButton,
  CCard,
  CCardBody,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import { IoAdd } from "react-icons/io5";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { createUniqueID } from "../../../../../lib/unique-id";
import BackgroundTab from "../../common/BackgroundTab";
import Checkbox from "../../common/Checkbox";
import { DraggableList } from "../../common/DraggableList";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import NavTabsCustom from "../../common/NavTabsCustom";
import SelectOptions from "../../common/SelectOptions";
import UpdateContent from "./UpdateContent";

const widthTypeOptions = [
  { value: "equal", label: "Sama Rata" },
  { value: "custom", label: "Custom" },
];

const Multicolumn = ({
  previewSection,
  setPreviewSection,
  isEditing = false,
  isShowContent,
  sectionBeforeEdit,
  currentSection,
  pageSetting,
  handleSectionFocus,
  setPreviewFloatingSection,
  previewFloatingSection,
  handleColumnFocus,
  handleSectionContentFocus,
}) => {
  const [activeTab, setActiveTab] = useState("column");
  const [setting, setSetting] = useState({});
  const [tmp_columns, setTmpColumns] = useState([]);
  const [tmp_inner_columns, setTmpInnerColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isAddColumn, setIsAddColumn] = useState(false);

  const [isEditingSection, setEditingSection] = useState(false);

  const [widthType, setWidthType] = useState(widthTypeOptions[0]);
  const [isCombineMobileView, setIsCombineMobileView] = useState(false);

  const [timers, setTimers] = useState({});
  const newId = () => Math.random().toString(36).substr(2, 9);

  const sectionIdCheck = isEditing ? currentSection.id : setting.id;
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
  const initialColumn = {
    id: newId(),
    name: "text",
    title: "Teks",
    content: {
      editorHtml: "Teks",
      style: {
        textAlign: "center",
        color: "#000000",
        fontSize: 18,
      },
    },
    animation: {
      type: undefined,
      duration: 1,
      isReplay: false,
    },
    background,
  };
  const innerSectionRef = useRef([]);
  const handleInnerSectionFocus = useCallback(
    (sectionId) => {
      // setFocusedInnerSection(sectionId);
      handleSectionFocus(sectionId);
      // eslint-disable-next-line no-unused-expressions
      innerSectionRef.current[sectionId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });

      // Clear any existing timer for this sectionId
      if (timers[sectionId]) {
        clearTimeout(timers[sectionId]);
      }

      // Set a timer to remove focus after 3 seconds
      const timer = setTimeout(() => {
        // setFocusedInnerSection(null);
        handleSectionFocus(null);
      }, 2000);

      setTimers({ ...timers, [sectionId]: timer });
    },
    [timers, handleSectionFocus]
  );
  const handleChangeWrapperStyle = (key, value) => {
    if (!isEditing) {
      setSetting((obj) => ({
        ...obj,
        wrapperStyle: {
          ...obj.wrapperStyle,
          [key]: value,
        },
      }));
    }
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
  const handleChangeWidthColumn = (columnId, value) => {
    setPreviewSection((arr) =>
      arr.map((section) => {
        return String(section.id) === sectionIdCheck
          ? {
              ...section,
              content: section.content.map((item) =>
                item.id === columnId
                  ? {
                      ...item,
                      width: value,
                    }
                  : item
              ),
            }
          : section;
      })
    );
  };

  const handleSetValueWhenBlurWrapperStyle = (value, min, max, columnId) => {
    const newValue = Math.min(Math.max(value, min), max);
    handleChangeWidthColumn(columnId, newValue);
  };

  const renderCustomWidthColumn = (section) => {
    return (
      <div key={section.id}>
        {section.content.map((column, index) => {
          const label = `Lebar ${index + 1}`;
          return (
            <div key={column.id}>
              <InputRangeWithNumber
                label={label}
                value={column.width}
                onChange={(newValue) => {
                  handleChangeWidthColumn(column.id, parseInt(newValue));
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
  };

  const handleCancelColumn = () => {
    if (isAddContent) {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionIdCheck) {
            return {
              ...section,
              content: section.content.filter(
                (column) => column.id !== selectedColumn.id
              ),
            };
          }

          return section;
        })
      );
      setIsAddContent(false);
    } else if (isEditingContent) {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionIdCheck) {
            return {
              ...section,
              content: section.content.map((column) =>
                column.id === selectedColumn.id ? selectedColumn : column
              ),
            };
          }

          return section;
        })
      );
      setIsEditingContent(false);
    }
  };

  const handleConfirmColumn = () => {
    if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionIdCheck) {
            return {
              ...section,
              content: section.content.map((column) =>
                column.id === selectedColumn.id
                  ? {
                      ...selectedColumn,
                      content: tmp_inner_columns,
                    }
                  : column
              ),
            };
          }

          return section;
        })
      );
    } else {
      isShowContent(false);
    }
  };

  const handleCancelContent = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
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
    } else if (isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isAddColumn) {
      setIsAddColumn(false);
    } else if (isEditing) {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setIsAddContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirmContent = () => {
    if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
    } else {
      isShowContent(false);
    }
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let uniqueIdColumn1 = newId();
    let uniqueIdColumn2 = newId();

    const columns = [
      {
        id: uniqueIdColumn1,
        content: [
          {
            id: `text-${uniqueIdColumn1}`,
            name: "text",
            title: "Teks",
            content: {
              editorHtml: "<b>Text Kolom 1</b>",
              style: {
                textAlign: "center",
                color: "#000000",
                fontSize: 18,
              },
            },
            background,
          },
        ],
        animation: {
          type: undefined,
          duration: 1,
          isReplay: false,
        },
        background,
        width: 50,
      },
      {
        id: uniqueIdColumn2,
        content: [
          {
            id: `text-${uniqueIdColumn2}`,
            name: "text",
            title: "Teks",
            content: {
              editorHtml: "<b>Text Kolom 2</b>",
              style: {
                textAlign: "center",
                color: "#000000",
                fontSize: 18,
              },
            },
            background,
          },
        ],
        animation: {
          type: undefined,
          duration: 1,
          isReplay: false,
        },
        background,
        width: 50,
      },
    ];

    let payload = {
      id: uniqueId,
      name: "multi-column",
      title: "Multi Kolom",
      content: columns,
      wrapperStyle: {
        isWidthCustom: "equal",
        maxWidth: pageSetting?.maxWidth || 1920,
      },
      background,
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
    setTmpColumns(columns);
  };
  const handleAddColumn = () => {
    let uniqueId = createUniqueID(tmp_columns);
    const newColumn = {
      id: uniqueId,
      name: "Kolom",
      content: [initialColumn],
      background,
      width: 50,
    };
    setPreviewSection((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionIdCheck) {
          return {
            ...section,
            content: [...section.content, newColumn],
          };
        }

        return section;
      })
    );
    setSelectedColumn(newColumn);
    setTmpInnerColumns(newColumn.content);
    setIsAddContent(true);
  };
  const handleShowColumn = (value) => {
    setIsAddContent(value);
    setIsEditingContent(value);
  };

  const editSectionColumn = useCallback(
    (section) => {
      setSelectedColumn(section);
      setTmpInnerColumns(section.content);
      setIsEditingContent(section);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previewSection]
  );
  const removeSectionColumn = useRemoveSection(setPreviewSection);
  const moveSectionColumn = useMoveSection(setPreviewSection);
  const renderSectionColumn = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((column, index) => (
            <DraggableList
              key={column.id || index}
              index={index}
              id={column.id}
              showInfoText="Kolom"
              moveSection={(dragIndex, hoverIndex) =>
                moveSectionColumn(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editSectionColumn(column)}
              removeSection={() => removeSectionColumn(section.id, index)}
              handleFocus={() => handleSectionFocus(column.id)}
            />
          ))}
        </div>
      );
    },
    [
      moveSectionColumn,
      editSectionColumn,
      removeSectionColumn,
      handleSectionFocus,
    ]
  );
  useEffect(() => {
    if (selectedColumn && tmp_inner_columns) {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionIdCheck) {
            return {
              ...section,
              content: section.content.map((column) =>
                column.id === selectedColumn.id
                  ? {
                      ...selectedColumn,
                      content: tmp_inner_columns,
                    }
                  : column
              ),
            };
          }

          return section;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tmp_inner_columns, selectedColumn]);
  useEffect(() => {
    if (isEditing) {
      const currentWidthType = widthTypeOptions.find(
        (opt) => opt.value === currentSection?.wrapperStyle?.isWidthCustom
      );
      const currentMobileView =
        currentSection?.wrapperStyle?.combineColumnInMobileView;

      if (currentWidthType) {
        setWidthType(currentWidthType);
      }
      if (currentMobileView) {
        setIsCombineMobileView(currentMobileView);
      }
      if (currentSection?.content && !isEditingSection) {
        setEditingSection(true);
        setTmpColumns(currentSection.content);
      }
    }
  }, [currentSection, isEditing, isEditingSection]);

  useEffect(() => {
    if (!isEditing) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
  };

  const tabsData = [
    { value: "column", label: "Kolom" },
    { value: "background", label: "Background" },
  ];

  return (
    <div>
      {!isAddContent && !isEditingContent && (
        <div
          style={{
            position: "sticky", // Navbar tetap terlihat saat di-scroll
            top: 0, // Menempel di atas container ini
            backgroundColor: "#fff",
            color: "#fff",
            zIndex: 1, // Pastikan berada di atas konten list
          }}
        >
          <div className="d-flex justify-content-between align-items-center border-bottom p-3">
            <div style={{ fontSize: 18 }} className="px-3">
              <b>Multi Kolom</b>
            </div>
            <div>
              <CButton
                onClick={handleCancelContent}
                color="primary"
                variant="outline"
                className="mx-2"
                size="sm"
              >
                <b>Batal</b>
              </CButton>

              <CButton onClick={handleConfirmContent} color="primary" size="sm">
                <b>Selesai</b>
              </CButton>
            </div>
          </div>
        </div>
      )}
      {(isAddContent || isEditingContent) && (
        <UpdateContent
          previewSection={tmp_inner_columns}
          setPreviewSection={(value) => setTmpInnerColumns(value)}
          currentColumn={selectedColumn}
          isEditing={isEditingContent}
          handleContentFocus={(value) => handleInnerSectionFocus(value)}
          setIsShowContent={handleShowColumn}
          handleCancel={() => handleCancelColumn()}
          handleConfirm={() => handleConfirmColumn()}
          pageSetting={pageSetting}
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
          handleSectionContentFocus={handleSectionContentFocus}
        />
      )}

      {!isAddContent && !isEditingContent && (
        <>
          <CTabs activeTab={activeTab}>
            <NavTabsCustom tabs={tabsData} onTabClick={handleTabClick} />

            <CTabContent
              style={{
                height: "calc(100vh - 110px)",
              }}
              className="py-3 px-2 vertical-scrolling-menu"
            >
              <CTabPane className="p-2" data-tab="column">
                <div>
                  <div className="mb-2">
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
                            return renderCustomWidthColumn(section);
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
                    {isCombineMobileView && (
                      <InputRangeWithNumber
                        label="Lebar Maksimal"
                        value={
                          isEditing
                            ? currentSection?.wrapperStyle?.maxWidth
                            : setting.wrapperStyle.maxWidth
                        }
                        onChange={(newValue) => {
                          handleChangeWrapperStyle("maxWidth", newValue);
                        }}
                        min={1}
                        max={pageSetting?.maxWidth}
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
                      .map((section, i) => renderSectionColumn(section, i))}
                  </div>
                  <CCard
                    style={{ cursor: "pointer" }}
                    onClick={handleAddColumn}
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
              </CTabPane>

              <CTabPane className="p-2" data-tab="background">
                <BackgroundTab
                  currentSection={isEditing ? currentSection : setting}
                  setPreviewSection={setPreviewSection}
                  type={isEditing ? "edit" : "add"}
                />
              </CTabPane>
            </CTabContent>
          </CTabs>
        </>
      )}
    </div>
  );
};

export default Multicolumn;
