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
import { AddContent } from "./AddContent";
import { EditContent } from "./EditContent";
import { CardList } from "./CardList";
import { MdViewColumn } from "react-icons/md";
import { createUniqueID } from "../../../../../lib/unique-id";
import {
  aspectRatioOptions,
  customStyles,
  distanceOptions,
  maxColumnOptions,
} from "../list-images/ListImagesContro;";
import { ChromePicker } from "react-color";

const contents = [
  {
    id: "adguiwbj",

    content: {
      title: "Rahasia ",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
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
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
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
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
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

export const fontSizeOptions = [
  { value: "16", label: "Kecil" },
  { value: "18", label: "Sedang" },
  { value: "22", label: "Besar" },
  { value: "25", label: "Lebih Besar" },
];

const ColumnSection = ({
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

  const [showColorPickerTitle, setShowColorPickerTitle] = useState(false);
  const [showColorPickerDesc, setShowColorPickerDesc] = useState(false);

  const [selectedColorTitle, setSelectedColorTitle] = useState("#000000");

  const [selectedColorDesc, setSelectedColorDesc] = useState("#000000");

  const [selectedDistance, setSelectedDistance] = useState(undefined);
  const [selectedMaxColumn, setSelectedMaxColumn] = useState(undefined);
  const [selectedImageRatio, setSelectedImageRatio] = useState(undefined);

  const [selectedFontSize, setSelectedFontSize] = useState(undefined);

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

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
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
                      idContent={selectedSection.id}
                      titleValue={selectedSection.content.title}
                      descriptionValue={selectedSection.content.description}
                      image={selectedSection.content.image}
                      target={selectedSection.target}
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
                    <div className="w-50">
                      <div className="mb-1" style={{ fontFamily: "Arial" }}>
                        Warna Teks
                      </div>
                      <div
                        onClick={() =>
                          setShowColorPickerTitle(!showColorPickerTitle)
                        }
                        style={{
                          width: 35,
                          height: 35,
                          backgroundColor: selectedColorTitle,
                          cursor: "pointer",
                        }}
                        className="rounded border"
                      />
                      {showColorPickerTitle && (
                        <div style={popover}>
                          <div
                            style={cover}
                            onClick={() => setShowColorPickerTitle(false)}
                          />
                          <ChromePicker
                            color={selectedColorTitle}
                            Title
                            onChange={(e) => handleColorChangeTitle(e.hex)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="w-50">
                      <div className="mb-1" style={{ fontFamily: "Arial" }}>
                        Warna Deskripsi
                      </div>
                      <div
                        onClick={() =>
                          setShowColorPickerDesc(!showColorPickerDesc)
                        }
                        style={{
                          width: 35,
                          height: 35,
                          backgroundColor: selectedColorDesc,
                          cursor: "pointer",
                        }}
                        className="rounded border"
                      />
                      {showColorPickerDesc && (
                        <div style={popover}>
                          <div
                            style={cover}
                            onClick={() => setShowColorPickerDesc(false)}
                          />
                          <ChromePicker
                            color={selectedColorDesc}
                            Title
                            onChange={(e) => handleColorChangeDesc(e.hex)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

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
                          value: "33.33%",
                          label: "3",
                        }}
                      />
                    </div>
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

                  <h4 className=" my-2">Gambar</h4>
                  <div>
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
                        defaultValue={{
                          value: 1 / 1,
                          label: "1:1",
                        }}
                      />
                    </div>
                  </div>

                  <h4 className=" my-2">Font</h4>
                  <div>
                    <div className="form-group w-50 ">
                      <label>Ukuran Judul</label>
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
                        options={fontSizeOptions}
                        styles={customStyles}
                        onChange={handleChangeFontSize}
                        isSearchable={false}
                        value={selectedFontSize}
                        defaultValue={{ value: "18", label: "Sedang" }}
                      />
                    </div>
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
