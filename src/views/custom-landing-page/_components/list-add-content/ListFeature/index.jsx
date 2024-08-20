import {
  CButton,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import BackgroundTab from "../testimony/BackgroundTab";
import ContentTab from "./ContentTab";
import { createUniqueID } from "../../../../../lib/unique-id";
import { FaListCheck } from "react-icons/fa6";
import { TfiHandPointRight } from "react-icons/tfi";
import IconTab from "./IconTab";

const ListFeature = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditing = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [setting, setSetting] = useState({});

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "list-feature",
      title: "List Fitur",
      icon: <FaListCheck size={24} />,
      content: {
        typeFont: "",
        textAlign: "text-center",
        fontSize: 18,
        distance: 20,
        text: "",
        textColor: "#424242",
      },
      iconStyle: {
        icon: <TfiHandPointRight size={24} style={{ margin: "auto" }} />,
        iconSize: 24,
        shadow: "",
        color: "#424242",
        verticalPosition: 0,
        horizontalPosition: 14,
      },
      background: {
        bgType: undefined,
        bgColor: "",
        bgImage: "",
        blur: 0,
        opacity: 0,
        paddingY: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingType: "equal",
      },
    };

    setPreviewSection((prevSections) => [...prevSections, payload]);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditing) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  const handelCancel = () => {
    if (isEditing) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handelConfirm = () => {
    isShowContent(false);
  };

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
                  <CNavLink data-tab="icon">Icon</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="wadah">Wadah</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent
                style={{
                  height: 340,
                  paddingRight: 5,
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
                className="pt-3"
              >
                <CTabPane className="p-1" data-tab="konten">
                  <ContentTab
                    setPreviewSection={setPreviewSection}
                    currentSection={isEditing ? currentSection : setting}
                  />
                </CTabPane>

                <CTabPane className="p-1" data-tab="icon">
                  <IconTab
                    setPreviewSection={setPreviewSection}
                    currentSection={isEditing ? currentSection : setting}
                    isEditing={isEditing}
                  />
                </CTabPane>

                <CTabPane
                  style={{ overflowX: "hidden", height: "100%" }}
                  className="p-1"
                  data-tab="wadah"
                >
                  <BackgroundTab
                    currentSection={isEditing ? currentSection : setting}
                    setPreviewSection={setPreviewSection}
                    type={isEditing ? "edit" : "add"}
                  />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default ListFeature;
