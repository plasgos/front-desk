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

import image from "../../../../../../../assets/action-figure.jpg";

import { IoAdd } from "react-icons/io5";

import { createUniqueID } from "../../../../../../../lib/unique-id";
import DesignTab from "./DesignTab";
import { UpdateContent } from "./UpdateContent";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import { DraggableList } from "../../../../common/DraggableList";
import BackgroundTabMultiColumnContent from "../../common/BackgroundTabMultiColumnContent";
import { useMoveContentMultiColumn } from "../../hooks/useMoveContentMultiColumn";
import { useRemoveContentMultiColumn } from "../../hooks/useRemoveContentMultiColumn";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";

const initialContents = [
  {
    id: "adguiwbj",

    content: {
      title: "Rahasia ",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
      image: image,
    },
    target: {},
  },
  {
    id: "adgdawdw",

    content: {
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
      image: image,
    },
    target: {},
  },
  {
    id: "feqawd",

    content: {
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
      image: image,
    },
    target: {},
  },
];

const ColumnTextAndImages = ({
  previewSection,
  setPreviewSection,
  sectionBeforeEdit,
  currentSection,
  sectionId,
  columnId,
}) => {
  const { isEditingSection } = useSelector(
    (state) => state.customLandingPage.multiColumnSection
  );
  const dispatch = useDispatch();

  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const contentIdCheck = isEditingSection ? currentSection.id : setting.id;

  const handleCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.map((content) => {
                          const contentIdToCheck = isEditingSection
                            ? currentSection.id
                            : setting.id;

                          return content.id === contentIdToCheck
                            ? {
                                ...content,
                                content: content.content.slice(0, -1),
                              }
                            : section;
                        }),
                      }
                    : column
                ),
              }
            : section
        )
      );
    } else if (isEditingContent) {
      setPreviewSection([...currentContentBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isEditingSection) {
      dispatch(setIsEditingSection(false));
      setIsAddContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));

      cancelSectionMultiColumn(setPreviewSection, sectionId, columnId, setting);
    }
  };

  const handleConfirm = () => {
    if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
    } else {
      dispatch(setIsEditingColumnSection(false));
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingSection(false));
    }
  };

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "column-text-and-image",
      title: "Column Text And Image",
      content: initialContents,
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
      },
    };

    addSectionMultiColumn(setPreviewSection, sectionId, columnId, payload);

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

  const removeSection = useRemoveContentMultiColumn(setPreviewSection);
  const moveSection = useMoveContentMultiColumn(setPreviewSection);

  const renderSection = useCallback(
    (section) => {
      if (section.id !== sectionId) return null;

      const selectedColumn = section.column.find(
        (column) => column.id === columnId
      );
      if (!selectedColumn) return null;

      const selectedContent = selectedColumn.content.find(
        (content) => content.id === contentIdCheck
      );

      return selectedContent?.content.map((contentItem, contentIndex) => (
        <div key={contentItem.id || contentIndex}>
          <DraggableList
            index={contentIndex}
            id={contentItem.id}
            showInfoText={contentItem.content?.title}
            showThumbnail={contentItem.content?.image}
            moveSection={(dragIndex, hoverIndex) =>
              moveSection(
                section.id,
                columnId,
                contentIdCheck,
                contentItem.id,
                dragIndex,
                hoverIndex
              )
            }
            editSection={() => editSection(contentItem)}
            removeSection={() =>
              removeSection(
                section.id,
                columnId,
                contentIdCheck,
                contentItem.id
              )
            }
          />
        </div>
      ));
    },
    [
      columnId,
      contentIdCheck,
      editSection,
      moveSection,
      removeSection,
      sectionId,
    ]
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
                    currentContent={initialContents}
                    setPreviewSection={setPreviewSection}
                    sectionId={sectionId}
                    columnId={columnId}
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
                    sectionId={sectionId}
                    columnId={columnId}
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
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
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
                      setPreviewSection={setPreviewSection}
                      currentSection={
                        isEditingSection ? currentSection : setting
                      }
                      isEditingSection={isEditingSection}
                      sectionId={sectionId}
                      columnId={columnId}
                    />
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden", height: "100%" }}
                    className="p-1"
                    data-tab="background"
                  >
                    <BackgroundTabMultiColumnContent
                      sectionId={sectionId}
                      columnId={columnId}
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
