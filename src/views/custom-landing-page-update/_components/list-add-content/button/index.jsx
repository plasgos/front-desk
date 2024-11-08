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

import { IoAdd } from "react-icons/io5";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { createUniqueID } from "../../../../../lib/unique-id";
import BackgroundTab from "../../common/BackgroundTab";
import Confirmation from "../../common/Confirmation";
import { DraggableList } from "../../common/DraggableList";
import SelectOptions from "../../common/SelectOptions";
import { alignOptions } from "../../SelectOptions";
import UpdateContent from "../floating-button/UpdateContent";

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
  hiddenFocused,
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
    if (isAddContent && !isListIconVisible) {
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
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
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
    <div style={{}}>
      {!isListIconVisible && (
        <Confirmation
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}

      {isAddContent ? (
        <UpdateContent
          idSection={isEditingSection ? currentSection.id : setting.id}
          currentContent={isEditingSection ? currentSection : setting}
          setPreviewSection={setPreviewSection}
          isListIconVisible={isListIconVisible}
          setIsListIconVisible={setIsListIconVisible}
        />
      ) : isEditingContent ? (
        <UpdateContent
          idSection={isEditingSection ? currentSection.id : setting.id}
          currentContent={selectedContent}
          setPreviewSection={setPreviewSection}
          isListIconVisible={isListIconVisible}
          setIsListIconVisible={setIsListIconVisible}
          isEditingContent={true}
        />
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
                        handleChangeWrapperStyle("marginX", selectedOption);
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
                      handleChangeWrapperStyle("flexDirection", selectedOption);
                    }}
                    value={selectedFlex}
                    width="50"
                  />

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

export default Buttons;
