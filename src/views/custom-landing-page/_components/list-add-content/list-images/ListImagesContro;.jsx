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
import Select from "react-select";

import image from "../../../../../assets/action-figure.jpg";

import { IoAdd } from "react-icons/io5";
import { AddImages } from "./AddImages";
import { EditImages } from "./EditImages";
import { ImagesList } from "./ImagesList";
import { createUniqueID } from "../../../../../lib/unique-id";
import { IoMdImages } from "react-icons/io";

const contents = [
  {
    id: "adguiwbj",
    content: {
      image: image,
    },
    target: {
      url: {
        url: "",
        isOpenNewTab: false,
      },
      whatApps: {
        phoneNumber: "",
        message: "",
        isOpenNewTab: false,
      },
    },
  },
  {
    id: "adgdawdw",
    content: {
      image: image,
    },
    target: {
      url: {
        url: "",
        isOpenNewTab: false,
      },
      whatApps: {
        phoneNumber: "",
        message: "",
        isOpenNewTab: false,
      },
    },
  },
  {
    id: "feqawd",
    content: {
      image: image,
    },
    target: {
      url: {
        url: "",
        isOpenNewTab: false,
      },
      whatApps: {
        phoneNumber: "",
        message: "",
        isOpenNewTab: false,
      },
    },
  },
];

const distanceOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

const maxColumnOptions = [
  {
    value: "50%",
    label: "2",
  },
  { value: "33.33%", label: "3" },
  { value: "25%", label: "4" },
  { value: "20%", label: "5" },
  { value: "16.66%", label: "6" },
  { value: "14.28%", label: "7" },
  { value: "12.55", label: "8" },
];

const ListImagesControl = ({
  previewSection,
  setPreviewSection,
  setSections,
  isShowContent,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [defaultSection, setDefaultSection] = useState(contents || []);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);

  const [setting, setSetting] = useState({});

  const [selectedDistance, setSelectedDistance] = useState(undefined);
  const [selectedMaxColumn, setSelectedMaxColumn] = useState(undefined);
  const [selectedImageRatio, setSelectedImageRatio] = useState(undefined);

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
                imageRatio: selectedOption.value,
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
      setSections(previewSection);
    } else {
      isShowContent(false);
      setSections(previewSection);
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
      icon: <IoMdImages size={20} />,
      content: defaultSection,
      wrapperStyle: {
        paddingX: 2,
        maxColumn: "16.66%",
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
            <ImagesList
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

  const customStyles = {
    groupHeading: (provided) => ({
      ...provided,
      fontWeight: "bold",
    }),
    control: (baseStyles, state) => ({
      ...baseStyles,
      cursor: "text",
    }),
  };

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
                      sections={defaultSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {isEditing && (
                    <EditImages
                      idSection={setting.id}
                      idContent={selectedSection.id}
                      altValue={selectedSection.content?.alt}
                      target={selectedSection.target}
                      image={selectedSection.content.image}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {!isAddContent && !isEditing && (
                    <>
                      <div
                        style={{ gap: 10 }}
                        className="d-flex align-items-center "
                      >
                        <div className="form-group w-50 ">
                          <label>Kolom Maksimal</label>
                          <Select
                            theme={(theme) => ({
                              ...theme,
                              colors: {
                                ...theme.colors,
                                primary: "#FED4C6",
                                // Set the color when focused
                              },
                            })}
                            classNames={{
                              control: (state) =>
                                state.isFocused
                                  ? "rounded  border-primary"
                                  : "rounded",
                            }}
                            options={maxColumnOptions}
                            styles={customStyles}
                            onChange={handleChangeMaxColumn}
                            isSearchable={false}
                            value={selectedMaxColumn}
                            defaultValue={{
                              value: "16.66%",
                              label: "6",
                            }}
                          />
                        </div>
                        <div className="form-group w-50 ">
                          <label>Rasio Gambar</label>
                          <Select
                            theme={(theme) => ({
                              ...theme,
                              colors: {
                                ...theme.colors,
                                primary: "#FED4C6",
                                // Set the color when focused
                              },
                            })}
                            classNames={{
                              control: (state) =>
                                state.isFocused
                                  ? "rounded  border-primary"
                                  : "rounded",
                            }}
                            options={distanceOptions}
                            styles={customStyles}
                            onChange={handleChangeImageRatio}
                            isSearchable={false}
                            value={selectedImageRatio}
                            defaultValue={{
                              value: 2,
                              label: "2",
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="form-group w-50 ">
                          <label>Jarak</label>
                          <Select
                            theme={(theme) => ({
                              ...theme,
                              colors: {
                                ...theme.colors,
                                primary: "#FED4C6",
                                // Set the color when focused
                              },
                            })}
                            classNames={{
                              control: (state) =>
                                state.isFocused
                                  ? "rounded  border-primary"
                                  : "rounded",
                            }}
                            options={distanceOptions}
                            styles={customStyles}
                            onChange={handleChangeDistance}
                            isSearchable={false}
                            value={selectedDistance}
                            defaultValue={{
                              value: 2,
                              label: "2",
                            }}
                          />
                        </div>
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
