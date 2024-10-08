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

import image from "../../../../../assets/action-figure.jpg";

import { IoAdd } from "react-icons/io5";
import { createUniqueID } from "../../../../../lib/unique-id";
import SelectOptions from "../../common/SelectOptions";
import { DraggableList } from "../../common/DraggableList";
import {
  aspectRatioOptions,
  distanceOptions,
  maxColumnOptions,
} from "../../SelectOptions";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { UpdateContent } from "./UpdateContent";
import BackgroundTab from "../../common/BackgroundTab";

const ListImages = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  handleSectionContentFocus,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const [selectedDistance, setSelectedDistance] = useState(distanceOptions[2]);
  const [selectedMaxColumn, setSelectedMaxColumn] = useState(
    maxColumnOptions[4]
  );
  const [selectedImageRatio, setSelectedImageRatio] = useState(
    aspectRatioOptions[0].options[0]
  );

  useEffect(() => {
    if (isEditingSection) {
      const { wrapperStyle: { paddingX, maxColumn, aspectRatio } = {} } =
        currentSection || {};

      const currentMaxColumnOption = maxColumnOptions.find(
        (opt) => opt.value === maxColumn
      );

      if (currentMaxColumnOption) {
        setSelectedMaxColumn(currentMaxColumnOption);
      }

      const currentDistanceOption = distanceOptions.find(
        (opt) => opt.value === paddingX
      );

      if (currentDistanceOption) {
        setSelectedDistance(currentDistanceOption);
      }

      const currentAcpectRatioOption = aspectRatioOptions.flatMap((ratio) =>
        ratio.options.find((opt) => opt.value === aspectRatio)
      );

      if (currentAcpectRatioOption) {
        setSelectedImageRatio(currentAcpectRatioOption);
      }
    }
  }, [currentSection, isEditingSection]);

  const handleChangeWrapperStyle = (key, selectedOption) => {
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
                [key]: selectedOption.value,
              },
            }
          : item;
      })
    );
  };

  const handleCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id === contentIdToCheck
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section;
        })
      );
    } else if (isEditingContent) {
      setPreviewSection([...currentContentBeforeEdit]);
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
      name: "list-images",
      title: "List Images",
      content: [
        {
          id: createUniqueID([]),
          content: {
            image: image,
            alt: "",
          },
          target: {},
        },
        {
          id: createUniqueID([{ id: createUniqueID([]) }]),
          content: {
            image: image,
            alt: "",
          },
          target: {},
        },
        {
          id: createUniqueID([{ id: createUniqueID([]) }]),
          content: {
            image: image,
            alt: "",
          },
          target: {},
        },
      ],
      wrapperStyle: {
        paddingX: "2",
        maxColumn: "tw-w-1/6",
        aspectRatio: 1 / 1,
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
              showThumbnail={contentItem?.content?.image}
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
              handleFocus={() => handleSectionContentFocus(contentItem.id)}
            />
          ))}
        </div>
      );
    },
    [moveSection, handleSectionContentFocus, editSection, removeSection]
  );

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
                  <UpdateContent
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
                  <UpdateContent
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={selectedContent}
                    setPreviewSection={setPreviewSection}
                    isEditingContent={true}
                  />
                </CTabContent>
              </CTabs>
            ) : (
              <CTabs activeTab="kolom">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="kolom">Kolom</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="background">Background</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <CTabPane className="p-1" data-tab="kolom">
                    {!isAddContent && !isEditingContent && (
                      <>
                        <div
                          style={{ gap: 10 }}
                          className="d-flex align-items-center "
                        >
                          <SelectOptions
                            label="Kolom Maksimal"
                            options={maxColumnOptions}
                            onChange={(selectedOption) => {
                              setSelectedMaxColumn(selectedOption);
                              handleChangeWrapperStyle(
                                "maxColumn",
                                selectedOption
                              );
                            }}
                            value={selectedMaxColumn}
                            width="50"
                          />

                          <SelectOptions
                            label="Rasio Gambar"
                            options={aspectRatioOptions}
                            onChange={(selectedOption) => {
                              setSelectedImageRatio(selectedOption);
                              handleChangeWrapperStyle(
                                "aspectRatio",
                                selectedOption
                              );
                            }}
                            value={selectedImageRatio}
                            width="50"
                          />
                        </div>
                        <div>
                          <SelectOptions
                            label="Jarak"
                            options={distanceOptions}
                            onChange={(selectedOption) => {
                              setSelectedDistance(selectedOption);
                              handleChangeWrapperStyle(
                                "paddingX",
                                selectedOption
                              );
                            }}
                            value={selectedDistance}
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

export default ListImages;
