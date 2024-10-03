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
import Payment from "./payment";
import Shipping from "./shipping";
import { useRemoveContentMultiColumn } from "../../../hooks/useRemoveContentMultiColumn";
import { useMoveContentMultiColumn } from "../../../hooks/useMoveContentMultiColumn";
import { DraggableList } from "../../../../../common/DraggableList";

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
  sectionId,
  columnId,
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

  const removeSection = useRemoveContentMultiColumn(setPreviewSection);
  const moveSection = useMoveContentMultiColumn(setPreviewSection);

  const renderSection = useCallback(
    (section) => {
      if (section.id !== sectionId) return null;

      const selectedColumn = section.column.find(
        (column) => column.id === columnId
      );
      if (!selectedColumn) return null;

      const selectedContent = selectedColumn.content.find(
        (content) => content.id === currentSection.id
      );

      return selectedContent?.content.map((contentItem, contentIndex) => (
        <div key={contentItem.id || contentIndex}>
          <DraggableList
            index={contentIndex}
            id={contentItem.id}
            showInfoText={`${contentItem.label} - ${contentItem.labelType}`}
            showThumbnail={contentItem.content?.image}
            moveSection={(dragIndex, hoverIndex) =>
              moveSection(
                section.id,
                columnId,
                currentSection.id,
                dragIndex,
                hoverIndex
              )
            }
            editSection={() => editSection(contentItem)}
            removeSection={() =>
              removeSection(
                section.id,
                columnId,
                currentSection.id,
                contentItem.id
              )
            }
            hiddenFocus={true}
          />
        </div>
      ));
    },
    [
      columnId,
      currentSection.id,
      editSection,
      moveSection,
      removeSection,
      sectionId,
    ]
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
          columnId={columnId}
        />
      ) : isEditingContent ? (
        <UpdateContent
          idSection={currentSection.id}
          previewSection={previewSection}
          currentContent={selectedContent}
          setPreviewSection={setPreviewSection}
          isEditingContent={true}
          sectionId={sectionId}
          columnId={columnId}
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
                setPreviewSection={setPreviewSection}
                currentSection={currentSection}
                sectionId={sectionId}
                columnId={columnId}
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
                previewSection={previewSection}
                setPreviewSection={setPreviewSection}
                currentSection={currentSection}
                sectionId={sectionId}
                columnId={columnId}
              />
            </CTabPane>

            <CTabPane className="p-1" data-tab="payment">
              <Payment
                setPreviewSection={setPreviewSection}
                currentSection={currentSection}
                sectionId={sectionId}
                columnId={columnId}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default FormSection;
