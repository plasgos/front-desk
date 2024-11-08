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
import { DraggableList } from "../../common/DraggableList";
import NavTabsCustom from "../../common/NavTabsCustom";
import SelectOptions from "../../common/SelectOptions";
import UpdateContent from "./UpdateContent";
import UpdateDesign from "./UpdateDesign";

const tabsPositionOptions = [
  { value: "top", label: "Atas" },
  { value: "bottom", label: "Bawah" },
];

const Tabs = ({
  previewSection,
  setPreviewSection,
  isEditing = false,
  isShowContent,
  sectionBeforeEdit,
  currentSection,
  handleSectionFocus,
  setPreviewFloatingSection,
  previewFloatingSection,
  handleColumnFocus,
  handleSectionContentFocus,
}) => {
  const [activeTab, setActiveTab] = useState("tabs");
  const [setting, setSetting] = useState({});
  const [tmp_columns, setTmpColumns] = useState([]);
  const [tmp_inner_columns, setTmpInnerColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isAddColumn, setIsAddColumn] = useState(false);

  const [isEditingSection, setEditingSection] = useState(false);

  const [defaultTabOptions, setDefaultTabOptions] = useState([
    // { value: "tab-1", label: "Tab 1" },
    // { value: "tab-2", label: "Tab 2" },
  ]);
  const [defaultTab, setDefaultTab] = useState(defaultTabOptions[0]);
  const [tabsPosition, setTabsPosition] = useState(tabsPositionOptions[0]);

  const sectionIdCheck = isEditing ? currentSection.id : setting.id;

  const removeTab = useCallback(
    (tabToRemove) => {
      setDefaultTabOptions((prevOptions) => {
        const updatedOptions = prevOptions.filter(
          (option) => option.value !== tabToRemove
        );

        // Cek apakah tab yang dipilih dihapus
        if (tabToRemove === defaultTab?.value) {
          setDefaultTab(updatedOptions[0]);
          handleChangeWrapperStyle("defaultTab", updatedOptions[0].value);
        }

        return updatedOptions;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultTab, sectionIdCheck, setPreviewSection]
  );

  const [timers, setTimers] = useState({});
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
                      ...column,
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
        id: `Tab-${uniqueIdColumn1}`,
        name: `Tab 1`,
        icon: {},
        image: "",

        content: [
          {
            id: `text-${uniqueIdColumn1}`,
            name: "text",
            title: "Teks",
            content: {
              editorHtml: "<b>TABS 1</b>",
              style: {
                textAlign: "center",
                color: "#000000",
                fontSize: 18,
              },
            },
            background,
          },
        ],
        background,
      },
      {
        id: `Tab-${uniqueIdColumn2}`,
        name: `Tab 2`,
        icon: {},
        image: "",

        content: [
          {
            id: `text-${uniqueIdColumn2}`,
            name: "text",
            title: "Teks",
            content: {
              editorHtml: "<b>TABS 2</b>",
              style: {
                textAlign: "center",
                color: "#000000",
                fontSize: 18,
              },
            },
            background,
          },
        ],
        background,
      },
    ];

    setDefaultTabOptions((prev) => [
      ...prev,
      ...columns.map((column) => ({
        value: column.id,
        label: column.name,
      })),
    ]);

    let payload = {
      id: uniqueId,
      name: "tabs",
      title: "Tabs",
      content: columns,
      wrapperStyle: {
        bgColor: "#F5F5F5",
        activeBg: "#ffffff",
        textColor: "#BDBDBD",
        textHover: "#fa541c",
        activeText: "#fa541c",
        lineTab: "#E0E0E0",
        lineContent: "#E0E0E0",
        fontSize: 17,
        tabsPosition: "top",
        defaultTab: `Tab-${uniqueIdColumn1}`,
        iconSize: 24,
        imageSize: 30,
      },
      background,
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
    setTmpColumns(columns);
  };
  const handleAddColumn = () => {
    const columnLength =
      previewSection.find((section) => section.id === sectionIdCheck)?.content
        .length + 1 || 0;

    let uniqueId = createUniqueID(tmp_columns);
    const newColumn = {
      id: `Tab-${uniqueId}`,
      name: `Tab ${columnLength}`,
      icon: "",
      image: "",
      content: [initialColumn],
      background,
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

    setDefaultTabOptions((prev) => [
      ...prev,
      { value: `Tab-${uniqueId}`, label: `Tab ${prev.length + 1}` },
    ]);

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
              showInfoText={column.name}
              moveSection={(dragIndex, hoverIndex) =>
                moveSectionColumn(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editSectionColumn(column)}
              removeSection={() => {
                removeSectionColumn(section.id, index);
                removeTab(column.id);
              }}
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
      removeTab,
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
                      ...column,
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
    if (defaultTabOptions.length > 0) {
      const currentDefaultTab = defaultTabOptions.find((opt) =>
        opt.value === isEditing
          ? currentSection?.wrapperStyle?.defaultTab
          : setting?.wrapperStyle?.defaultTab
      );

      if (currentDefaultTab) {
        setDefaultTab(currentDefaultTab);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, defaultTabOptions]);

  useEffect(() => {
    if (isEditing) {
      const currentDefaultTabOptions = previewSection.find(
        (section) => section.id === sectionIdCheck
      )?.content;

      if (currentDefaultTabOptions) {
        setDefaultTabOptions((prev) => {
          // Ambil ID yang sudah ada di defaultTabOptions untuk menghindari duplikasi
          const existingIds = new Set(prev.map((opt) => opt.value));

          return [
            ...prev,
            ...currentDefaultTabOptions
              .filter((column) => !existingIds.has(column.id)) // Hanya yang belum ada
              .map((column) => ({
                value: column.id,
                label: column.name,
              })),
          ];
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSection, isEditing]);

  useEffect(() => {
    if (isEditing) {
      const currentDefaultTab = defaultTabOptions.find(
        (opt) => opt.value === currentSection?.wrapperStyle?.defaultTab
      );

      if (currentDefaultTab) {
        setDefaultTab(currentDefaultTab);
      }

      const currentTabsPostion = tabsPositionOptions.find(
        (opt) => opt.value === currentSection?.wrapperStyle?.tabsPosition
      );

      if (currentTabsPostion) {
        setTabsPosition(currentTabsPostion);
      }

      if (currentSection?.content && !isEditingSection) {
        setEditingSection(true);
        setTmpColumns(currentSection.content);
      }
    }
  }, [currentSection, defaultTabOptions, isEditing, isEditingSection]);

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
    { value: "tabs", label: "Tabs" },
    { value: "design", label: "Desain" },
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
              <b>Tabs</b>
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
          previewFloatingSection={previewFloatingSection}
          setPreviewFloatingSection={setPreviewFloatingSection}
          handleSectionContentFocus={handleSectionContentFocus}
          setParentSection={(value) => setPreviewSection(value)}
          sectionIdCheck={sectionIdCheck}
          setSelectedColumn={setSelectedColumn}
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
              <CTabPane className="p-2" data-tab="tabs">
                <div>
                  <div
                    style={{ gap: 10 }}
                    className="d-flex align-items-center mb-2"
                  >
                    <SelectOptions
                      label="Tab Default"
                      options={defaultTabOptions}
                      onChange={(selectedOption) => {
                        setDefaultTab(selectedOption);
                        handleChangeWrapperStyle(
                          "defaultTab",
                          selectedOption.value
                        );
                      }}
                      value={defaultTab}
                      width="50"
                    />
                    <SelectOptions
                      label="Posisi Tab"
                      options={tabsPositionOptions}
                      onChange={(selectedOption) => {
                        setTabsPosition(selectedOption);
                        handleChangeWrapperStyle(
                          "tabsPosition",
                          selectedOption.value
                        );
                      }}
                      value={tabsPosition}
                      width="50"
                    />
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

              <CTabPane className="p-2" data-tab="design">
                <UpdateDesign
                  setPreviewSection={setPreviewSection}
                  currentSection={isEditing ? currentSection : setting}
                  currentColumn={selectedColumn}
                  handleChangeWrapperStyle={handleChangeWrapperStyle}
                />
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

export default Tabs;
