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
import ContentTab from "./ContentTab";

export const fontSizeQuoteOptions = [
  { value: "tw-text-base", label: "Normal" },
  { value: "tw-text-lg", label: "Besar" },
  { value: "tw-text-xl", label: "Lebih Besar" },
];

const Quote = ({
  previewSection,
  setPreviewSection,
  sectionBeforeEdit,
  isShowContent,
  isEditing,
  currentSection,
}) => {
  const [setting, setSetting] = useState({});

  const handleCancel = () => {
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

  const handleConfirm = () => {
    isShowContent(false);
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "quote",
      title: "Quote",
      content: {
        quoteText: "Kamu tidak bisa membangunkan orang yang pura-pura tidur",
        quoteTextColor: "#000000",
        quoteTagColor: "616161",
        writer: "Tere Liye",
        writerColor: "#9E9E9E",
        fontSize: "tw-text-base",
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
    if (!isEditing) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      <CTabs activeTab="konten">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="konten">Konten</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="background">Background</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent
          style={{ overflowY: "auto", height: "calc(100vh - 110px)" }}
          className="p-3"
        >
          <CTabPane className="p-1" data-tab="konten">
            <ContentTab
              currentSection={isEditing ? currentSection : setting}
              setPreviewSection={setPreviewSection}
              isEditing={isEditing}
            />
          </CTabPane>

          <CTabPane className="p-1" data-tab="background">
            <BackgroundTab
              currentSection={isEditing ? currentSection : setting}
              setPreviewSection={setPreviewSection}
              type={isEditing ? "edit" : "add"}
            />
          </CTabPane>
        </CTabContent>
      </CTabs>
    </div>
  );
};

export default Quote;
