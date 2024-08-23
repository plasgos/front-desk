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

import AddButton from "../list-add-content/button/AddButton";
import EditButton from "../list-add-content/button/EditButton";
import SelectOptions from "../common/SelectOptions";
import {
  distanceOptions,
  flexOptions,
} from "../list-add-content/button/ListButtonControl";
import { IoAdd } from "react-icons/io5";
import { alignOptions } from "../SelectOptions";
import { DraggableList } from "../common/DraggableList";

const EditListButton = ({
  curentSection,
  previewSection,
  setPreviewSection,
  isShowContent,
  sectionBeforeEdit,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});

  const [beforeEditPrevSection, setBeforeEditPrevSection] = useState([]);

  const [selectedDistance, setSelectedDistance] = useState(undefined);
  const [selectedAlign, setSelectedAlign] = useState(undefined);
  const [selectedFlex, setSelectedFlex] = useState(undefined);

  const handleChangeDistance = (selectedOption) => {
    setSelectedDistance(selectedOption);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === curentSection.id
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
        String(item.id) === curentSection.id
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
        String(item.id) === curentSection.id
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

  useEffect(() => {
    const currentSection = previewSection.find(
      (section) => String(section.id) === curentSection.id
    );
    if (currentSection) {
      const distanceOption = distanceOptions.find(
        (opt) => opt.value === currentSection.wrapperStyle?.marginX
      );
      if (distanceOption) {
        setSelectedDistance(distanceOption);
      }

      const flexDirectionOption = flexOptions.find(
        (opt) => opt.value === currentSection.wrapperStyle?.flexDirection
      );
      if (flexDirectionOption) {
        setSelectedFlex(flexDirectionOption);
      }

      const jusctifyContentOption = alignOptions.find(
        (opt) => opt.value === currentSection.wrapperStyle?.jusctifyContent
      );
      if (jusctifyContentOption) {
        setSelectedAlign(jusctifyContentOption);
      }
    }
  }, [curentSection.id, previewSection]);

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const handelCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditing(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === curentSection.id
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section
        )
      );
    } else if (isEditing) {
      setPreviewSection([...beforeEditPrevSection]);
      setIsAddContent(false);
      setIsEditing(false);
    } else {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    }
  };

  const handelConfirm = () => {
    if (isAddContent || isEditing) {
      setIsAddContent(false);
      setIsEditing(false);
    } else {
      isShowContent(false);
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

  const editSection = useCallback(
    (section) => {
      setBeforeEditPrevSection([...previewSection]);
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
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={contentItem.content.title}
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
                      idSection={curentSection.id}
                      sections={previewSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {isEditing && (
                    <EditButton
                      idSection={curentSection.id}
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
                        label="Jarak"
                        options={flexOptions}
                        onChange={handleChangeFlexDirection}
                        value={selectedFlex}
                        width="50"
                      />

                      <div>
                        {previewSection
                          .filter((section) => section.id === curentSection.id)
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

export default EditListButton;
