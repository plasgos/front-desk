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

import { UpdateContent } from "./UpdateContent";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import BackgroundTabMultiColumnContent from "../../common/BackgroundTabMultiColumnContent";
import { useRemoveContentMultiColumn } from "../../hooks/useRemoveContentMultiColumn";
import { useMoveContentMultiColumn } from "../../hooks/useMoveContentMultiColumn";
import { useDispatch, useSelector } from "react-redux";
import { DraggableList } from "../../../../common/DraggableList";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import SelectOptions from "../../../../common/SelectOptions";
import {
  aspectRatioOptions,
  distanceOptions,
  maxColumnOptions,
} from "../../../../SelectOptions";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import { cancelSectionContentLastIndex } from "../../helper/cancelSectionContentLastIndex";

const initialContents = [
  {
    id: "adguiwbj",
    content: {
      image: image,
      alt: "",
    },
    target: {},
  },
  {
    id: "adgdawdw",
    content: {
      image: image,
      alt: "",
    },
    target: {},
  },
  {
    id: "feqawd",
    content: {
      image: image,
      alt: "",
    },
    target: {},
  },
];

const ListImages = ({
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

  const [selectedDistance, setSelectedDistance] = useState(distanceOptions[2]);
  const [selectedMaxColumn, setSelectedMaxColumn] = useState(
    maxColumnOptions[4]
  );
  const [selectedImageRatio, setSelectedImageRatio] = useState(
    aspectRatioOptions[0].options[0]
  );

  const contentIdCheck = isEditingSection ? currentSection.id : setting.id;

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
    cancelSectionContentLastIndex(
      setPreviewSection,
      sectionId,
      columnId,
      contentIdCheck
    );

    setPreviewSection((arr) =>
      arr.map((section) =>
        String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === contentIdCheck
                          ? {
                              ...content,
                              wrapperStyle: {
                                ...content.wrapperStyle,
                                [key]: selectedOption.value,
                              },
                            }
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
      )
    );
  };

  const handleCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);

      cancelSectionContentLastIndex(
        setPreviewSection,
        sectionId,
        columnId,
        contentIdCheck
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
            hiddenFocus={true}
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
                    idSection={
                      isEditingSection ? currentSection.id : setting.id
                    }
                    currentContent={isEditingSection ? currentSection : setting}
                    setPreviewSection={setPreviewSection}
                    sectionId={sectionId}
                    columnId={columnId}
                  />
                </CTabContent>
              </CTabs>
            ) : isEditingContent ? (
              <CTabs>
                <CTabContent style={{ overflowY: "auto" }} className="pt-3">
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
                    <CNavLink data-tab="background">Background</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent style={{ overflowY: "auto" }} className="pt-3">
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

export default ListImages;
