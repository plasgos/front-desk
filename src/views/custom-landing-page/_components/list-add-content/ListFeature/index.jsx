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
  const [listIconVisible, setListIconVisible] = useState(false);
  const [iconBeforeEdit, setIconBeforeEdit] = useState([]);
  const [iconName, setIconName] = useState(null);
  const [imageUrl, setImageUrl] = useState(
    currentSection?.iconStyle?.image || ""
  );

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "list-feature",
      title: "List Fitur",
      icon: <FaListCheck size={24} />,
      content: {
        typeFont: "",
        textAlign: "tw-justify-center",
        fontSize: 18,
        distance: 20,
        text: [
          "Mudah Digunakan",
          "Dijamin 100% Bahan Terbaik",
          "Menghilangkan Bau Badan",
          "Waterproof (Tahan Air)",
        ],
        textColor: "#424242",
      },
      iconStyle: {
        icon: "hand-point-right",
        image: "",
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
    if (isEditing && !listIconVisible) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else if (isEditing && listIconVisible) {
      setListIconVisible(false);
      setPreviewSection([...iconBeforeEdit]);
    } else if (listIconVisible) {
      setListIconVisible(false);
      if (imageUrl) {
        console.log("first");
        setIconName(null);
      }
      setPreviewSection([...iconBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handelConfirm = () => {
    if (listIconVisible) {
      setListIconVisible(false);
      if (imageUrl && iconName) {
        setImageUrl("");
      }
    } else {
      isShowContent(false);
    }
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
                    previewSection={previewSection}
                    setPreviewSection={setPreviewSection}
                    currentSection={isEditing ? currentSection : setting}
                    isEditing={isEditing}
                    visible={listIconVisible}
                    setVisible={(value) => setListIconVisible(value)}
                    setIconBeforeEdit={(value) => setIconBeforeEdit(value)}
                    iconName={iconName}
                    setIconName={(value) => setIconName(value)}
                    imageUrl={imageUrl}
                    setImageUrl={(value) => setImageUrl(value)}
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
