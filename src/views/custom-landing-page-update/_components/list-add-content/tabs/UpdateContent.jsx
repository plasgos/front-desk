import { CCard, CCardBody } from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useDispatch } from "react-redux";

import AddContent from "..";

import { useFontAwesomeIconPack } from "../../../../../hooks/useFontAwesomePack";
import { removeOptionScrollTarget } from "../../../../../redux/modules/custom-landing-page/reducer";
import Confirmation from "../../common/Confirmation";
import IconPicker from "../../common/IconPicker";
import IconUploader from "../../common/IconUploader";
import Input from "../../common/Input";
import { useRenderEditSection } from "../../hooks/useRenderEditSection";
import { ListSectionContent } from "../../ListSectionContent";

const ContainerMenu = ({ children, className = "p-3" }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
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
  setIsShowContent,
  handleCancel,
  handleConfirm,
  previewFloatingSection,
  setPreviewFloatingSection,
  handleSectionContentFocus,
  currentColumn,
  setParentSection,
  sectionIdCheck,
  setSelectedColumn,
}) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [isAddContent, setIsAddContent] = useState(false);
  const [sectionBeforeEdit, setSectionBeforeEdit] = useState([]);
  const [name, setName] = useState(currentColumn?.name || "");

  const iconPack = useFontAwesomeIconPack();

  const [previousIcon, setPreviousIcon] = useState("");

  const [icon, setIcon] = useState(isEditing ? currentColumn?.icon : "");

  const [imageUrl, setImageUrl] = useState(
    isEditing ? currentColumn?.image : ""
  );

  const [isListIconVisible, setIsListIconVisible] = useState(false);

  useEffect(() => {
    if (imageUrl !== "") {
      setIcon({});
      handleChangeImageUrl(imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUrl(imageUrl);
      };

      reader.readAsDataURL(file);
    };
  };

  const handleSearchIcon = (prevIcon) => {
    setPreviousIcon(prevIcon);
    setIsListIconVisible(true);
  };

  const handleChangeImageUrl = (value) => {
    setSelectedColumn((prev) => ({
      ...prev,
      image: value,
      icon: {},
    }));

    setParentSection((arr) =>
      arr.map((section) =>
        section.id === sectionIdCheck
          ? {
              ...section,
              content: section.content.map((tab) =>
                tab.id === currentColumn.id
                  ? {
                      ...tab,
                      image: value,
                      icon: "",
                    }
                  : tab
              ),
            }
          : section
      )
    );
  };

  const handleChangeIcon = (value) => {
    setIcon(value);

    setSelectedColumn((prev) => ({
      ...prev,
      icon: value,
      image: "",
    }));

    setParentSection((arr) =>
      arr.map((section) =>
        section.id === sectionIdCheck
          ? {
              ...section,
              content: section.content.map((tab) =>
                tab.id === currentColumn.id
                  ? {
                      ...tab,
                      icon: value,
                      image: "",
                    }
                  : tab
              ),
            }
          : section
      )
    );
  };

  const { renderEditSection } = useRenderEditSection({
    editing,
    setEditing: (value) => setEditing(value),
    previewSection,
    setPreviewSection,
    sectionBeforeEdit,
    handleInnerSectionFocus: handleContentFocus,
    handleSectionContentFocus,
  });

  useEffect(() => {
    if (currentColumn) {
      setName(currentColumn?.name);
    }
  }, [currentColumn]);

  const handleChangeTabValue = (key, value) => {
    setParentSection((arr) =>
      arr.map((section) =>
        section.id === sectionIdCheck
          ? {
              ...section,
              content: section.content.map((tab) =>
                tab.id === currentColumn.id
                  ? {
                      ...tab,
                      [key]: value,
                    }
                  : tab
              ),
            }
          : section
      )
    );
  };

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

  const handleCancelIcon = () => {
    setIsListIconVisible(false);

    if (imageUrl) {
      setImageUrl(imageUrl);
      setIcon({});
      handleChangeImageUrl(imageUrl);
    } else {
      handleChangeIcon(previousIcon);
    }
  };

  const handleConfirmIcon = () => {
    setIsListIconVisible(false);
    if (icon.iconName) {
      setImageUrl("");
    }
  };

  const handleRemoveIcon = () => {
    const hasIcon =
      iconPack && iconPack.length > 0 && Object.keys(icon).length > 0;

    setIcon("");
    setImageUrl("");

    const updateIcon = hasIcon
      ? {
          icon: "",
        }
      : imageUrl
      ? {
          image: "",
        }
      : {};

    setParentSection((arr) =>
      arr.map((section) =>
        section.id === sectionIdCheck
          ? {
              ...section,
              content: section.content.map((tab) =>
                tab.id === currentColumn.id
                  ? {
                      ...tab,
                      ...updateIcon,
                    }
                  : tab
              ),
            }
          : section
      )
    );
  };

  return (
    <>
      {!isAddContent && !editing && !isListIconVisible && (
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
          isMulticolumn={true}
          setPreviewFloatingSection={setPreviewFloatingSection}
          previewFloatingSection={previewFloatingSection}
          isPopUpSection={true}
        />
      ) : editing ? (
        <div>
          {previewSection.map((section) => (
            <div key={section.id}>{renderEditSection(section)}</div>
          ))}
        </div>
      ) : isListIconVisible ? (
        <div>
          <Confirmation
            handleCancel={handleCancelIcon}
            handleConfirm={handleConfirmIcon}
          />

          <IconPicker
            value={icon}
            onChange={(value) => handleChangeIcon(value)}
          />
        </div>
      ) : (
        <ContainerMenu>
          <div className="mb-2">
            <Input
              label="Nama"
              value={name}
              onChange={(e) => {
                const { value } = e.target;
                setName(value);
                handleChangeTabValue("name", value);
              }}
            />
          </div>

          <IconUploader
            iconPack={iconPack}
            icon={icon}
            imageUrl={imageUrl}
            handleFileUpload={handleFileUpload}
            handleSearchIcon={handleSearchIcon}
            handleRemoveIcon={handleRemoveIcon}
          />

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
