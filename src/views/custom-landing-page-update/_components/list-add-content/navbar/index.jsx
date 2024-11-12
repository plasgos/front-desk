import {
  CButton,
  CCard,
  CCardBody,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";

import { IoAdd } from "react-icons/io5";
import { createUniqueID } from "../../../../../lib/unique-id";

import { useMoveSection } from "../../../../../hooks/useMoveSection";
import { useRemoveSection } from "../../../../../hooks/useRemoveSection";
import Confirmation from "../../common/Confirmation";
import NavTabsCustom from "../../common/NavTabsCustom";
import SelectVariant from "../../common/SelectVariant";
import Design from "./Design";
import { DraggableSections } from "../footer/common/DraggbleSections";

import ListContentNavbar from "./ListContentNavbar";
import Logo from "./Logo";
import plgLogo from "../../../../../assets/new_plg_logo_256.png";
import Sidebar from "./Sidebar";
import { useRenderEditSection } from "./hooks/useRenderEditSection";

const optionVariant = [
  {
    group: "Static",
    options: [{ id: "1", value: "simple", label: "Simple" }],
  },
];

const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

const simpleStyle = {
  titleColor: "#000000",
  hoverTitleColor: "#fa541c",
  contentColor: "#757575",
};

const lightStyle = {
  bgColor: "#ffffff",
  titleColor: "#1E88E5",
  contentColor: "#616161",
  innerOutline: "",
  outline: "#E0E0E0",
};

const shadeStyle = {
  bgColor: "#F5F5F5",
  titleColor: "#FFA726",
  contentColor: "#616161",
  innerOutline: "",
  outline: "#E0E0E0",
};

const initialContent = [
  {
    id: `link-${createUniqueID([])}`,
    name: "link",
    title: "Link",
    content: [
      {
        id: createUniqueID([]),
        shownOnWhen: "alwaysVisible",
        typeView: "link",
        btnColor: "#fa541c",
        icon: "",
        iconSize: 20,
        image: "",
        imageSize: 50,
        target: {},
      },
    ],
    wrapperStyle: {
      title: "Link",
    },
  },
  {
    id: `link2-${createUniqueID([])}`,
    name: "link",
    title: "Link",
    content: [
      {
        id: createUniqueID([]),
        shownOnWhen: "alwaysVisible",
        typeView: "link",
        btnColor: "#fa541c",
        icon: "",
        iconSize: 20,
        image: "",
        imageSize: 50,
        target: {},
      },
    ],
    wrapperStyle: {
      title: "Link-2",
    },
  },
  {
    id: `divider-${createUniqueID([])}`,
    name: "divider",
    title: "Pemisah",
    margin: 50,
  },
];

export const initialNavbarSection = [
  {
    id: `navbar-${createUniqueID([])}`,
    name: "navbar",
    title: "Navigasi",
    content: initialContent,
    variant: {
      id: "1",
      group: "Static",
      value: "simple",
      style: {
        widthNavbar: "1024px",
        shadow: "tw-shadow",
        position: "static",
        shape: undefined,
        background: {
          type: "solid",
          solidColor: "#ffffff",
          direction: "to right",
          fromColor: "#FF6F61",
          toColor: "#6B5B95",
          isRevert: false,
        },
        ...simpleStyle,
      },
    },
    logo: {
      image: plgLogo,
      width: 120,
    },
    sidebar: {
      bgColor: "#ffffff",
      lineColor: "#E0E0E0",
      textColor: "#616161",
      isShowSidebar: false,
      icon: {
        iconName: "list-ul",
        prefix: "fas",
      },
      image: "",
      iconColor: "#000000",
    },
    isShowNavbar: false,
  },
];

const Navbar = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
  handleSectionContentFocus,
  setPageSetting,
  pageSetting,
}) => {
  const [activeTab, setActiveTab] = useState("content");
  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.id === currentSection?.variant?.id
    ) || flattenedOptions[0]
  );
  const [currentVariant, setCurrentVariant] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  const [isAddContent, setIsAddContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [currentContentBeforeEdit, setCurrentContentBeforeEdit] = useState([]);

  const [selectedContent, setSelectedContent] = useState({});
  const [setting, setSetting] = useState({});

  const sectionIdToCheck = isEditingSection ? currentSection.id : setting.id;

  const [isListIconVisible, setIsListIconVisible] = useState(false);

  useEffect(() => {
    const section = previewSection.find((section) => {
      return section.id === setting.id;
    });
    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id]);

  const handleVariantChange = (group, option) => {
    const style = styleMap[option.id] || {};

    setSelectedVariant({ ...option, group });
    setPreviewSection((arr) =>
      arr.map((item) => {
        return String(item.id) === sectionIdToCheck
          ? {
              ...item,
              variant: {
                ...item.variant,
                group,
                id: option.id,
                value: option.value,
                style: {
                  ...item.variant.style,
                  ...style,
                },
              },
            }
          : item;
      })
    );

    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        variant: {
          ...prev.variant,
          group,
          id: option.id,
          value: option.value,
          style: {
            ...prev.variant.style,
            ...style,
          },
        },
      }));
    }
  };

  const handleCancel = () => {
    if (isSelectVariant) {
      setSelectedVariant(currentVariant);

      const style = styleMap[currentVariant.id] || {};

      setIsSelectVariant(false);
      setPreviewSection((arr) =>
        arr.map((item) => {
          return String(item.id) === sectionIdToCheck
            ? {
                ...item,
                variant: {
                  ...currentVariant,
                  style: {
                    ...item.variant.style,
                    ...style,
                  },
                },
              }
            : item;
        })
      );

      setActiveTab("design");
    } else if (isAddContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
      setPreviewSection((prevSections) =>
        prevSections.map((section) => {
          return section.id === sectionIdToCheck
            ? {
                ...section,
                content: section.content.slice(0, -1),
              }
            : section;
        })
      );
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
    }
  };

  const handleConfirm = () => {
    if (isSelectVariant) {
      setActiveTab("design");
      setIsSelectVariant(false);
    } else if (isAddContent || isEditingContent) {
      setIsAddContent(false);
      setIsEditingContent(false);
    } else {
      isShowContent(false);
    }
  };

  const onAddContent = () => {
    const currentSection = previewSection[0];
    if (currentSection) {
      setSetting(currentSection);
    }
  };

  useEffect(() => {
    if (!isEditingSection) {
      onAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

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
          {section.content.map((contentItem, contentIndex) => (
            <DraggableSections
              section={contentItem}
              key={contentItem.id || contentIndex}
              index={contentIndex}
              id={contentItem.id}
              titleContent={contentItem?.title}
              titleContentItem={contentItem?.wrapperStyle?.title}
              moveSection={(dragIndex, hoverIndex) =>
                moveSection(section.id, dragIndex, hoverIndex)
              }
              editSection={() => editSection(contentItem)}
              removeSection={() => removeSection(section.id, contentIndex)}
              focusContent={() => handleSectionContentFocus(contentItem.id)}
              isNavbar={true}
            />
          ))}
        </div>
      );
    },
    [moveSection, editSection, removeSection, handleSectionContentFocus]
  );

  const openVariants = () => {
    setIsSelectVariant(true);
    setCurrentVariant(selectedVariant);
  };

  const styleMap = {
    1: simpleStyle,
    2: lightStyle,
    3: shadeStyle,
  };

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
  };

  const tabsData = [
    { value: "content", label: "Konten" },
    { value: "design", label: "Desain" },
    { value: "logo", label: "Logo" },
    { value: "sidebar", label: "Sidebar" },
  ];

  const { renderEditSection } = useRenderEditSection({
    editing: selectedContent,
    setEditing: (value) => setIsEditingContent(value),
    previewSection,
    setPreviewSection,
    sectionBeforeEdit: currentContentBeforeEdit,
    // handleInnerSectionFocus: handleContentFocus,
    // handleSectionContentFocus,
  });

  return (
    <div>
      {!isAddContent && !isEditingContent && !isListIconVisible && (
        <Confirmation
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      )}

      {isSelectVariant ? (
        <SelectVariant
          optionVariant={optionVariant}
          selectedVariant={selectedVariant}
          onChangeVariant={handleVariantChange}
          verticalList={true}
        />
      ) : isAddContent ? (
        <ListContentNavbar
          previewSection={previewSection}
          setPreviewSection={setPreviewSection}
          currentSection={
            isEditingSection ? currentSection : selectedCurrentSection
          }
          isShowContent={(value) => setIsAddContent(value)}
        />
      ) : isEditingContent ? (
        <div>
          {previewSection.map((section) =>
            section.content.map((content) => (
              <div key={content.id}>{renderEditSection(section, content)}</div>
            ))
          )}
        </div>
      ) : (
        <CTabs activeTab={activeTab}>
          <NavTabsCustom tabs={tabsData} onTabClick={handleTabClick} />
          <CTabContent>
            <CTabPane
              style={{ overflowY: "auto", height: "calc(100vh - 139px)" }}
              className="p-3"
              data-tab="content"
            >
              {!isAddContent && !isEditingContent && (
                <>
                  <div>
                    {previewSection.map((section, i) =>
                      renderSection(section, i)
                    )}
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
              style={{ overflowY: "auto", height: "calc(100vh - 139px)" }}
              className="p-3"
              data-tab="design"
            >
              <div
                style={{
                  boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.1)",
                }}
                className="mb-3 border-bottom pb-3"
              >
                <div style={{ fontSize: 12 }} className="mb-2">
                  Desain
                </div>
                <div className="d-flex align-items-center">
                  <div className="mr-3">
                    {selectedVariant?.group} - {selectedVariant?.label}
                  </div>
                  <CButton onClick={openVariants} color="primary">
                    Ubah
                  </CButton>
                </div>
              </div>

              <Design
                previewSection={previewSection}
                setPreviewSection={(value) => setPreviewSection(value)}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                isEditingSection={isEditingSection}
                setPageSetting={setPageSetting}
                pageSetting={pageSetting}
                isShowContent={isShowContent}
              />
            </CTabPane>

            <CTabPane data-tab="logo">
              <Logo
                setPreviewSection={(value) => setPreviewSection(value)}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
              />
            </CTabPane>

            <CTabPane data-tab="sidebar">
              <Sidebar
                setPreviewSection={(value) => setPreviewSection(value)}
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                isListIconVisible={isListIconVisible}
                setIsListIconVisible={setIsListIconVisible}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default Navbar;
