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

import image from "../../../../../../../assets/action-figure.jpg";

import { IoAdd } from "react-icons/io5";

import DesignTab from "./DesignTab";
import { UpdateContent } from "./UpdateContent";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import { DraggableList } from "../../../../common/DraggableList";
import BackgroundTabFrame from "../../common/BackgroundTabFrame";
import { useRemoveSectionFrame } from "../../hooks/useRemoveSectionFrame";
import { useMoveSectionFrame } from "../../hooks/useMoveSectionFrame";
import { addNewSection } from "../../helper/addNewSection";
import { cancelNewSection } from "../../helper/cancelNewSection";
import { cancelAddSectionContent } from "../../helper/cancelAddSectionContent";

const ColumnTextAndImages = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  sectionId,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  const handleCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);

      cancelAddSectionContent(setPreviewSection, sectionId, contentIdToCheck);
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
      cancelNewSection(setPreviewSection, sectionId, setting.id);
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
      name: "column-text-and-image",
      title: "Column Text And Image",
      content: [
        {
          id: createUniqueID([]),
          content: {
            title: "Rahasia ",
            description:
              "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
            image: image,
          },
          target: {},
        },
        {
          id: createUniqueID([{ id: createUniqueID([]) }]),
          content: {
            title: "Rahasia untuk maju adalah memulai",
            description:
              "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
            image: image,
          },
          target: {},
        },
        {
          id: createUniqueID([{ id: createUniqueID([]) }]),
          content: {
            title: "Rahasia untuk maju adalah memulai",
            description:
              "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
            image: image,
          },
          target: {},
        },
      ],
      wrapperStyle: {
        paddingX: 2,
        maxColumn: "tw-w-1/3",
        aspectRatio: 1 / 1,
        colorTitle: "#000000",
        colorDescription: "#000000",
        fontSizeTitle: "tw-text-sm",
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
          <div>
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
                <CTabContent style={{ overflowY: "auto" }} className="pt-3">
                  <UpdateContent
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
                <CTabContent style={{ overflowY: "auto" }} className="pt-3">
                  <UpdateContent
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
            ) : (
              <CTabs activeTab="kolom">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="kolom">Kolom</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="desain">Desain</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="background">Background</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent style={{ overflowY: "auto" }} className="pt-3">
                  <CTabPane className="p-1" data-tab="kolom">
                    {!isAddContent && !isEditingContent && (
                      <>
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

                  <CTabPane className="p-1" data-tab="desain">
                    <DesignTab
                      sectionId={sectionId}
                      setPreviewSection={setPreviewSection}
                      currentSection={
                        isEditingSection ? currentSection : setting
                      }
                      isEditingSection={isEditingSection}
                    />
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden", height: "100%" }}
                    className="p-1"
                    data-tab="background"
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

export default ColumnTextAndImages;
