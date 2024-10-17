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
import Information from "./Information";
import UpdateContent from "./UpdateContent";
import Shipping from "./shipping";
import Payment from "./payment";
import { DraggableList } from "../../../../../common/DraggableList";
import { useRemoveSectionFrame } from "../../../hooks/useRemoveSectionFrame";
import { useMoveSectionFrame } from "../../../hooks/useMoveSectionFrame";

const FormSection = ({
  previewSection,
  setPreviewSection,
  currentSection,
  setCurrentContentBeforeEdit,
  isAddContent,
  setIsAddContent,
  isEditingContent,
  setIsEditingContent,
  isEditingSection,
  handleSectionContentFocus,
  sectionId,
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

  const removeSection = useRemoveSectionFrame(setPreviewSection);
  const moveSection = useMoveSectionFrame(setPreviewSection);

  const renderSection = useCallback(
    (section) => {
      if (section.id !== sectionId) return null;

      const selectedSectionFrame = section.content.find(
        (content) => content.id === currentSection.id
      );
      if (!selectedSectionFrame) return null;

      return selectedSectionFrame?.content.map((contentItem, contentIndex) => (
        <div key={contentItem.id}>
          <DraggableList
            key={contentItem.id || contentIndex}
            index={contentIndex}
            id={contentItem.id}
            showInfoText={`${contentItem.label} - ${contentItem.labelType}`}
            moveSection={(dragIndex, hoverIndex) =>
              moveSection(section.id, currentSection.id, dragIndex, hoverIndex)
            }
            editSection={() => editSection(contentItem)}
            removeSection={() =>
              removeSection(
                section.id,
                currentSection.id,
                contentItem.id,
                contentIndex
              )
            }
            hiddenFocus={true}
          />
        </div>
      ));
    },
    [sectionId, currentSection.id, moveSection, editSection, removeSection]
  );

  return (
    <div>
      {isAddContent ? (
        <UpdateContent
          idSection={currentSection.id}
          previewSection={previewSection}
          currentContent={[]}
          setPreviewSection={setPreviewSection}
          sectionId={sectionId}
        />
      ) : isEditingContent ? (
        <UpdateContent
          idSection={currentSection.id}
          previewSection={previewSection}
          currentContent={selectedContent}
          setPreviewSection={setPreviewSection}
          isEditingContent={true}
          sectionId={sectionId}
        />
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

          <CTabContent>
            <CTabPane className="p-1" data-tab="information">
              <Information
                sectionId={sectionId}
                setPreviewSection={setPreviewSection}
                currentSection={currentSection}
              />

              {!isAddContent && !isEditingContent && (
                <>
                  <div>
                    {previewSection
                      .filter((section) => section.id === sectionId)
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

            <CTabPane className="p-1" data-tab="shipping">
              <Shipping
                sectionId={sectionId}
                previewSection={previewSection}
                setPreviewSection={setPreviewSection}
                currentSection={currentSection}
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="payment">
              <Payment
                sectionId={sectionId}
                setPreviewSection={setPreviewSection}
                currentSection={currentSection}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default FormSection;
