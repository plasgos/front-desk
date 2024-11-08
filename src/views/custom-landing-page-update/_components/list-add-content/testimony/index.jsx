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

import { FaStar } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import profilePicture from "../../../../../assets/profile.jpg";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { createUniqueID } from "../../../../../lib/unique-id";
import { columnTestimonyOptions } from "../../SelectOptions";
import BackgroundTab from "../../common/BackgroundTab";
import { DraggableList } from "../../common/DraggableList";
import InputRangeWithNumber from "../../common/InputRangeWithNumber";
import SelectOptions from "../../common/SelectOptions";
import DesignTab from "./DesignTab";
import { UpdateContents } from "./UpdateContents";
import { UpdateShapes } from "./UpdateShapes";
import Confirmation from "../../common/Confirmation";

const Testimony = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  handleSectionContentFocus,
  hiddenFocused,
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

  const handleChangeColumnTestimony = (selectedOptionValue) => {
    setSelectedColumnTestimony(selectedOptionValue);
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
                column: selectedOptionValue.value,
              },
            }
          : item;
      })
    );
  };

  const handleCancel = () => {
    const resetSectionContent = (key) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === (isEditingSection ? currentSection.id : setting.id)
            ? { ...section, [key]: section[key].slice(0, -1) }
            : section
        )
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
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
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

  const removeSection = useRemoveSection(setPreviewSection);
  const moveSection = useMoveSection(setPreviewSection);

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
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
              handleFocus={() => handleSectionContentFocus(contentItem.id)}
              hiddenFocus={hiddenFocused}
            />
          ))}
        </div>
      );
    },
    [
      hiddenFocused,
      moveSection,
      editSection,
      removeSection,
      handleSectionContentFocus,
    ]
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
              hiddenFocus={true}
            />
          ))}
        </div>
      );
    },
    [editSectionShape, moveSectionShape, removeSectionShape]
  );

  const handleUpdateSectionWrapperStyle = (key, value) => {
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
    if (key === "paddingTop") {
      setPaddingTop(newValue);
    } else if (key === "paddingBottom") {
      setPaddingBottom(newValue);
    }
    handleUpdateSectionWrapperStyle(key, newValue);
  };

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      {isAddContent ? (
        <CTabs>
          <CTabContent
            style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
            className="p-3"
          >
            <UpdateContents
              idSection={isEditingSection ? currentSection.id : setting.id}
              currentContent={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
            />
          </CTabContent>
        </CTabs>
      ) : isEditingContent ? (
        <CTabs>
          <CTabContent
            style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
            className="p-3"
          >
            <UpdateContents
              idSection={isEditingSection ? currentSection.id : setting.id}
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
              idSection={isEditingSection ? currentSection.id : setting.id}
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
              idSection={isEditingSection ? currentSection.id : setting.id}
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
                      label="Kolom"
                      options={columnTestimonyOptions}
                      onChange={handleChangeColumnTestimony}
                      value={selectedColumnTestimony}
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
              {Object.keys(isEditingSection ? currentSection : setting).length >
              0 ? (
                <DesignTab
                  currentSection={isEditingSection ? currentSection : setting}
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
                    handleUpdateSectionWrapperStyle("paddingTop", newValue);
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
                    handleUpdateSectionWrapperStyle("paddingBottom", newValue);
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
                        .filter((section) =>
                          isEditingSection
                            ? section.id === currentSection.id
                            : section.id === setting.id
                        )
                        .map((section, i) => renderSectionShape(section, i))}
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

            <CTabPane className="p-1" data-tab="wadah">
              <BackgroundTab
                currentSection={isEditingSection ? currentSection : setting}
                setPreviewSection={setPreviewSection}
                type={isEditingSection ? "edit" : "add"}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default Testimony;
