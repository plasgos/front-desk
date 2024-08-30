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
import React, { useCallback, useEffect, useState } from "react";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { DraggableList } from "../../common/DraggableList";
import { createUniqueID } from "../../../../../lib/unique-id";
import FormSection from "./form-section";
import DesignSection from "./design-section";

const FormCheckout = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [activeTab, setActiveTab] = useState("form");
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [selectedContent, setSelectedContent] = useState({});
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);
  const [setting, setSetting] = useState({});
  const [iconBeforeEdit, setIconBeforeEdit] = useState([]);
  const [isListIconVisible, setIsListIconVisible] = useState(false);
  const [previousIcon, setPreviousIcon] = useState("");
  const [icon, setIcon] = useState(currentSection?.style?.icon || "");
  const [imageUrl, setImageUrl] = useState(currentSection?.style?.image || "");

  const handleCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id === contentIdToCheck
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section;
        })
      );
    } else if (isSelectVariant) {
      setIsSelectVariant(false);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isListIconVisible) {
      setIsListIconVisible(false);
      if (imageUrl) {
        setIcon(null);
      } else {
        setIcon(previousIcon);
      }
      setPreviewSection([...iconBeforeEdit]);
    } else if (isEditingContent) {
      setPreviewSection([...currentContentBeforeEdit]);
      setIsAddContent(false);
      setIsEditingContent(false);
    } else if (isEditingSection) {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      setIsAddContent(false);
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    if (
      isAddContent ||
      isEditingContent ||
      isSelectVariant ||
      isListIconVisible
    ) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setIsSelectVariant(false);
      setIsListIconVisible(false);
    } else {
      isShowContent(false);
    }
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "form-checkout",
      title: "Formulir Checkout",
      content: [
        // {
        //   id: "custom-01",
        //   type: "Teks",
        //   label: "Nama",
        //   placeholder: "",
        // },
      ],
      form: {
        information: {
          emailVisitor: "",
          subcribeNewsletter: true,
          phoneNumberVisitor: "",
          firstName: "",
          lastName: "",
          address: "",
          country: "",
          postcalCode: "",
          subdictrict: "",
          phoneNumber: "",
          dropshipping: false,
          dropshipperName: "",
          dropshipperPhoneNumber: "",
        },
        formSetting: {
          visitor: "phoneNumber",
          isSubcribeNewsletter: true,
          isShowAddress: true,
          isLastName: false,
          isCountry: false,
          isPostcalCode: false,
          subdistrictType: "search",
          amountLengthAddress: "1",
          isShowPhoneNumber: false,
          isDropshipping: false,
          phoneNumberDropshipper: false,
        },
        style: {
          labelColor: "",
          textInputColor: "",
          bgInputColor: "",
          outlineInputColor: "#D8DBE0",
          widthForm: 450,
          fontSizeLabel: 12,
          fontStyle: "tw-font-normal",
          fontSizeTextInputColor: 16,
          outlineInputColorSize: 1,
          borderRadius: 4,
          distance: 0,
          btnSubmitText: "Selesaikan Order",
          btnSubmitColor: "#fa541c",
          icon: "",
          iconColor: "",
          image: "",
        },
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

            <CTabs activeTab={activeTab}>
              <CNav variant="tabs">
                <CNavItem onClick={() => setActiveTab("layout")}>
                  <CNavLink data-tab="layout">Layout</CNavLink>
                </CNavItem>
                <CNavItem onClick={() => setActiveTab("form")}>
                  <CNavLink data-tab="form">Formulir</CNavLink>
                </CNavItem>
                <CNavItem onClick={() => setActiveTab("desain")}>
                  <CNavLink data-tab="desain">Desain</CNavLink>
                </CNavItem>
                <CNavItem onClick={() => setActiveTab("text")}>
                  <CNavLink data-tab="text">Teks</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent
                style={{ height: 300, paddingRight: 5, overflowY: "auto" }}
              >
                <CTabPane
                  style={{ overflowX: "hidden" }}
                  className="p-1"
                  data-tab="layout"
                >
                  Layout
                </CTabPane>
                <CTabPane className="p-1" data-tab="form">
                  <FormSection
                    previewSection={previewSection}
                    setPreviewSection={setPreviewSection}
                    currentSection={isEditingSection ? currentSection : setting}
                  />
                </CTabPane>
                <CTabPane
                  style={{ overflowX: "hidden" }}
                  className="p-1"
                  data-tab="desain"
                >
                  <DesignSection
                    previewSection={previewSection}
                    setPreviewSection={setPreviewSection}
                    currentSection={isEditingSection ? currentSection : setting}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    icon={icon}
                    setPreviousIcon={setPreviousIcon}
                    setIcon={setIcon}
                    setIconBeforeEdit={setIconBeforeEdit}
                    isListIconVisible={isListIconVisible}
                    setIsListIconVisible={setIsListIconVisible}
                  />
                </CTabPane>

                <CTabPane
                  style={{ overflowX: "hidden", height: "100%" }}
                  className="p-1"
                  data-tab="text"
                >
                  TEKS
                </CTabPane>
              </CTabContent>
            </CTabs>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default FormCheckout;
