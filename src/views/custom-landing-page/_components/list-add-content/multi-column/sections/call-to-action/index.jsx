import {
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import UpdateContent from "./UpdateContent";
import BackgroundTabMultiColumnContent from "../../common/BackgroundTabMultiColumnContent";
import { useDispatch, useSelector } from "react-redux";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";

const CallToAction = ({
  previewSection,
  setPreviewSection,
  sectionBeforeEdit,
  currentSection,
  sectionId,
  columnId,
}) => {
  const { isEditingSection, isAddColumnSection } = useSelector(
    (state) => state.customLandingPage.multiColumnSection
  );
  const dispatch = useDispatch();

  const [setting, setSetting] = useState({});

  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});
  console.log("🚀 ~ selectedCurrentSection:", selectedCurrentSection);

  useEffect(() => {
    if (!isEditingSection) {
      let section = previewSection.find((section) => section.id === sectionId);
      if (section) {
        let column = section.column.find((col) => col.id === columnId);
        if (column) {
          let content = column.content.find((cnt) => cnt.id === setting?.id);
          if (content) {
            setSelectedCurrentSection(content);
          }
        }
      }
    }
  }, [previewSection, isEditingSection, sectionId, columnId, setting.id]);

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
      },
    };
    addSectionMultiColumn(setPreviewSection, sectionId, columnId, payload);
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
      setPreviewSection([...sectionBeforeEdit]);
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));

      cancelSectionMultiColumn(setPreviewSection, sectionId, columnId, setting);
    }
  };

  const handleConfirm = () => {
    if (isAddColumnSection) {
      dispatch(setIsAddColumnSection(false));
    } else if (isEditingSection) {
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsEditingColumnSection(false));
    }
  };

  return (
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
            <CNavLink data-tab="background">Background</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent
          style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
          className="pt-3"
        >
          <CTabPane data-tab="konten">
            <div>
              <UpdateContent
                sectionId={sectionId}
                columnId={columnId}
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

          <CTabPane
            style={{ overflowX: "hidden", height: "100%" }}
            className="p-1"
            data-tab="background"
          >
            <BackgroundTabMultiColumnContent
              sectionId={sectionId}
              columnId={columnId}
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
