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

import UpdateText from "./UpdateText";
import UpdateDesign from "./UpdateDesign";
import BackgroundTabFrame from "../../common/BackgroundTabFrame";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import { cancelNewSection } from "../../helper/cancelNewSection";
import { addNewSection } from "../../helper/addNewSection";

const StockCounter = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  sectionId,
}) => {
  const [setting, setSetting] = useState({});

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

  const handleCancel = () => {
    if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      cancelNewSection(setPreviewSection, sectionId, setting.id);
    }
  };

  const handleConfirm = () => {
    isShowContent(false);
  };

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "stock-counter",
      title: "Stock Counter",
      content: {
        design: {
          typeStock: "custom",
          currentStock: 5,
          maxStock: 20,
          startColor: "#CDDC39",
          finishColor: "#388E3C",
          outlineColor: "#EF5350",
          bgColor: "#ffffff",
          outerShadow: "tw-shadow-lg",
          innerShadow: "tw-shadow",
          height: 30,
          width: 500,
          borderWidth: 4,
          outerRounded: 20,
          innerRounded: 20,
        },
        text: {
          textShadow: undefined,
          fontSize: "tw-text-lg",
          textColor: "#151414",
          textAlign: "tw-text-center",
          text: "<p>Jangan sampai kehabisan, stok <strong>TERBATAS</strong>!!!</p>",
        },
      },
      animation: {
        type: "expandWidthFillOut",
        duration: 1,
        isReplay: false,
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
      onAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  return (
    <div>
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
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

            <CTabs activeTab="design">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="design">Desain</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="text">Teks</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="background">Background</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent
                style={{ height: 320, paddingRight: 5, overflowY: "auto" }}
                className="pt-3"
              >
                <CTabPane className="p-1" data-tab="design">
                  <UpdateDesign
                    sectionId={sectionId}
                    setPreviewSection={setPreviewSection}
                    currentSection={
                      isEditingSection ? currentSection : selectedCurrentSection
                    }
                  />
                </CTabPane>

                <CTabPane className="p-1" data-tab="text">
                  <UpdateText
                    sectionId={sectionId}
                    setPreviewSection={setPreviewSection}
                    currentSection={
                      isEditingSection ? currentSection : selectedCurrentSection
                    }
                  />
                </CTabPane>

                <CTabPane
                  style={{ overflowX: "hidden", height: "100%" }}
                  className="p-1"
                  data-tab="background"
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

export default StockCounter;
