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

import { IoAdd } from "react-icons/io5";
import { ImagesList } from "../list-add-content/list-images/ImagesList";
import { AddImages } from "../list-add-content/list-images/AddImages";
import { EditImages } from "../list-add-content/list-images/EditImages";
import {
  aspectRatioOptions,
  distanceOptions,
  maxColumnOptions,
} from "../list-add-content/list-images/ListImagesContro;";
import { useDispatch } from "react-redux";
import { setLandingPageSection } from "../../../../redux/modules/custom-landing-page/reducer";

const EditListImages = ({
  id,
  previewSection,
  setPreviewSection,
  sections,
  setSections,
  isShowContent,
  sectionBeforeEdit,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});

  const [beforeEditPrevSection, setBeforeEditPrevSection] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(undefined);
  const [selectedMaxColumn, setSelectedMaxColumn] = useState(undefined);
  const [selectedImageRatio, setSelectedImageRatio] = useState(undefined);
  console.log("🚀 ~ selectedImageRatio:", selectedImageRatio);

  const handleChangeDistance = (selectedOption) => {
    setSelectedDistance(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === id
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
        String(item.id) === id
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
    setSelectedMaxColumn(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === id
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

  useEffect(() => {
    const selectedSectionToEdit = previewSection.find(
      (section) => String(section.id) === id
    );
    if (selectedSectionToEdit) {
      const distanceOption = distanceOptions.find(
        (opt) => opt.value === selectedSectionToEdit.wrapperStyle?.paddingX
      );
      if (distanceOption) {
        setSelectedDistance(distanceOption);
      }

      const maxColumnOption = maxColumnOptions.find(
        (opt) => opt.value === selectedSectionToEdit.wrapperStyle?.maxColumn
      );
      if (maxColumnOption) {
        setSelectedMaxColumn(maxColumnOption);
      }

      const aspectRatioOption = aspectRatioOptions
        .flatMap((opts) => opts.options)
        .find(
          (opt) => opt.value === selectedSectionToEdit.wrapperStyle?.aspectRatio
        );
      if (aspectRatioOption) {
        setSelectedImageRatio(aspectRatioOption);
      }
    }
  }, [id, previewSection]);

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const handelCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditing(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === id
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

  const dispatch = useDispatch();

  const handelConfirm = () => {
    if (isAddContent || isEditing) {
      setIsAddContent(false);
      setIsEditing(false);
      dispatch(setLandingPageSection(previewSection));
    } else {
      isShowContent(false);
      dispatch(setLandingPageSection(previewSection));
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
            <ImagesList
              key={contentItem.id || contentIndex} // Ensure a unique key for each item
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
                      sections={sections}
                      idSection={id}
                      defaultSection={previewSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {isEditing && (
                    <EditImages
                      idSection={id}
                      sections={sections}
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
                            options={aspectRatioOptions}
                            styles={customStyles}
                            onChange={handleChangeImageRatio}
                            isSearchable={false}
                            value={selectedImageRatio}
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
                          />
                        </div>
                      </div>
                      <div>
                        {previewSection
                          .filter((section) => section.id === id)
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

export default EditListImages;
