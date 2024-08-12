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
import { AddContent } from "./AddContent";
import { EditContent } from "./EditContent";
import { CardList } from "./CardList";
import { MdViewColumn } from "react-icons/md";
import { createUniqueID } from "../../../../../lib/unique-id";
import {
  aspectRatioOptions,
  distanceOptions,
  maxColumnOptions,
} from "../list-images/ListImagesControl";
import SelectOptions from "../../common/SelectOptions";
import ColorPicker from "../../common/ColorPicker";
import { fontSizeOptions } from "../../SelectOptions";

const contents = [
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

const ColumnSection = ({
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

  const [selectedColorTitle, setSelectedColorTitle] = useState("#000000");

  const [selectedColorDesc, setSelectedColorDesc] = useState("#000000");

  const [selectedDistance, setSelectedDistance] = useState(distanceOptions[2]);
  const [selectedMaxColumn, setSelectedMaxColumn] = useState(
    maxColumnOptions[1]
  );
  const [selectedImageRatio, setSelectedImageRatio] = useState(
    aspectRatioOptions[0].options[0]
  );

  const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[1]);

  const handleChangeFontSize = (selectedOption) => {
    setSelectedFontSize(selectedOption);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
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

  const handleColorChangeTitle = (color) => {
    setSelectedColorTitle(color);
    setPreviewSection((arr) =>
      arr.map((item) =>
        String(item.id) === setting.id
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
        String(item.id) === setting.id
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

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "column-text-and-image",
      title: "Column Text And Image",
      icon: <MdViewColumn size={20} />,
      content: defaultSection,
      wrapperStyle: {
        paddingX: 2,
        maxColumn: "33.33%",
        aspectRatio: 1 / 1,
        colorTitle: "#000000",
        colorDescription: "#000000",
        fontSizeTitle: "18",
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
                <CTabPane className="p-1" data-tab="kolom">
                  {isAddContent && (
                    <AddContent
                      idSection={setting.id}
                      sections={defaultSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {isEditing && (
                    <EditContent
                      idSection={setting.id}
                      selectedSectionToEdit={selectedSection}
                      setPreviewSection={setPreviewSection}
                    />
                  )}

                  {!isAddContent && !isEditing && (
                    <>
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

                <CTabPane className="p-1" data-tab="desain">
                  <div
                    style={{ gap: 10 }}
                    className="d-flex align-items-center mb-3"
                  >
                    <ColorPicker
                      initialColor={selectedColorTitle}
                      label="Tombol"
                      onChange={handleColorChangeTitle}
                    />

                    <ColorPicker
                      initialColor={selectedColorDesc}
                      label="Warna Deskripsi"
                      onChange={handleColorChangeDesc}
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
                      positionShown="top"
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

export default ColumnSection;
