import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import { createUniqueID } from "../../../../../lib/unique-id";

import BackgroundTab from "../../common/BackgroundTab";
import Confirmation from "../../common/Confirmation";
import UpdateDesign from "./UpdateDesign";
import UpdateText from "./UpdateText";

const StockCounter = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [setting, setSetting] = useState({});

  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  useEffect(() => {
    const section = previewSection.find((section) => section.id === setting.id);

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id]);

  const handleCancel = () => {
    if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => {
          return section.id !== setting.id;
        })
      );
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

    setPreviewSection((prevSections) => [...prevSections, payload]);
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
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

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
        <CTabContent style={{ overflowY: "auto" }} className="p-3">
          <CTabPane className="p-1" data-tab="design">
            <UpdateDesign
              setPreviewSection={setPreviewSection}
              currentSection={
                isEditingSection ? currentSection : selectedCurrentSection
              }
            />
          </CTabPane>

          <CTabPane className="p-1" data-tab="text">
            <UpdateText
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
            <BackgroundTab
              currentSection={isEditingSection ? currentSection : setting}
              setPreviewSection={setPreviewSection}
              type={isEditingSection ? "edit" : "add"}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default StockCounter;
