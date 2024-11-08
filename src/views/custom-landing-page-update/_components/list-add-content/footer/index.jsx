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
import Copyright from "./Copyright";
import Design from "./Design";
import ListContentFooter from "./ListContentFooter";
import { DraggableSections } from "./common/DraggbleSections";
import { useRenderEditSection } from "./hooks/useRenderEditSection";

import jne from "../../../../../assets/jne-logo.png";
import jnt from "../../../../../assets/jnt.png";

const optionVariant = [
  {
    group: "Basic",
    options: [
      { id: "1", value: "dark", label: "Dark" },
      { id: "2", value: "light", label: "Light" },
      { id: "3", value: "shade", label: "Shade" },
    ],
  },
];

const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

const darkStyle = {
  bgColor: "#000000",
  titleColor: "#EEEEEE",
  contentColor: "#757575",
  innerOutline: "",
  outline: "",
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
    id: `list-logo-${createUniqueID([])}`,
    name: "list-logo",
    title: "Daftar Logo",
    content: [
      { id: createUniqueID([]), image: jnt, target: {} },
      { id: createUniqueID([]), image: jne, target: {} },
    ],
    wrapperStyle: {
      title: "Metode Pengiriman",
      maxWidth: 300,
      icon: "",
      iconSize: 20,
      image: "",
      imageSize: 50,
    },
  },
  {
    id: `group-link-${createUniqueID([])}`,
    name: "group-link",
    title: "Grup Link",
    content: [
      {
        id: createUniqueID([]),
        text: "Home",
        icon: "",
        iconSize: 20,
        image: "",
        imageSize: 50,
        target: {},
      },
      {
        id: createUniqueID([]),
        text: "Blog",
        icon: "",
        iconSize: 20,
        image: "",
        imageSize: 50,
        target: {},
      },
      {
        id: createUniqueID([]),
        text: "Daftar Produk",
        icon: "",
        iconSize: 20,
        image: "",
        imageSize: 50,
        target: {},
      },
      {
        id: createUniqueID([]),
        text: "Konfirmasi Pembayaran",
        icon: "",
        iconSize: 20,
        image: "",
        imageSize: 50,
        target: {},
      },
    ],
    wrapperStyle: {
      title: "Link",
      icon: "",
      iconSize: 20,
      image: "",
      imageSize: 50,
    },
  },
  {
    id: `social-link-${createUniqueID([])}`,
    name: "social-link",
    title: "Link Sosial",
    content: [
      {
        id: createUniqueID([]),
        type: {
          value: "facebook",
          label: "Facebook",
          icon: {
            iconName: "square-facebook",
            prefix: "fab",
          },
          link: "https://www.facebook.com/",
          path: "",
        },
      },
      {
        id: createUniqueID([]),
        type: {
          value: "twitter-X",
          label: "Twitter X",
          icon: {
            iconName: "square-x-twitter",
            prefix: "fab",
          },
          link: "https://twitter.com/",
          path: "",
        },
      },
      {
        id: createUniqueID([]),
        type: {
          value: "instagram",
          label: "Instagram",
          icon: {
            iconName: "square-instagram",
            prefix: "fab",
          },
          link: "https://www.instagram.com/",
          path: "",
        },
      },
      {
        id: createUniqueID([]),
        type: {
          value: "youtube",
          label: "Youtube",
          icon: {
            iconName: "youtube",
            prefix: "fab",
          },
          link: "https://www.youtube.com/channel/",
          path: "",
        },
      },
    ],
    wrapperStyle: {
      title: "Social Media",
      icon: "",
      iconSize: 20,
      image: "",
      imageSize: 50,
    },
  },
  {
    id: `address-${createUniqueID([])}`,
    name: "address",
    title: "Alamat",
    content: [
      {
        id: createUniqueID([]),
        type: {
          value: "phone",
          label: "Telepon",
          icon: {
            iconName: "phone",
            prefix: "fas",
          },
          text: "0892-2211-4332",
        },
      },
      {
        id: createUniqueID([]),
        type: {
          value: "address",
          label: "Alamat",
          icon: {
            iconName: "location-dot",
            prefix: "fas",
          },
          text: "Jl Layur 31 Jakarta Timur",
        },
      },
      {
        id: createUniqueID([]),
        type: {
          value: "email",
          label: "Email",
          icon: {
            iconName: "envelope",
            prefix: "fas",
          },
          text: "support@email.com",
        },
      },
    ],
    wrapperStyle: {
      title: "Alamat",
      icon: "",
      iconSize: 20,
      image: "",
      imageSize: 50,
    },
  },
];

export const initialFooterSection = [
  {
    id: `footer-${createUniqueID([])}`,
    name: "footer",
    title: "Footer",
    content: initialContent,
    variant: {
      id: "1",
      group: "Basic",
      value: "dark",
      style: {
        widthFooter: "1024px",
        ...darkStyle,
      },
    },
    copyright: {
      default: "@plasgos 2024",
      customText: "",
      textAlign: "tw-text-center",
      color: "#757575",
      fontSize: "tw-text-xs",
      isCustom: false,
    },
    isShowFooter: false,
  },
];

const Footer = ({
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

  useEffect(() => {
    const section = previewSection.find((section) => {
      return section.id === setting.id;
    });
    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id]);

  // useEffect(() => {

  // },[])

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
    1: darkStyle,
    2: lightStyle,
    3: shadeStyle,
  };

  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
  };

  const tabsData = [
    { value: "content", label: "Konten" },
    { value: "design", label: "Desain" },
    { value: "copyright", label: "Copyright" },
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
      {!isAddContent && !isEditingContent && (
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
        <ListContentFooter
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
          <CTabContent
            style={{ overflowY: "auto", height: "calc(100vh - 139px)" }}
          >
            <CTabPane className="p-3" data-tab="content">
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

            <CTabPane className="p-3" data-tab="design">
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

            <CTabPane data-tab="copyright">
              <Copyright
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                setPreviewSection={setPreviewSection}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default Footer;
