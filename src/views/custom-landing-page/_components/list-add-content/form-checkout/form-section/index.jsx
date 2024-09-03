import React, { useCallback, useState } from "react";

import {
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import { IoAdd } from "react-icons/io5";
import { useRemoveSection } from "../../../../../../hooks/useRemoveSection";
import { useMoveSection } from "../../../../../../hooks/useMoveSection";
import { DraggableList } from "../../../common/DraggableList";
import Information from "./Information";
import UpdateContent from "./UpdateContent";

const FormSection = ({
  previewSection,
  setPreviewSection,
  currentSection,
  setCurrentContentBeforeEdit,
  isAddContent,
  setIsAddContent,
  isEditingContent,
  setIsEditingContent,
}) => {
  const [activeTab, setActiveTab] = useState("information");
  const [selectedContent, setSelectedContent] = useState({});
  const editSection = useCallback(
    (section) => {
      setCurrentContentBeforeEdit([...previewSection]);
      setSelectedContent(section);
      setIsEditingContent(true);
    },
    [previewSection, setCurrentContentBeforeEdit, setIsEditingContent]
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
              showInfoText={`${contentItem.label} - ${contentItem.type}`}
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

  return (
    <div>
      {isAddContent ? (
        <CTabs>
          <CTabContent
            style={{
              height: 340,
              overflowY: "auto",
              overflowX: "hidden",
            }}
            className="mt-2"
          >
            <UpdateContent
              idSection={currentSection.id}
              previewSection={previewSection}
              currentContent={[]}
              setPreviewSection={setPreviewSection}
            />
          </CTabContent>
        </CTabs>
      ) : isEditingContent ? (
        <CTabs>
          <CTabContent
            style={{
              height: 340,
              overflowY: "auto",
              overflowX: "hidden",
            }}
            className="mt-2"
          >
            <UpdateContent
              idSection={currentSection.id}
              previewSection={previewSection}
              currentContent={selectedContent}
              setPreviewSection={setPreviewSection}
              isEditingContent={true}
            />
          </CTabContent>
        </CTabs>
      ) : (
        <CTabs activeTab={activeTab}>
          <CNav variant="tabs">
            <CNavItem onClick={() => setActiveTab("information")}>
              <CNavLink data-tab="information">Informasi</CNavLink>
            </CNavItem>
            <CNavItem onClick={() => setActiveTab("shipping")}>
              <CNavLink data-tab="shipping">Pengiriman</CNavLink>
            </CNavItem>
            <CNavItem onClick={() => setActiveTab("payment")}>
              <CNavLink data-tab="payment">Pembayaran</CNavLink>
            </CNavItem>
          </CNav>

          <CTabPane className="p-1" data-tab="information">
            <Information
              setPreviewSection={setPreviewSection}
              currentSection={currentSection}
            />

            {!isAddContent && !isEditingContent && (
              <>
                <div>
                  {previewSection
                    .filter((section) => section.id === currentSection.id)
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
        </CTabs>
      )}
    </div>
  );
};

export default FormSection;
