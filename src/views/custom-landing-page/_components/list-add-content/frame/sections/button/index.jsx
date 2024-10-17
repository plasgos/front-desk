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
import { alignOptions } from "../../../../SelectOptions";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import { useRemoveSectionFrame } from "../../hooks/useRemoveSectionFrame";
import { useMoveSectionFrame } from "../../hooks/useMoveSectionFrame";
import { DraggableList } from "../../../../common/DraggableList";
import { addNewSection } from "../../helper/addNewSection";
import { cancelNewSection } from "../../helper/cancelNewSection";
import { cancelAddSectionContent } from "../../helper/cancelAddSectionContent";
import UpdateContent from "./UpdateContent";
import SelectOptions from "../../../../common/SelectOptions";
import BackgroundTabFrame from "../../common/BackgroundTabFrame";
import { changeWrapperStyleFrame } from "../../helper/changeWrapperStyle";

export const distanceOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export const flexOptions = [
  { value: "tw-flex-row", label: "Horizontal" },
  { value: "tw-flex-col", label: "Vertical" },
];

const Buttons = ({
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
  const [selectedContent, setSelectedContent] = useState({});
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const [selectedDistance, setSelectedDistance] = useState(distanceOptions[2]);
  const [selectedAlign, setSelectedAlign] = useState(alignOptions[1]);
  const [selectedFlex, setSelectedFlex] = useState(flexOptions[0]);

  const [isListIconVisible, setIsListIconVisible] = useState(false);

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  useEffect(() => {
    if (isEditingSection) {
      const { wrapperStyle: { marginX, flexDirection, jusctifyContent } = {} } =
        currentSection || {};

      const distanceOption = distanceOptions.find(
        (opt) => opt.value === marginX
      );
      if (distanceOption) {
        setSelectedDistance(distanceOption);
      }

      const flexDirectionOption = flexOptions.find(
        (opt) => opt.value === flexDirection
      );
      if (flexDirectionOption) {
        setSelectedFlex(flexDirectionOption);
      }

      const jusctifyContentOption = alignOptions.find(
        (opt) => opt.value === jusctifyContent
      );
      if (jusctifyContentOption) {
        setSelectedAlign(jusctifyContentOption);
      }
    }
  }, [currentSection, isEditingSection]);

  const handleChangeWrapperStyle = (key, selectedOption) => {
    const newValue = {
      [key]: selectedOption.value,
    };
    changeWrapperStyleFrame(
      setPreviewSection,
      sectionId,
      contentIdToCheck,
      newValue
    );
  };

  const handleCancel = () => {
    if (isAddContent && !isListIconVisible) {
      setIsAddContent(false);
      setIsEditingContent(false);
      cancelAddSectionContent(setPreviewSection, sectionId, contentIdToCheck);
    } else if (isEditingContent && !isListIconVisible) {
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
      cancelNewSection(setPreviewSection, sectionId, setting.id);
    }
  };

  const handleConfirm = () => {
    if (isListIconVisible) {
      setIsListIconVisible(false);
    } else if (isAddContent || isEditingContent) {
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
      name: "button",
      title: "Tombol",
      content: [
        {
          id: createUniqueID([]),
          content: {
            title: "Please Click Me",
            style: {
              btnColor: "#2196F3",
              textColor: "#FFFFFF",
              variant: "fill",
              rounded: "tw-rounded",
              buttonSize: "md",
              shadow: "tw-shadow",
            },
          },
          target: {},
        },
        {
          id: createUniqueID([{ id: createUniqueID([]) }]),
          content: {
            title: "Dont't Click Me",
            style: {
              btnColor: "#EF5350",
              textColor: "#FFFFFF",
              variant: "fill",
              rounded: "tw-rounded",
              buttonSize: "md",
              shadow: "tw-shadow",
            },
          },
          target: {},
        },
      ],
      wrapperStyle: {
        jusctifyContent: "tw-justify-center",
        flexDirection: "tw-flex-row",
        marginX: "2",
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
            showInfoText={contentItem.content?.title}
            showThumbnail={contentItem.content?.image}
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

  return (
    <div>
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
            {!isListIconVisible && (
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
                  style={{ height: 380, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <UpdateContent
                    sectionId={sectionId}
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={isEditingSection ? currentSection : setting}
                    setPreviewSection={setPreviewSection}
                    isListIconVisible={isListIconVisible}
                    setIsListIconVisible={setIsListIconVisible}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditingContent ? (
              <CTabs>
                <CTabContent
                  style={{ height: 380, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <UpdateContent
                    sectionId={sectionId}
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={selectedContent}
                    setPreviewSection={setPreviewSection}
                    isListIconVisible={isListIconVisible}
                    setIsListIconVisible={setIsListIconVisible}
                    isEditingContent={true}
                  />
                </CTabContent>
              </CTabs>
            ) : (
              <CTabs activeTab="konten">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="konten">Konten</CNavLink>
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
                            label="Align"
                            options={alignOptions}
                            onChange={(selectedOption) => {
                              setSelectedAlign(selectedOption);
                              handleChangeWrapperStyle(
                                "jusctifyContent",
                                selectedOption
                              );
                            }}
                            value={selectedAlign}
                            width="50"
                          />

                          <SelectOptions
                            label="Jarak"
                            options={distanceOptions}
                            onChange={(selectedOption) => {
                              setSelectedDistance(selectedOption);
                              handleChangeWrapperStyle(
                                "marginX",
                                selectedOption
                              );
                            }}
                            value={selectedDistance}
                            width="50"
                          />
                        </div>

                        <SelectOptions
                          label="Barisan"
                          options={flexOptions}
                          onChange={(selectedOption) => {
                            setSelectedFlex(selectedOption);
                            handleChangeWrapperStyle(
                              "flexDirection",
                              selectedOption
                            );
                          }}
                          value={selectedFlex}
                          width="50"
                        />

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

export default Buttons;
