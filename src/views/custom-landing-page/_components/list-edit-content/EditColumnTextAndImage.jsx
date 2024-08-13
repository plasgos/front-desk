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
import { AddContent } from "../list-add-content/colum-text-and-image/AddContent";
import { EditContent } from "../list-add-content/colum-text-and-image/EditContent";
import { CardList } from "../list-add-content/colum-text-and-image/CardList";
import {
  aspectRatioOptions,
  distanceOptions,
  maxColumnOptions,
} from "../list-add-content/list-images/ListImagesControl";

import SelectOptions from "../common/SelectOptions";
import ColorPicker from "../common/ColorPicker";
import { fontSizeOptions } from "../SelectOptions";

const EditColumnTextAndImage = ({
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

  const [selectedColorTitle, setSelectedColorTitle] = useState(
    curentSection.wrapperStyle.colorTitle
  );

  const [selectedColorDesc, setSelectedColorDesc] = useState(
    curentSection.wrapperStyle.colorDescription
  );

  const [selectedDistance, setSelectedDistance] = useState(undefined);
  const [selectedMaxColumn, setSelectedMaxColumn] = useState(undefined);
  const [selectedImageRatio, setSelectedImageRatio] = useState(undefined);

  const [selectedFontSize, setSelectedFontSize] = useState(undefined);

  const handleChangeFontSize = (selectedOption) => {
    setSelectedFontSize(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === curentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                fontSizeTitle: selectedOption.value,
              },
            }
          : item
      )
    );
  };

  const handleChangeDistance = (selectedOption) => {
    setSelectedDistance(selectedOption);

    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === curentSection.id
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
        String(item.id) === curentSection.id
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
        String(item.id) === curentSection.id
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

  const handleColorChangeTitle = (color) => {
    setSelectedColorTitle(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === curentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                colorTitle: color,
              },
            }
          : item
      )
    );
  };

  const handleColorChangeDesc = (color) => {
    setSelectedColorDesc(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === curentSection.id
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                colorDescription: color,
              },
            }
          : item
      )
    );
  };

  useEffect(() => {
    const selectedSectionToEdit = previewSection.find(
      (section) => String(section.id) === curentSection.id
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

      const fontSizeOption = fontSizeOptions.find(
        (opt) => opt.value === selectedSectionToEdit.wrapperStyle?.fontSizeTitle
      );
      if (fontSizeOption) {
        setSelectedFontSize(fontSizeOption);
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
          if (section.name === "column-text-and-image") {
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
            <CardList
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
                <CNavItem>
                  <CNavLink data-tab="desain">Desain</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent
                style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                className="pt-3"
              >
                <CTabPane data-tab="kolom">
                  {isAddContent && (
                    <AddContent
                      idSection={curentSection.id}
                      sections={previewSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {isEditing && (
                    <EditContent
                      idSection={curentSection.id}
                      selectedSectionToEdit={selectedSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {!isAddContent && !isEditing && (
                    <>
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

                <CTabPane className="p-1" data-tab="desain">
                  <div
                    style={{ gap: 10 }}
                    className="d-flex align-items-center mb-3"
                  >
                    <ColorPicker
                      initialColor={selectedColorTitle}
                      label="Tombol"
                      onChange={handleColorChangeTitle}
                      bottom={"10px"}
                    />

                    <ColorPicker
                      initialColor={selectedColorDesc}
                      label="Warna Deskripsi"
                      onChange={handleColorChangeDesc}
                      bottom={"10px"}
                    />
                  </div>

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
                      label="Jarak"
                      options={distanceOptions}
                      onChange={handleChangeDistance}
                      value={selectedDistance}
                      width="50"
                    />
                  </div>

                  <h4 className=" my-2">Gambar</h4>
                  <div>
                    <SelectOptions
                      label="Rasio Gambar"
                      options={aspectRatioOptions}
                      onChange={handleChangeImageRatio}
                      value={selectedImageRatio}
                      width="50"
                    />
                  </div>

                  <h4 className=" my-2">Font</h4>
                  <div>
                    <SelectOptions
                      label="Ukuran Judul"
                      options={fontSizeOptions}
                      onChange={handleChangeFontSize}
                      value={selectedFontSize}
                      width="50"
                    />
                  </div>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default EditColumnTextAndImage;
