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

import ContentTab from "./ContentTab";
import IconTab from "./IconTab";
import { cancelNewSection } from "../../helper/cancelNewSection";
import { addNewSection } from "../../helper/addNewSection";
import BackgroundTabFrame from "../../common/BackgroundTabFrame";
import { createUniqueID } from "../../../../../../../lib/unique-id";

const ListFeature = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  sectionId,
}) => {
  const [setting, setSetting] = useState({});
  const [listIconVisible, setListIconVisible] = useState(false);
  const [iconBeforeEdit, setIconBeforeEdit] = useState([]);
  const [previousIcon, setPreviousIcon] = useState("");
  const [iconName, setIconName] = useState(
    currentSection?.iconStyle?.icon || {
      prefix: "fas",
      iconName: "hand-point-right",
    }
  );
  const [imageUrl, setImageUrl] = useState(
    currentSection?.iconStyle?.image || ""
  );

  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});
  useEffect(() => {
    if (!isEditingSection) {
      let section = previewSection.find((section) => section.id === sectionId);

      if (section) {
        let sectionFrame = section.content.find(
          (sectionItem) => sectionItem.id === setting.id
        );

        if (sectionFrame) {
          setSelectedCurrentSection(sectionFrame);
        }
      }
    }
  }, [previewSection, setting.id, isEditingSection, sectionId]);

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "list-feature",
      title: "List Fitur",
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
        icon: {
          prefix: "fas",
          iconName: "hand-point-right",
        },
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
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
      },
    };

    addNewSection(setPreviewSection, sectionId, payload);

    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection && !listIconVisible) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else if (isEditingSection && listIconVisible) {
      setListIconVisible(false);
      setPreviewSection([...iconBeforeEdit]);
      if (imageUrl) {
        setIconName({});
      } else {
        setIconName(previousIcon);
      }
    } else if (listIconVisible) {
      setListIconVisible(false);
      if (imageUrl) {
        setIconName({});
      } else {
        setIconName(previousIcon);
      }
      setPreviewSection([...iconBeforeEdit]);
    } else {
      isShowContent(false);
      cancelNewSection(setPreviewSection, sectionId, setting.id);
    }
  };

  const handleConfirm = () => {
    if (listIconVisible) {
      setListIconVisible(false);
      if (iconName.iconName) {
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
          <div>
            <div className="d-flex justify-content-end align-items-center border-bottom p-2">
              <div>
                <CButton
                  onClick={handleCancel}
                  color="primary"
                  variant="outline"
                  className="mx-2"
                >
                  Batal
                </CButton>

                <CButton onClick={handleConfirm} color="primary">
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
                    sectionId={sectionId}
                    setPreviewSection={setPreviewSection}
                    currentSection={
                      isEditingSection ? currentSection : selectedCurrentSection
                    }
                  />
                </CTabPane>

                <CTabPane className="p-1" data-tab="icon">
                  <IconTab
                    sectionId={sectionId}
                    previewSection={previewSection}
                    setPreviewSection={setPreviewSection}
                    currentSection={
                      isEditingSection ? currentSection : selectedCurrentSection
                    }
                    isEditing={isEditingSection}
                    visible={listIconVisible}
                    setVisible={(value) => setListIconVisible(value)}
                    setIconBeforeEdit={(value) => setIconBeforeEdit(value)}
                    iconName={iconName}
                    setIconName={(value) => setIconName(value)}
                    imageUrl={imageUrl}
                    setImageUrl={(value) => setImageUrl(value)}
                    setPreviousIcon={setPreviousIcon}
                  />
                </CTabPane>

                <CTabPane
                  style={{ overflowX: "hidden", height: "100%" }}
                  className="p-1"
                  data-tab="wadah"
                >
                  <BackgroundTabFrame
                    sectionId={sectionId}
                    currentSection={isEditingSection ? currentSection : setting}
                    setPreviewSection={setPreviewSection}
                    type={isEditingSection ? "edit" : "add"}
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
