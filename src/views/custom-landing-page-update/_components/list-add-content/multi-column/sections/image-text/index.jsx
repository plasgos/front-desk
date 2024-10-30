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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../../../../../../../assets/bg.jpg";
import { createUniqueID } from "../../../../../../../lib/unique-id";
import {
  setIsAddColumnSection,
  setIsEditingColumnSection,
  setIsEditingSection,
} from "../../../../../../../redux/modules/custom-landing-page/reducer";
import SelectVariant from "../../../../common/SelectVariant";
import AnimationControlMultiColumn from "../../common/AnimationControlMultiColumn";
import BackgroundTabMultiColumnContent from "../../common/BackgroundTabMultiColumnContent";
import BackgroundTabFullVariantMultiColumn from "../../common/BackroundTabFullVariantMultiColumn";
import { cancelSectionMultiColumn } from "../../helper/cancelSectionMultiColumn";
import ImageControl from "./ImageControl";
import UpdateContent from "./UpdateContent";
import { addSectionMultiColumn } from "../../helper/addSectionMultiColumn";

const initialContents = [
  {
    id: "content-1",
    content:
      "<div><strong>Pepatah Tua Mengatakan</strong></div><div>Kita tidak boleh selalu saja bergantung pada orang lain</div><div><br></div><div>Karena bayangan kita sendiri saja,</div><div><br></div><div>Akan meninggalkan kita saat kita berada di dalam kegelapan.</div>",
    animation: {
      type: undefined,
      duration: 1,
      isReplay: false,
    },
  },
];

const optionVariant = [
  {
    group: "Page",
    options: [
      { id: "1", value: "left", label: "Left" },
      { id: "2", value: "right", label: "Right" },
    ],
  },
  {
    group: "Frosty",
    options: [
      { id: "3", value: "light", label: "Light" },
      { id: "4", value: "dark", label: "Dark" },
      { id: "5", value: "warm", label: "Warm" },
    ],
  },
  {
    group: "Penuh",
    options: [
      { id: "6", value: "left", label: "Left" },
      { id: "7", value: "right", label: "Right" },
    ],
  },
];

const flattenedOptions = optionVariant.flatMap((group) =>
  group.options.map((option) => ({
    ...option,
    group: group.group,
  }))
);

//styles template

const pageLeft = {
  imagePosition: "left",
};

const pageRight = {
  imagePosition: "right",
};

const frostyLight = {
  backgroundColor: "#FFF5F5",
  borderColor: "#CBCACA",
  contentPosition: "tw-justify-start",
  paddingY: 40,
  blur: 0,
  widthContent: 380,
  roundedContent: 8,
  paddingContentY: 10,
  paddingContentX: 10,
  borderWidth: 1,
  rotationContent: "",
  textShadow: undefined,
  fontSize: "tw-text-sm",
  textColor: "#151414",
  textAlign: "tw-text-right",
};

const frostyDark = {
  ...frostyLight,
  textAlign: "tw-text-left",
  textColor: "#ffffff",
  backgroundColor: "#000000",
  contentPosition: "tw-justify-end",
};

const frostyWarm = {
  ...frostyLight,
  textAlign: "tw-text-center",
  textColor: "#000000",
  backgroundColor: "#FFCC80",
  contentPosition: "tw-justify-center",
};

const ImageText = ({
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
      (option) => option.id === currentSection?.variant?.id
    ) || flattenedOptions[0]
  );
  const [setting, setSetting] = useState({});
  const [currentVariant, setCurrentVariant] = useState({});
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

  const handleAddContent = () => {
    let uniqueId = createUniqueID(previewSection);
    let payload = {
      id: uniqueId,
      name: "image-text",
      title: "Gambar + Teks",
      content: initialContents,
      animation: {
        type: undefined,
        duration: 1,
        isReplay: false,
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
      variant: {
        id: "1",
        group: "Page",
        name: "left",
        style: {
          image: image,
          imagePosition: "left",
          shadow: "tw-shadow",
          width: 15,
          rounded: 0,
          distance: 0,
          rotation: 0,
          textShadow: undefined,
          fontSize: "tw-text-xs",
          textColor: "#151414",
          textAlign: "tw-text-left",
        },
      },
    };

    addSectionMultiColumn(setPreviewSection, sectionId, columnId, payload);
    setSetting(payload);
  };

  useEffect(() => {
    if (!isEditingSection) {
      handleAddContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingSection]);

  const openVariants = () => {
    setIsSelectVariant(true);
    setCurrentVariant(selectedVariant);
  };

  const styleMap = {
    1: pageLeft,
    2: pageRight,
    3: frostyLight,
    4: frostyDark,
    5: frostyWarm,
    6: pageLeft,
    7: pageRight,
  };

  const handleVariantChange = (group, option) => {
    const style = styleMap[option.id] || {};

    setSelectedVariant({ ...option, group });

    setPreviewSection((arr) =>
      arr.map((section) =>
        String(section.id) === sectionId
          ? {
              ...section,
              column: section.column.map((column) =>
                column.id === columnId
                  ? {
                      ...column,
                      content: column.content.map((content) =>
                        content.id === contentIdToCheck
                          ? {
                              ...content,
                              variant: {
                                ...content.variant,
                                group,
                                id: option.id,
                                name: option.value,
                                style: {
                                  ...content.variant.style,
                                  ...style,
                                },
                              },
                            }
                          : content
                      ),
                    }
                  : column
              ),
            }
          : section
      )
    );

    if (!isEditingSection) {
      setSelectedCurrentSection((prev) => ({
        ...prev,
        variant: {
          ...prev.variant,
          group,
          id: option.id,
          name: option.value,
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
        arr.map((section) =>
          String(section.id) === sectionId
            ? {
                ...section,
                column: section.column.map((column) =>
                  column.id === columnId
                    ? {
                        ...column,
                        content: column.content.map((content) =>
                          content.id === contentIdToCheck
                            ? {
                                ...content,
                                variant: {
                                  ...currentVariant,
                                  style: {
                                    ...content.variant.style,
                                    ...style,
                                  },
                                },
                              }
                            : content
                        ),
                      }
                    : column
                ),
              }
            : section
        )
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

  return (
    <div>
      <CRow>
        <CCol>
          <div>
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
                    <CNavLink data-tab="content">Konten</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="animation">Animasi</CNavLink>
                  </CNavItem>

                  {selectedVariant.group !== "Frosty" && (
                    <CNavItem>
                      <CNavLink data-tab="background">Background</CNavLink>
                    </CNavItem>
                  )}
                </CNav>
                <CTabContent
                  style={{ height: 300, paddingRight: 5, overflowY: "auto" }}
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
                        <div className="mr-3">
                          {selectedVariant.group} - {selectedVariant.label}
                        </div>
                        <CButton onClick={openVariants} color="primary">
                          Ubah
                        </CButton>
                      </div>
                    </div>

                    <ImageControl
                      sectionId={sectionId}
                      columnId={columnId}
                      currentSection={
                        isEditingSection
                          ? currentSection
                          : selectedCurrentSection
                      }
                      setPreviewSection={setPreviewSection}
                      selectedVariant={selectedVariant}
                    />
                  </CTabPane>

                  <CTabPane className="p-1" data-tab="content">
                    <UpdateContent
                      sectionId={sectionId}
                      columnId={columnId}
                      setPreviewSection={setPreviewSection}
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
                      isEditingContent={isEditingSection}
                    />
                  </CTabPane>

                  <CTabPane className="p-1" data-tab="animation">
                    {selectedVariant.group === "Frosty" ? (
                      <AnimationControlMultiColumn
                        sectionId={sectionId}
                        columnId={columnId}
                        label="Konten"
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
                        isForContent={true}
                      />
                    ) : (
                      <div>
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

                        <AnimationControlMultiColumn
                          sectionId={sectionId}
                          columnId={columnId}
                          label="Konten"
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
                          isForContent={true}
                        />
                      </div>
                    )}
                  </CTabPane>

                  {selectedVariant.group !== "Frosty" && (
                    <CTabPane
                      style={{ overflowX: "hidden", height: "100%" }}
                      className="p-1"
                      data-tab="background"
                    >
                      {selectedVariant.group === "Penuh" ? (
                        <BackgroundTabFullVariantMultiColumn
                          sectionId={sectionId}
                          columnId={columnId}
                          currentSection={
                            isEditingSection ? currentSection : setting
                          }
                          setPreviewSection={setPreviewSection}
                          type={isEditingSection ? "edit" : "add"}
                        />
                      ) : (
                        <BackgroundTabMultiColumnContent
                          sectionId={sectionId}
                          columnId={columnId}
                          currentSection={
                            isEditingSection ? currentSection : setting
                          }
                          setPreviewSection={setPreviewSection}
                          type={isEditingSection ? "edit" : "add"}
                        />
                      )}
                    </CTabPane>
                  )}
                </CTabContent>
              </CTabs>
            )}
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default ImageText;
