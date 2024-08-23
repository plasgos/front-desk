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
import BackgroundTab from "../testimony/BackgroundTab";
import { IoAdd } from "react-icons/io5";
import { DraggableList } from "../../common/DraggableList";
import { createUniqueID } from "../../../../../lib/unique-id";

const contents = [
  {
    id: "faq-1",
    title: "Kenyamanan adalah penjara kebebasan dan hambatan untuk berkembang",
    desc: "Jangan biarkan dirimu terlena pada nikmatnya kenyamanan! Mulailah lagi berkarya hari ini karena kamu tidak tahu siapa yang akan mengalahkanmu esok hari.",
  },
  {
    id: "faq-2",
    title: "Fokus Pada Masa Depan",
    desc: "Tanpa pernah kamu sadari, hidup berubah dengan cepat secepat kamu mengedipkan mata. Tanpa kamu sadari, ada waktu yang kamu gunakan dengan baik dan waktu yang kamu sia-siakan.",
  },
  {
    id: "faq-3",
    title: "Rahasia untuk maju adalah memulai",
    desc: "Kamu tidak akan pernah sukses jika kamu hanya duduk dan berangan-angan untuk sukses. Bangkitlah dari tempat dudukmu dan mulailah lakukan sesuatu!",
  },
  {
    id: "faq-4",
    title: "Kita lebih menikmati proses ketimbang hasilnya",
    desc: "Dalam hidup, kamu pasti menuntut hasil yang terbaik nan membanggakan. Hidup bukan hanya terletak pada hasil yang kamu terima, tapi hidup adalah sikap kamu terhadap semua proses kehidupan.",
  },
];

const FAQ = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingFaq = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [activeTab, setActiveTab] = useState("faqs");
  const [setting, setSetting] = useState({});
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSection, setSelectedSection] = useState({});
  const [currentDataBeforeEdit, setCurrentDataBeforeEdit] = useState([]);

  const editSection = useCallback(
    (section) => {
      setCurrentDataBeforeEdit([...previewSection]);
      setSelectedSection(section);
      setIsEditing(true);
    },
    [previewSection]
  );

  const removeSection = useCallback(
    (sectionId, contentIndex) => {
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: section.content.filter((_, i) => i !== contentIndex),
            };
          }
          return section;
        })
      );
    },
    [setPreviewSection]
  );

  const moveSection = useCallback(
    (dragIndex, hoverIndex) => {
      setPreviewSection((prevSections) => {
        return prevSections.map((section) => {
          if (section.name === "faq") {
            const updatedContent = [...section.content];
            const draggedItem = updatedContent[dragIndex];
            updatedContent.splice(dragIndex, 1);
            updatedContent.splice(hoverIndex, 0, draggedItem);
            return { ...section, content: updatedContent };
          }
          return section;
        });
      });

      return () => {};
    },
    [setPreviewSection]
  );

  const renderSection = useCallback(
    (section) => {
      return (
        <div key={section.id}>
          {section.content.map((contentItem, contentIndex) => (
            <DraggableList
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              showInfoText={contentItem.title}
              moveSection={moveSection}
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
            />
          ))}
        </div>
      );
    },
    [moveSection, editSection, removeSection]
  );

  const handelCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setIsEditing(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) =>
          section.id === setting.id
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section
        )
      );
      setActiveTab("faqs");
    } else if (isEditing) {
      setPreviewSection([...currentDataBeforeEdit]);
      setIsAddContent(false);
      setIsEditing(false);
      setActiveTab("faqs");
    } else {
      setIsAddContent(false);
      setActiveTab("faqs");
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handelConfirm = () => {
    if (isAddContent || isEditing) {
      setIsAddContent(false);
      setIsEditing(false);
      setActiveTab("faqs");
    } else {
      isShowContent(false);
    }
  };

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "faq",
      title: "FAQ Buka/Tutup",
      content: contents,
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

            {isAddContent ? (
              <CTabs>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <div>ADD</div>
                </CTabContent>
              </CTabs>
            ) : isEditing ? (
              <CTabs>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <div>EDIT</div>
                </CTabContent>
              </CTabs>
            ) : (
              <CTabs activeTab={activeTab}>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="faqs">Konten</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="desain">Desain</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="wadah">Wadah</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent
                  style={{ height: 340, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
                >
                  <CTabPane className="p-1" data-tab="faqs">
                    {!isAddContent && !isEditing && (
                      <>
                        <div
                          style={{ gap: 10 }}
                          className="d-flex align-items-center "
                        ></div>
                        <div>
                          {previewSection
                            .filter((section) => section.id === setting.id)
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
                    {/* {Object.keys(setting).length > 0 ? (
                      <DesignTab
                        currentSection={setting}
                        setPreviewSection={setPreviewSection}
                        selectedColum={selectedColumnTestimony}
                        setSelectedColum={(value) =>
                          setSelectedColumnTestimony(value)
                        }
                        paddingTop={paddingTop}
                        setPaddingTop={(value) => setPaddingTop(value)}
                        paddingBottom={paddingBottom}
                        setPaddingBottom={(value) => setPaddingBottom(value)}
                      />
                    ) : (
                      <div>Loading...</div>
                    )} */}
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden", height: "100%" }}
                    className="p-1"
                    data-tab="wadah"
                  >
                    <BackgroundTab
                      currentSection={setting}
                      setPreviewSection={setPreviewSection}
                      type={isEditing ? "edit" : "add"}
                    />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            )}
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default FAQ;
