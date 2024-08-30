import React, { useCallback, useState } from "react";

import {
  CCard,
  CCardBody,
  CNav,
  CNavItem,
  CNavLink,
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
  isEditingSection,
  currentSection,
}) => {
  const [activeTab, setActiveTab] = useState("information");
  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);

  const editSection = useCallback(
    (section) => {
      setCurrentContentBeforeEdit([...previewSection]);
      setSelectedContent(section);
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
        <UpdateContent
          idSection={currentSection.id}
          currentContent={[]}
          setPreviewSection={setPreviewSection}
        />
      ) : isEditingContent ? (
        <UpdateContent
          idSection={currentSection.id}
          currentContent={selectedContent}
          setPreviewSection={setPreviewSection}
          isEditingContent={true}
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
