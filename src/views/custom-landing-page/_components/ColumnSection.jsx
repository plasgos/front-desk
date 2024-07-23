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

import image from "../../../assets/action-figure.jpg";

import { IoAdd } from "react-icons/io5";
import { AddContent } from "./AddContent";
import { EditContent } from "./EditContent";
import { CardList } from "./CardList";
import { MdViewColumn } from "react-icons/md";
import { createUniqueID } from "../../../lib/unique-id";

const contents = [
  {
    id: "adguiwbj",

    content: {
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
      image: image,
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
  },
  {
    id: "feqawd",

    content: {
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
      image: image,
    },
  },
];

const ColumnSection = ({
  previewSection,
  setPreviewSection,
  section,
  setSections,
  isShowContent,
  toggleAddContent,
}) => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [defaultSection, setDefaultSection] = useState(contents || []);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const [isResizing, setIsResizing] = useState(false);

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const handelCancel = () => {
    setIsAddContent(false);
    setIsEditing(false);
    isShowContent(false);
    toggleAddContent("");
    // setIsEditingContent("");
    // setPreviewSection(section);
  };

  const handelConfirm = () => {
    setIsAddContent(false);
    setIsEditing(false);
    // setSections(previewSection);
  };

  // const removeSection = useCallback((index) => {
  //   setPreviewSection((prev) => prev.filter((item, i) => i !== index));
  //   return () => {};
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const removeSection = useCallback((sectionIndex, contentIndex) => {
    setPreviewSection((prevSections) =>
      prevSections.map((section, idx) => {
        if (section.name === "column-text-and-image" && idx === sectionIndex) {
          return {
            ...section,
            content: section.content.filter((_, i) => i !== contentIndex),
          };
        }
        return section;
      })
    );
  }, []);

  const moveSection = useCallback((dragIndex, hoverIndex) => {
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

    // setPreviewSection((prevCards) => {
    //   const draggedCard = prevCards[dragIndex];
    //   const updatedSections = prevCards
    //     .slice(0, dragIndex)
    //     .concat(prevCards.slice(dragIndex + 1));

    //   return updatedSections
    //     .slice(0, hoverIndex)
    //     .concat([draggedCard])
    //     .concat(updatedSections.slice(hoverIndex));
    // });
    return () => {};
  }, []);

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);

    const sectionExists = previewSection.some(
      (section) => section.name === "column-text-and-image"
    );

    if (sectionExists) {
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.name === "column-text-and-image"
            ? { ...section, content: [...section.content, defaultSection] }
            : section
        )
      );
    } else {
      setPreviewSection((prevSections) => [
        ...prevSections,
        {
          id: uniqueId,
          name: "column-text-and-image",
          icon: <MdViewColumn size={20} />,
          content: defaultSection,
        },
      ]);
    }
  };

  useEffect(() => {
    onAddContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editSection = (section) => {
    setSelectedSection(section);
    setIsEditing(true);
  };

  const renderSection = useCallback((section, index) => {
    return (
      <div key={section.id}>
        {section.content.map((contentItem, contentIndex) => (
          <CardList
            key={contentItem.id || contentIndex} // Ensure a unique key for each item
            index={contentIndex}
            id={contentItem.id}
            section={contentItem}
            moveSection={moveSection}
            editSection={() => editSection(contentItem, contentIndex)}
            removeSection={removeSection}
          />
        ))}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={isResizing ? { cursor: "not-allowed" } : {}}>
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
                <CTabPane data-tab="kolom">
                  {isAddContent ? (
                    <AddContent
                      sections={defaultSection}
                      setSections={setDefaultSection}
                      setTempSections={previewSection}
                    />
                  ) : isEditing ? (
                    <EditContent
                      id={selectedSection.id}
                      titleValue={selectedSection.content.title}
                      descriptionValue={selectedSection.content.description}
                      image={selectedSection.content.image}
                      setTempSections={previewSection}
                    />
                  ) : (
                    <div>
                      {/* {previewSection.map((section, i) =>
                        renderSection(section, i)
                      )} */}

                      {previewSection
                        .filter(
                          (section) => section.name === "column-text-and-image"
                        )
                        .map((section, i) => renderSection(section, i))}
                    </div>
                  )}

                  {!isAddContent && !isEditing && (
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

export default ColumnSection;
