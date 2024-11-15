import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import { createUniqueID } from "../../../../../lib/unique-id";
import BackgroundTab from "../../common/BackgroundTab";
import Confirmation from "../../common/Confirmation";
import ContentTab from "./ContentTab";
import IconTab from "./IconTab";

const ListFeature = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  isMultiColumn,
}) => {
  const [setting, setSetting] = useState({});
  const [listIconVisible, setListIconVisible] = useState(false);
  const [iconBeforeEdit, setIconBeforeEdit] = useState([]);
  const [previousIcon, setPreviousIcon] = useState("");
  const [iconName, setIconName] = useState(
    currentSection?.iconStyle?.icon || {
      prefix: "fas",
      iconName: "hand-point-right",
    }
  );
  const [imageUrl, setImageUrl] = useState(
    currentSection?.iconStyle?.image || ""
  );

  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  useEffect(() => {
    const section = previewSection.find((section) => section.id === setting.id);

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id]);

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);

    const id = isMultiColumn
      ? `multi-column-${uniqueId}`
      : `parent-${uniqueId}`;

    let payload = {
      id,
      name: "list-feature",
      title: "Daftar Fitur",
      content: {
        typeFont: "",
        textAlign: "tw-justify-center",
        fontSize: 18,
        distance: 20,
        text: [
          "Mudah Digunakan",
          "Dijamin 100% Bahan Terbaik",
          "Menghilangkan Bau Badan",
          "Waterproof (Tahan Air)",
        ],
        textColor: "#424242",
      },
      iconStyle: {
        icon: {
          prefix: "fas",
          iconName: "hand-point-right",
        },
        image: "",
        iconSize: 24,
        shadow: "",
        color: "#424242",
        verticalPosition: 0,
        horizontalPosition: 14,
      },
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
        direction: "to right",
        fromColor: "",
        toColor: "",
        isRevert: false,
        pattern: "",
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

  const handleCancel = () => {
    if (isEditingSection && !listIconVisible) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else if (isEditingSection && listIconVisible) {
      setListIconVisible(false);
      setPreviewSection([...iconBeforeEdit]);
      if (imageUrl) {
        setIconName({});
      } else {
        setIconName(previousIcon);
      }
    } else if (listIconVisible) {
      setListIconVisible(false);
      if (imageUrl) {
        setIconName({});
      } else {
        setIconName(previousIcon);
      }
      setPreviewSection([...iconBeforeEdit]);
    } else {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => section.id !== setting.id)
      );
    }
  };

  const handleConfirm = () => {
    if (listIconVisible) {
      setListIconVisible(false);
      if (iconName.iconName) {
        setImageUrl("");
      }
    } else {
      isShowContent(false);
    }
  };

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      <CTabs activeTab="konten">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="konten">Konten</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="icon">Icon</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="wadah">Wadah</CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent
          style={{
            overflowY: "auto",
            height: "calc(100vh - 110px)",
          }}
          className="p-3"
        >
          <CTabPane className="p-1" data-tab="konten">
            <ContentTab
              setPreviewSection={setPreviewSection}
              currentSection={
                isEditingSection ? currentSection : selectedCurrentSection
              }
            />
          </CTabPane>

          <CTabPane className="p-1" data-tab="icon">
            <IconTab
              previewSection={previewSection}
              setPreviewSection={setPreviewSection}
              currentSection={
                isEditingSection ? currentSection : selectedCurrentSection
              }
              isEditing={isEditingSection}
              visible={listIconVisible}
              setVisible={(value) => setListIconVisible(value)}
              setIconBeforeEdit={(value) => setIconBeforeEdit(value)}
              iconName={iconName}
              setIconName={(value) => setIconName(value)}
              imageUrl={imageUrl}
              setImageUrl={(value) => setImageUrl(value)}
              setPreviousIcon={setPreviousIcon}
            />
          </CTabPane>

          <CTabPane className="p-1" data-tab="wadah">
            <BackgroundTab
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

export default ListFeature;
