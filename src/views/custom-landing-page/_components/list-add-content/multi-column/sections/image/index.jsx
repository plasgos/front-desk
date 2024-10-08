import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";

import image from "../../../../../../../assets/action-figure.jpg";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import SelectVariant from "../../../../common/SelectVariant";
import ImageContent from "./ImageContent";
import AnimationControlMultiColumn from "../../common/AnimationControlMultiColumn";
import BackgroundTabMultiColumnContent from "../../common/BackgroundTabMultiColumnContent";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import { changeWrapperStyleMultiColumn } from "../../helper/changeWrapperStyleMultiColumn";

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
  sectionBeforeEdit,
  currentSection,
  sectionId,
  columnId,
}) => {
  const { isEditingSection, isAddColumnSection } = useSelector(
    (state) => state.customLandingPage.multiColumnSection
  );
  const dispatch = useDispatch();

  const [isSelectVariant, setIsSelectVariant] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    flattenedOptions.find(
      (option) => option.value === currentSection?.wrapperStyle?.variant
    ) || flattenedOptions[0]
  );
  const [currentVariant, setCurrentVariant] = useState({});

  const [setting, setSetting] = useState({});
  const [selectedCurrentSection, setSelectedCurrentSection] = useState({});
  const contentIdToCheck = isEditingSection ? currentSection.id : setting.id;

  useEffect(() => {
    if (!isEditingSection) {
      let section = previewSection.find((section) => section.id === sectionId);
      if (section) {
        let column = section.column.find((col) => col.id === columnId);
        if (column) {
          let content = column.content.find((cnt) => cnt.id === setting?.id);
          if (content) {
            setSelectedCurrentSection(content);
          }
        }
      }
    }
  }, [previewSection, isEditingSection, sectionId, columnId, setting.id]);

  const handleCancel = () => {
    if (isSelectVariant) {
      setSelectedVariant(currentVariant);

      const style = styleMap[currentVariant.id] || {};

      setIsSelectVariant(false);

      const updateContent = {
        variant: currentVariant.value,
        ...style,
      };

      changeWrapperStyleMultiColumn(
        setPreviewSection,
        sectionId,
        columnId,
        contentIdToCheck,
        updateContent
      );
    } else if (isEditingSection) {
      dispatch(setIsEditingSection(false));
      setPreviewSection([...sectionBeforeEdit]);
    } else {
      dispatch(setIsAddColumnSection(false));
      dispatch(setIsEditingColumnSection(false));
      cancelSectionMultiColumn(setPreviewSection, sectionId, columnId, setting);
    }
  };

  const handleConfirm = () => {
    if (isSelectVariant) {
      setIsSelectVariant(false);
    } else if (isAddColumnSection) {
      dispatch(setIsAddColumnSection(false));
    } else if (isEditingSection) {
      dispatch(setIsEditingSection(false));
    } else {
      dispatch(setIsEditingColumnSection(false));
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
        width: 150,
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

    addSectionMultiColumn(setPreviewSection, sectionId, columnId, payload);

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
      width: 150,
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

    const updateContent = {
      variant: option.value,
      ...style,
    };

    changeWrapperStyleMultiColumn(
      setPreviewSection,
      sectionId,
      columnId,
      contentIdToCheck,
      updateContent
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
      <CRow>
        <CCol>
          <div style={{ height: 400 }}>
            <div className="d-flex justify-content-end align-items-center border-bottom p-2">
              <div>
                <CButton
                  onClick={handleCancel}
                  color="primary"
                  variant="outline"
                  className="mx-2"
                >
                  Batal
                </CButton>

                <CButton onClick={handleConfirm} color="primary">
                  Selesai
                </CButton>
              </div>
            </div>

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
                  style={{ height: 320, paddingRight: 5, overflowY: "auto" }}
                  className="pt-3"
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
                      sectionId={sectionId}
                      columnId={columnId}
                      currentSection={
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
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

                  <CTabPane className="p-1" data-tab="animation">
                    <AnimationControlMultiColumn
                      sectionId={sectionId}
                      columnId={columnId}
                      label="Gambar"
                      currentSection={
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
                      }
                      setPreviewSection={setPreviewSection}
                    />
                  </CTabPane>

                  <CTabPane
                    style={{ overflowX: "hidden", height: "100%" }}
                    className="p-1"
                    data-tab="background"
                  >
                    <BackgroundTabMultiColumnContent
                      sectionId={sectionId}
                      columnId={columnId}
                      currentSection={
                        isEditingSection ? currentSection : setting
                      }
                      setPreviewSection={setPreviewSection}
                      type={isEditingSection ? "edit" : "add"}
                    />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            )}
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default Image;
