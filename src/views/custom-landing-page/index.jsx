import React, { useState } from "react";
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

import { FaMagnifyingGlass } from "react-icons/fa6";

import {
  IoMenu,
  IoCloseOutline,
  IoSettingsOutline,
  IoAdd,
  IoSearch,
} from "react-icons/io5";
import { AddContent } from "./_components/AddContent";
import { EditContent } from "./_components/EditContent";

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

  const handleRemoveItemSection = (id) => {
    const updatedSections = sections.filter((section) => section.id !== id);

    setTempSections(updatedSections);
    setSections(updatedSections);
  };

  const handleEditItemSection = (id) => {
    setIsEditing(true);
  };

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
                  sections.map((section) => (
                    <CCard
                      key={section.id}
                      style={{ cursor: "pointer" }}
                      className="mb-2"
                    >
                      <CCardBody style={{ padding: "0px 10px 0px 10px" }}>
                        <div
                          style={{ gap: 10 }}
                          className="d-flex align-items-center"
                        >
                          <IoMenu style={{ cursor: "pointer" }} size={18} />

                          <div
                            style={{
                              width: 60,
                              height: 40,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={image}
                              alt="img"
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>

                          <div
                            style={{
                              flexGrow: 1,
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              width: 80,
                              fontSize: 14,
                            }}
                          >
                            {section.content.title}
                          </div>

                          <FaMagnifyingGlass
                            style={{ cursor: "pointer" }}
                            size={16}
                          />
                          <IoSettingsOutline
                            onClick={() => handleEditItemSection(section.id)}
                            style={{ cursor: "pointer" }}
                            size={16}
                          />
                          <IoCloseOutline
                            onClick={() => handleRemoveItemSection(section.id)}
                            style={{ cursor: "pointer" }}
                            size={18}
                          />
                        </div>
                      </CCardBody>
                    </CCard>
                  ))
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
