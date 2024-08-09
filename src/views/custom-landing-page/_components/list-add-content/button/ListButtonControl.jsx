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
import { createUniqueID } from "../../../../../lib/unique-id";
import { RxSwitch } from "react-icons/rx";
import { ButtonList } from "./ButtonList";
import AddButton from "./AddButton";
import SelectOptions from "../../common/SelectOptions";
import EditButton from "./EditButton";

const contents = [
  {
    id: "btn01",
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
    id: "btn02",
    content: {
      title: "Dont't Click Me",
      style: {
        btnColor: "#EF5350",
        textColor: "#FFFFFF",
        variant: "fill",
        rounded: "rounded",
        buttonSize: "md",
        shadow: "shadow",
      },
    },
    target: {},
  },
];

export const distanceOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export const alignOptions = [
  {
    value: "tw-justify-start",
    label: "Kiri",
  },
  {
    value: "tw-justify-center",
    label: "Tengah",
  },
  {
    value: "tw-justify-end",
    label: "Kanan",
  },
];

export const flexOptions = [
  { value: "tw-flex-row", label: "Horizontal" },
  { value: "tw-flex-col", label: "Vertical" },
];

const ListButtonControl = ({
  previewSection,
  setPreviewSection,
  isShowContent,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const [selectedDistance, setSelectedDistance] = useState(distanceOptions[2]);
  const [selectedAlign, setSelectedAlign] = useState(alignOptions[1]);
  const [selectedFlex, setSelectedFlex] = useState(flexOptions[0]);

  const handleChangeDistance = (selectedOption) => {
    setSelectedDistance(selectedOption);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                marginX: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeAlign = (selectedOption) => {
    setSelectedAlign(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                jusctifyContent: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeFlexDirection = (selectedOption) => {
    setSelectedFlex(selectedOption);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                flexDirection: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const handelCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditing(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === setting.id
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section
        )
      );
    } else if (isEditing) {
      setPreviewSection([...sectionBeforeEdit]);
      setIsAddContent(false);
      setIsEditing(false);
    } else {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handelConfirm = () => {
    if (isAddContent || isEditing) {
      setIsAddContent(false);
      setIsEditing(false);
      // dispatch(setLandingPageSection(previewSection));
    } else {
      isShowContent(false);
      // dispatch(setLandingPageSection(previewSection));
    }
  };

  const moveSection = useCallback(
    (dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === "button") {
            const updatedContent = [...section.content];
            const draggedItem = updatedContent[dragIndex];
            updatedContent.splice(dragIndex, 1);
            updatedContent.splice(hoverIndex, 0, draggedItem);
            return { ...section, content: updatedContent };
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
      name: "button",
      icon: <RxSwitch size={20} />,
      content: contents,
      wrapperStyle: {
        jusctifyContent: "tw-justify-center",
        flexDirection: "tw-flex-row",
        marginX: "2",
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    onAddContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editSection = useCallback(
    (section) => {
      setSectionBeforeEdit([...previewSection]);
      setSelectedSection(section);
      setIsEditing(true);
    },
    [previewSection]
  );

  const removeSection = useCallback(
    (sectionId, contentIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.filter((_, i) => i !== contentIndex),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <ButtonList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              section={contentItem}
              moveSection={moveSection}
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [moveSection, editSection, removeSection]
  );

  return (
    <div>
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
            <div className="d-flex justify-content-end align-items-center border-bottom p-2">
              <div>
                <CButton
                  onClick={handelCancel}
                  color="primary"
                  variant="outline"
                  className="mx-2"
                >
                  Batal
                </CButton>

                <CButton onClick={handelConfirm} color="primary">
                  Selesai
                </CButton>
              </div>
            </div>

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
                  {isAddContent && (
                    <AddButton
                      idSection={setting.id}
                      sections={contents}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {isEditing && (
                    <EditButton
                      idSection={setting.id}
                      selectedSectionToEdit={selectedSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {!isAddContent && !isEditing && (
                    <>
                      <div
                        style={{ gap: 10 }}
                        className="d-flex align-items-center "
                      >
                        <SelectOptions
                          label="Align"
                          options={alignOptions}
                          onChange={handleChangeAlign}
                          value={selectedAlign}
                          width="50"
                        />

                        <SelectOptions
                          label="Jarak"
                          options={distanceOptions}
                          onChange={handleChangeDistance}
                          value={selectedDistance}
                          width="50"
                        />
                      </div>

                      <SelectOptions
                        label="Barisan"
                        options={flexOptions}
                        onChange={handleChangeFlexDirection}
                        value={selectedFlex}
                        width="50"
                      />

                      <div>
                        {previewSection
                          .filter((section) => section.id === setting.id)
                          .map((section, i) => renderSection(section, i))}
                      </div>
                      <CCard
                        style={{ cursor: "pointer" }}
                        onClick={handleAddContent}
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
                  <div className="">WADAH</div>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default ListButtonControl;
