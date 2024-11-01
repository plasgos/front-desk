import {
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import image from "../../../../../assets/action-figure.jpg";

import { createUniqueID } from "../../../../../lib/unique-id";

import AnimationControl from "../../common/AnimationControl";
import BackgroundTab from "../../common/BackgroundTab";
import SelectVariant from "../../common/SelectVariant";
import ImageContent from "./ImageContent";
import Confirmation from "../../common/Confirmation";

const optionVariant = [
  {
    group: "",
    options: [
      { id: "1", value: "center", label: "Tengah" },
      { id: "2", value: "full", label: "Penuh" },
    ],
  },
];
const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

const Image = ({
  previewSection,
  setPreviewSection,
  isShowContent,
  isEditingSection = false,
  sectionBeforeEdit,
  currentSection,
}) => {
  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.value === currentSection?.wrapperStyle?.variant
    ) || flattenedOptions[0]
  );
  const [currentVariant, setCurrentVariant] = useState({});
  const [setting, setSetting] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});

  useEffect(() => {
    const section = previewSection.find((section) => section.id === setting.id);

    if (section) {
      setSelectedCurrentSection(section);
    }
  }, [previewSection, setting.id]);

  const handleCancel = () => {
    if (isSelectVariant) {
      setSelectedVariant(currentVariant);

      const style = styleMap[currentVariant.id] || {};

      setIsSelectVariant(false);

      setPreviewSection((arr) =>
        arr.map((item) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return String(item.id) === contentIdToCheck
            ? {
                ...item,
                wrapperStyle: {
                  ...item.wrapperStyle,
                  variant: currentVariant.value,
                  ...style,
                },
              }
            : item;
        })
      );
    } else if (!isEditingSection) {
      isShowContent(false);
      setPreviewSection((prevSections) =>
        prevSections.filter((section) => {
          const contentIdToCheck = isEditingSection
            ? currentSection.id
            : setting.id;

          return section.id !== contentIdToCheck;
        })
      );
    } else if (isEditingSection) {
      isShowContent(false);
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      isShowContent(false);
    }
  };

  const handleConfirm = () => {
    if (isSelectVariant) {
      setIsSelectVariant(false);
    } else {
      isShowContent(false);
    }
  };

  const onAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "image",
      title: "Gambar",
      content: [
        {
          id: "img-01",
          image: image,
          alt: "",
          isDownloadImage: false,
          target: {},
        },
      ],
      animation: {
        type: undefined,
        duration: 1,
        isReplay: false,
      },
      wrapperStyle: {
        width: 500,
        rotation: 0,
        borderColor: "",
        shadow: "tw-shadow",
        variant: "center",
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
      onAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const openVariants = () => {
    setIsSelectVariant(true);
    setCurrentVariant(selectedVariant);
  };

  const styleMap = {
    1: {
      width: 500,
      rotation: 0,
      borderColor: "",
    },
    2: {
      width: 0,
      rotation: 0,
      borderColor: "",
    },
  };

  const handleVariantChange = (group, option) => {
    const style = styleMap[option.id] || {};

    setSelectedVariant({ ...option, group });
    setPreviewSection((arr) =>
      arr.map((item) => {
        const contentIdToCheck = isEditingSection
          ? currentSection.id
          : setting.id;

        return String(item.id) === contentIdToCheck
          ? {
              ...item,
              wrapperStyle: {
                ...item.wrapperStyle,
                variant: option.value,
                ...style,
              },
            }
          : item;
      })
    );

    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        wrapperStyle: {
          ...prev.wrapperStyle,
          variant: option.value,
          ...style,
        },
      }));
    }
  };

  return (
    <div>
      <Confirmation handleCancel={handleCancel} handleConfirm={handleConfirm} />

      {isSelectVariant ? (
        <SelectVariant
          optionVariant={optionVariant}
          selectedVariant={selectedVariant}
          onChangeVariant={handleVariantChange}
        />
      ) : (
        <CTabs activeTab="image">
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="image">Gambar</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="animation">Animasi</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="background">Background</CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent
            style={{ overflowY: "auto", height: "calc(100vh - 139px)" }}
            className="p-3"
          >
            <CTabPane className="p-1" data-tab="image">
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
                  <div className="mr-3">{selectedVariant.label}</div>
                  <CButton onClick={openVariants} color="primary">
                    Ubah
                  </CButton>
                </div>
              </div>

              <ImageContent
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                currentContent={
                  isEditingSection
                    ? currentSection?.content?.[0]
                    : selectedCurrentSection?.content?.[0]
                }
                setPreviewSection={setPreviewSection}
                isEditingContent={isEditingSection}
                selectedVariant={selectedVariant}
              />
            </CTabPane>

            <CTabPane
              style={{ height: "80vh" }}
              className="p-1"
              data-tab="animation"
            >
              <AnimationControl
                label="Gambar"
                currentSection={
                  isEditingSection ? currentSection : selectedCurrentSection
                }
                setPreviewSection={setPreviewSection}
              />
            </CTabPane>

            <CTabPane
              style={{ overflowX: "hidden", height: "100%" }}
              className="p-1"
              data-tab="background"
            >
              <BackgroundTab
                currentSection={isEditingSection ? currentSection : setting}
                setPreviewSection={setPreviewSection}
                type={isEditingSection ? "edit" : "add"}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </div>
  );
};

export default Image;
