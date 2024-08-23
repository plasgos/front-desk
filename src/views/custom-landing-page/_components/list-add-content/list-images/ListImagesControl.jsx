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
import { AddImages } from "./AddImages";
import { EditImages } from "./EditImages";
import { ImagesList } from "./ImagesList";
import { createUniqueID } from "../../../../../lib/unique-id";
import SelectOptions from "../../common/SelectOptions";
import { DraggableList } from "../../common/DraggableList";

const contents = [
  {
    id: "adguiwbj",
    content: {
      image: image,
    },
    target: {},
  },
  {
    id: "adgdawdw",
    content: {
      image: image,
    },
    target: {},
  },
  {
    id: "feqawd",
    content: {
      image: image,
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

export const maxColumnOptions = [
  {
    value: "tw-w-1/2",
    label: "2",
  },
  { value: "tw-w-1/3", label: "3" },
  { value: "tw-w-1/4", label: "4" },
  { value: "tw-w-1/5", label: "5" },
  { value: "tw-w-1/6", label: "6" },
];

export const aspectRatioOptions = [
  {
    label: "Kotak",
    options: [{ value: 1 / 1, label: "1:1" }],
  },
  {
    label: "Melebar",
    options: [
      { value: 5 / 4, label: "5:4" },
      { value: 4 / 3, label: "4:3" },
      { value: 5 / 3, label: "5:3" },
      { value: 2 / 1, label: "2:1" },
    ],
  },
  {
    label: "Potret",
    options: [
      { value: 4 / 5, label: "4:5" },
      { value: 3 / 4, label: "3:4" },
      { value: 3 / 5, label: "3:5" },
      { value: 1 / 2, label: "1:2" },
    ],
  },
];

const ListImagesControl = ({
  previewSection,
  setPreviewSection,
  isShowContent,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [defaultSection, setDefaultSection] = useState(contents || []);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const [selectedDistance, setSelectedDistance] = useState(distanceOptions[2]);
  const [selectedMaxColumn, setSelectedMaxColumn] = useState(
    maxColumnOptions[4]
  );
  const [selectedImageRatio, setSelectedImageRatio] = useState(
    aspectRatioOptions[0].options[0]
  );

  const handleChangeDistance = (selectedOption) => {
    setSelectedDistance(selectedOption);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                paddingX: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeMaxColumn = (selectedOption) => {
    setSelectedMaxColumn(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                maxColumn: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeImageRatio = (selectedOption) => {
    setSelectedImageRatio(selectedOption);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                aspectRatio: selectedOption.value,
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
    } else {
      isShowContent(false);
    }
  };

  const moveSection = useCallback(
    (dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === "list-images") {
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
      name: "list-images",
      title: "List Images",
      content: defaultSection,
      wrapperStyle: {
        paddingX: "2",
        maxColumn: "tw-w-1/6",
        aspectRatio: 1 / 1,
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
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showThumbnail={contentItem?.content?.image}
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
                {/* <CButton onClick={() => {}} variant="ghost">
                <IoSearch style={{ cursor: "pointer" }} size={18} />
              </CButton> */}
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

            <CTabs activeTab="kolom">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="kolom">Kolom</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent
                style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                className="pt-3"
              >
                <CTabPane className="p-1" data-tab="kolom">
                  {isAddContent && (
                    <AddImages
                      idSection={setting.id}
                      defaultSection={defaultSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {isEditing && (
                    <EditImages
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
                          label="Kolom Maksimal"
                          options={maxColumnOptions}
                          onChange={handleChangeMaxColumn}
                          value={selectedMaxColumn}
                          width="50"
                        />

                        <SelectOptions
                          label="Rasio Gambar"
                          options={aspectRatioOptions}
                          onChange={handleChangeImageRatio}
                          value={selectedImageRatio}
                          width="50"
                        />
                      </div>
                      <div>
                        <SelectOptions
                          label="Jarak"
                          options={distanceOptions}
                          onChange={handleChangeDistance}
                          value={selectedDistance}
                          width="50"
                        />
                      </div>

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
              </CTabContent>
            </CTabs>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default ListImagesControl;
