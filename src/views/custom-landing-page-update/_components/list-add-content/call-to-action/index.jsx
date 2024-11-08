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
import UpdateContent from "./UpdateContent";

const CallToAction = ({
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

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "call-to-action",
      title: "Call To Action",
      content: [
        {
          id: createUniqueID([]),
          textButton: "Start Free Trial",
          isGhostVariant: false,
          textColorButton: "#ffffff",
          buttonColor: "#2196F3",
          textColor: "#000000",
          text: "Signup for free trial now!",
          fontSize: "tw-text-base",
          align: "tw-justify-center",
          target: {},
        },
      ],
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
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const handleCancel = () => {
    if (isEditingSection) {
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
          <CTabPane data-tab="konten">
            <div>
              <UpdateContent
                setPreviewSection={setPreviewSection}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                currentContent={
                  isEditingSection
                    ? currentSection?.content?.[0]
                    : selectedCurrentSection?.content?.[0]
                }
                isEditingContent={isEditingSection}
              />
            </div>
          </CTabPane>

          <CTabPane className="p-1" data-tab="background">
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

export default CallToAction;
