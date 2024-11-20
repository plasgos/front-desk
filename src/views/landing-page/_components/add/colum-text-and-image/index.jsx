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

import image from "../../../../../assets/action-figure.jpg";

import { IoAdd } from "react-icons/io5";
import { createUniqueID } from "../../../../../lib/unique-id";

import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import BackgroundTab from "../../common/BackgroundTab";
import Confirmation from "../../common/Confirmation";
import { DraggableList } from "../../common/DraggableList";
import DesignTab from "./DesignTab";
import { UpdateContent } from "./UpdateContent";

const ColumnTextAndImages = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  handleSectionContentFocus,
  hiddenFocused,
  isMultiColumn,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);

  const [selectedContent, setSelectedContent] = useState({});
  const [setting, setSetting] = useState({});

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

    const id = isMultiColumn
      ? `multi-column-${uniqueId}`
      : `parent-${uniqueId}`;

    let payload = {
      id,
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
              showInfoText={contentItem.content?.title}
              showThumbnail={contentItem.content?.image}
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

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      {isAddContent ? (
        <CTabs>
          <CTabContent
            style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
            className="p-3"
          >
            <UpdateContent
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
            <UpdateContent
              idSection={isEditingSection ? currentSection.id : setting.id}
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
          <CTabContent
            style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
            className="p-3"
          >
            <CTabPane className="p-1" data-tab="kolom">
              {!isAddContent && !isEditingContent && (
                <>
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
              style={{ height: "100vh" }}
              className="p-1"
              data-tab="desain"
            >
              <DesignTab
                setPreviewSection={setPreviewSection}
                currentSection={isEditingSection ? currentSection : setting}
                isEditingSection={isEditingSection}
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="background">
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

export default ColumnTextAndImages;
