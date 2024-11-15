import { CCard, CCardBody } from "@coreui/react";
import React, { useCallback, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch } from "react-redux";

import AddContent from "..";

import { removeOptionScrollTarget } from "../../../../../redux/modules/custom-landing-page/reducer";
import Confirmation from "../../common/Confirmation";
import { useRenderEditSection } from "../../hooks/useRenderEditSection";
import { ListSectionContent } from "../../ListSectionContent";

const ContainerMenu = ({ children, className = "p-3" }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const UpdateContent = ({
  previewSection,
  setPreviewSection,
  handleContentFocus,
  isEditing,
  pageSetting,
  setIsShowContent,
  handleCancel,
  handleConfirm,
  previewFloatingSection,
  setPreviewFloatingSection,
  handleSectionContentFocus,
  handleColumnFocus,
}) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [isAddContent, setIsAddContent] = useState(false);
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);

  const { renderEditSection } = useRenderEditSection({
    editing,
    setEditing: (value) => setEditing(value),
    previewSection,
    setPreviewSection,
    sectionBeforeEdit,
    handleInnerSectionFocus: handleContentFocus,
    handleSectionContentFocus,
    pageSetting,
  });

  const editSection = useCallback(
    (section) => {
      setSectionBeforeEdit([...previewSection]);
      setEditing(section);
    },
    [previewSection, setSectionBeforeEdit, setEditing]
  );

  const moveSection = useCallback((dragIndex, hoverIndex) => {
    setPreviewSection((prevSection) => {
      const draggedCard = prevSection[dragIndex];
      const updatedSections = prevSection
        .slice(0, dragIndex)
        .concat(prevSection.slice(dragIndex + 1));

      return updatedSections
        .slice(0, hoverIndex)
        .concat([draggedCard])
        .concat(updatedSections.slice(hoverIndex));
    });
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const removeSection = useCallback(
    (sectionId, index) => {
      setPreviewSection((prev) =>
        prev.filter((item, i) => item.id !== sectionId)
      );
      dispatch(removeOptionScrollTarget(sectionId));
    },
    [setPreviewSection, dispatch]
  );
  const renderSection = useCallback(
    (section, index) => {
      return (
        <div key={section.id}>
          <ListSectionContent
            key={section.id || index}
            index={index}
            id={section.id}
            showInfoText={section?.title}
            showThumbnail={false}
            section={section}
            moveSection={(dragIndex, hoverIndex) => {
              moveSection(dragIndex, hoverIndex);
            }}
            editSection={() => editSection(section)}
            removeSection={() => {
              removeSection(section.id, index);
            }}
            handleFocus={() => handleContentFocus(section.id)}
          />
        </div>
      );
    },
    [moveSection, editSection, removeSection, handleContentFocus]
  );
  const handleAddContent = () => {
    setIsAddContent(true);
    setSectionBeforeEdit(previewSection);
  };
  const onHandleConfirm = () => {
    setIsAddContent(false);
    setEditing(false);
    handleConfirm();
  };
  const onHandleCancel = () => {
    if (isAddContent) {
      setIsAddContent(false);
      setEditing(false);
    } else if (isEditing) {
      setIsAddContent(false);
      setEditing(false);
      handleCancel();
    } else {
      setIsShowContent(false);
      setIsAddContent(false);
      handleCancel();
    }
  };
  return (
    <>
      {!isAddContent && !editing && (
        <Confirmation
          handleCancel={onHandleCancel}
          handleConfirm={onHandleConfirm}
        />
      )}

      {isAddContent ? (
        <AddContent
          previewSection={previewSection}
          setPreviewSection={(value) => setPreviewSection(value)}
          isShowContent={(value) => setIsAddContent(value)}
          handleSectionContentFocus={(value) =>
            handleSectionContentFocus(value)
          }
          isContainer={false}
          isMultiColumn={true}
          pageSetting={pageSetting}
          setPreviewFloatingSection={setPreviewFloatingSection}
          previewFloatingSection={previewFloatingSection}
          isPopUpSection={true}
          handleColumnFocus={handleColumnFocus}
        />
      ) : editing ? (
        <div>
          {previewSection.map((section) => (
            <div key={section.id}>{renderEditSection(section)}</div>
          ))}
        </div>
      ) : (
        <ContainerMenu>
          {previewSection.map((section, index) =>
            renderSection(section, index)
          )}
          <CCard
            style={{ cursor: "pointer", height: 32 }}
            onClick={handleAddContent}
            className="rounded-sm"
          >
            <CCardBody className="py-1 px-2">
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
        </ContainerMenu>
      )}
    </>
  );
};

export default UpdateContent;
