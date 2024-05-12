// import update from "immutability-helper ";
import React, { useCallback, useEffect, useState } from "react";
import { ViewTextAndImage } from "./_components/Commons";
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

import image from "../../assets/action-figure.jpg";

import { IoAdd, IoSearch } from "react-icons/io5";
import { AddContent } from "./_components/AddContent";
import { EditContent } from "./_components/EditContent";
import { CardList } from "./_components/CardList";

const contents = [
  {
    id: "adguiwbj",
    name: "text-image",
    content: {
      title: "Rahasia untuk maju adalah memulai",
      description:
        "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
      image: image,
    },
  },
];

const CustomLandingPage = () => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [sections, setSections] = useState(contents || []);
  const [tempSections, setTempSections] = useState(contents || []);
  const [isEditing, setIsEditing] = useState(false);
  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const handelCancel = () => {
    setIsAddContent(false);
    setIsEditing(false);
    setTempSections(sections);
  };

  const handelConfirm = () => {
    setIsAddContent(false);
    setSections(tempSections);
  };

  const removeSection = useCallback((index) => {
    setSections((prev) => prev.filter((item, i) => i !== index));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditItemSection = (id) => {
    setIsEditing(true);
  };

  // const moveSection = useCallback((dragIndex, hoverIndex) => {
  //   setSections((prevCards) =>
  //     update(prevCards, {
  //       $splice: [
  //         [dragIndex, 1],
  //         [hoverIndex, 0, prevCards[dragIndex]],
  //       ],
  //     })
  //   );
  //   return () => {};
  //   // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const moveSection = useCallback((dragIndex, hoverIndex) => {
    setSections((prevCards) => {
      const draggedCard = prevCards[dragIndex];
      const updatedSections = prevCards
        .slice(0, dragIndex)
        .concat(prevCards.slice(dragIndex + 1));

      return updatedSections
        .slice(0, hoverIndex)
        .concat([draggedCard])
        .concat(updatedSections.slice(hoverIndex));
    });
    return () => {};
  }, []);

  useEffect(() => {
    setTempSections(sections);
  }, [sections]);

  const renderSection = useCallback((section, index) => {
    return (
      <CardList
        key={section.id}
        index={index}
        id={section.id}
        section={section}
        // text={section.text}
        // name={section.name}
        moveSection={moveSection}
        // editSection={(index) => editSection(section, index)}
        removeSection={removeSection}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CRow>
        <CCol md="4">
          <div className="d-flex justify-content-end align-items-center border-bottom p-2">
            <div>
              <CButton onClick={() => {}} variant="ghost">
                <IoSearch style={{ cursor: "pointer" }} size={18} />
              </CButton>
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
            <CTabContent className="pt-3">
              <CTabPane data-tab="kolom">
                {isAddContent ? (
                  <AddContent
                    sections={sections}
                    setSections={setSections}
                    setTempSections={setTempSections}
                  />
                ) : isEditing ? (
                  <EditContent
                    sections={sections}
                    setSections={setSections}
                    setTempSections={setTempSections}
                  />
                ) : (
                  <div>
                    {sections.map((section, i) => renderSection(section, i))}
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
        </CCol>

        <CCol>
          <ViewTextAndImage sections={sections} tempSections={tempSections} />
        </CCol>
      </CRow>
    </div>
  );
};

export default CustomLandingPage;
