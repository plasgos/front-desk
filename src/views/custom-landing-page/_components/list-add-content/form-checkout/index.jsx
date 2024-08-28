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
import React, { useCallback, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { DraggableList } from "../../common/DraggableList";
import { createUniqueID } from "../../../../../lib/unique-id";

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
  const [previousIcon, setPreviousIcon] = useState("");
  const [isListIconVisible, setIsListIconVisible] = useState(false);

  const editSection = useCallback(
    (section) => {
      setCurrentContentBeforeEdit([...previewSection]);
      setSelectedContent(section);
      setIsEditingContent(true);
    },
    [previewSection]
  );

  const removeSection = useRemoveSection(setPreviewSection);
  const moveSection = useMoveSection(setPreviewSection);

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section?.content?.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={contentItem.title}
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.name, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [moveSection, editSection, removeSection]
  );

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
      form: {
        information: {
          visitior: "",
          subcribe: false,
          address: {
            firstName: "",
            lastName: "",
            country: "",
            postcalCode: "",
            subdictrict: "",
            phoneNumber: "",
          },
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
                style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                className="pt-3"
              >
                <CTabPane
                  style={{ overflowX: "hidden" }}
                  className="p-1"
                  data-tab="layout"
                >
                  Layout
                </CTabPane>
                <CTabPane className="p-1" data-tab="form">
                  {!isAddContent && !isEditingContent && (
                    <>
                      <div>
                        {previewSection
                          .filter((section) =>
                            isEditingSection
                              ? section.id === currentSection.id
                              : section.id === setting.id
                          )
                          .map((section, i) => renderSection(section, i))}
                      </div>
                      <CCard
                        style={{ cursor: "pointer" }}
                        onClick={() => setIsAddContent(true)}
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
                    </>
                  )}
                </CTabPane>
                <CTabPane
                  style={{ overflowX: "hidden" }}
                  className="p-1"
                  data-tab="desain"
                >
                  DESAIN
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
